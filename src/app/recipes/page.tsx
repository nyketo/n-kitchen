"use client";

import { useMemo, useState } from "react";
import { ALL_RECIPES } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";
import { CATEGORY_LABELS, METHOD_LABELS } from "@/lib/labels";
import { isKetoFriendly } from "@/lib/nutrition";
import type { CookingMethod, DietType, MealCategory } from "@/lib/types";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as MealCategory[];
const METHODS = Object.keys(METHOD_LABELS) as CookingMethod[];

export default function RecipesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MealCategory | "all">("all");
  const [method, setMethod] = useState<CookingMethod | "all">("all");
  const [diet, setDiet] = useState<DietType | "all">("all");
  const [maxTime, setMaxTime] = useState<number | "all">("all");
  const [dairyFree, setDairyFree] = useState(false);
  const [onePot, setOnePot] = useState(false);

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
