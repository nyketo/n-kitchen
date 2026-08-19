"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ALL_RECIPES } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";
import { CATEGORY_LABELS, METHOD_LABELS } from "@/lib/labels";
import { isKetoFriendly } from "@/lib/nutrition";
import type { CookingMethod, DietType, MealCategory } from "@/lib/types";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as MealCategory[];
const METHODS = Object.keys(METHOD_LABELS) as CookingMethod[];

// Remembers filters + scroll position across a visit to a recipe and back, so returning
// from "some recipe in the middle of the list" lands you where you were, not at the top.
const STATE_KEY = "nk-recipes-list-state";

type StoredState = {
  query: string;
  category: MealCategory | "all";
  method: CookingMethod | "all";
  diet: DietType | "all";
  maxTime: number | "all";
  dairyFree: boolean;
  onePot: boolean;
  scrollY: number;
};

function readStoredState(): StoredState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STATE_KEY);
    return raw ? (JSON.parse(raw) as StoredState) : null;
  } catch {
    return null;
  }
}

export default function RecipesPage() {
  const restored = useRef(readStoredState());
  const [query, setQuery] = useState(() => restored.current?.query ?? "");
  const [category, setCategory] = useState<MealCategory | "all">(() => restored.current?.category ?? "all");
  const [method, setMethod] = useState<CookingMethod | "all">(() => restored.current?.method ?? "all");
  const [diet, setDiet] = useState<DietType | "all">(() => restored.current?.diet ?? "all");
  const [maxTime, setMaxTime] = useState<number | "all">(() => restored.current?.maxTime ?? "all");
  const [dairyFree, setDairyFree] = useState(() => restored.current?.dairyFree ?? false);
  const [onePot, setOnePot] = useState(() => restored.current?.onePot ?? false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_RECIPES.filter((r) => {
      if (category !== "all" && r.category !== category) return false;
      if (method !== "all" && !r.methods.some((m) => m.method === method)) return false;
      if (diet === "keto" && !isKetoFriendly(r)) return false;
      if (diet === "low-carb" && !r.dietType.includes("low-carb") && !r.dietType.includes("keto")) return false;
      if (dairyFree && !r.dairyFree) return false;
      if (onePot && !r.tags.includes("one-pot")) return false;
      if (maxTime !== "all") {
        const t = r.methods[0] ? r.methods[0].prepTime + r.methods[0].activeTime + r.methods[0].cookTime : 0;
        if (t > maxTime) return false;
      }
      if (q) {
        const hay = `${r.title} ${r.description} ${r.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, category, method, diet, maxTime, dairyFree, onePot]);

  // Persist filters on every change so a returning visit re-applies the same list.
  useEffect(() => {
    const prev = readStoredState();
    const next: StoredState = {
      query, category, method, diet, maxTime, dairyFree, onePot,
      scrollY: prev?.scrollY ?? 0,
    };
    try {
      sessionStorage.setItem(STATE_KEY, JSON.stringify(next));
    } catch {
      // ignore quota/availability errors
    }
  }, [query, category, method, diet, maxTime, dairyFree, onePot]);

  // Continuously remember scroll position (debounced via rAF) so navigating to a recipe
  // and back restores the exact spot instead of resetting to the top of the list.
  useEffect(() => {
    let ticking = false;
    function save() {
      ticking = false;
      const prev = readStoredState();
      if (!prev) return;
      try {
        sessionStorage.setItem(STATE_KEY, JSON.stringify({ ...prev, scrollY: window.scrollY }));
      } catch {
        // ignore
      }
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(save);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Restore scroll position once, after the (already-filtered) list has painted.
  // Two nested rAFs so this runs after layout has settled, not mid-paint.
  useEffect(() => {
    const y = restored.current?.scrollY;
    if (!y) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => window.scrollTo(0, y));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="font-display text-3xl mb-4">Рецепти</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Търси: "скумрия и домати", "кето пилешко без млечни"…'
        className="w-full rounded-xl border px-4 py-3 mb-4 text-sm"
        style={{ borderColor: "var(--nk-border)", background: "var(--nk-card-bg)" }}
      />

      <div className="flex flex-wrap gap-2 mb-3">
        <Select label="Категория" value={category} onChange={setCategory}
          options={[["all", "Всички"], ...CATEGORIES.map((c) => [c, CATEGORY_LABELS[c]] as const)]} />
        <Select label="Метод" value={method} onChange={setMethod}
          options={[["all", "Всички"], ...METHODS.map((m) => [m, METHOD_LABELS[m]] as const)]} />
        <Select label="Режим" value={diet} onChange={setDiet}
          options={[["all", "Всички"], ["keto", "KETO"], ["low-carb", "LOW-CARB"]]} />
        <Select label="Време" value={maxTime === "all" ? "all" : String(maxTime)}
          onChange={(v) => setMaxTime(v === "all" ? "all" : Number(v))}
          options={[["all", "Всяко"], ["15", "≤15 мин"], ["30", "≤30 мин"], ["45", "≤45 мин"]]} />
        <Toggle label="Без млечни" checked={dairyFree} onChange={setDairyFree} />
        <Toggle label="Всичко в един съд" checked={onePot} onChange={setOnePot} />
      </div>

      <p className="text-xs mb-4" style={{ color: "var(--nk-fg-soft)" }}>{results.length} рецепти</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((r) => <RecipeCard key={r.id} recipe={r} />)}
      </div>
      {results.length === 0 && (
        <p className="text-sm mt-8" style={{ color: "var(--nk-fg-soft)" }}>Няма намерени рецепти с тези филтри.</p>
      )}
    </div>
  );
}

function Select<T extends string>({ label, value, onChange, options }: {
  label: string; value: T; onChange: (v: T) => void; options: readonly (readonly [string, string])[];
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className="rounded-lg border px-3 py-2 text-xs"
      style={{ borderColor: "var(--nk-border)", background: "var(--nk-card-bg)" }}
    >
      {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="rounded-lg border px-3 py-2 text-xs"
      style={{
        borderColor: "var(--nk-border)",
        background: checked ? "var(--nk-ember)" : "var(--nk-card-bg)",
        color: checked ? "#FBF3E7" : "var(--nk-fg)",
      }}
    >
      {label}
    </button>
  );
}
