"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ALL_RECIPES } from "@/data/recipes";
import RecipeCover from "@/components/RecipeCover";
import { recipePerServing } from "@/lib/nutrition";
import { METHOD_LABELS } from "@/lib/labels";

function dayIndex(offset = 0) {
  const start = new Date(2026, 0, 1).getTime();
  const days = Math.floor((Date.now() - start) / 86400000) + offset;
  return ((days % ALL_RECIPES.length) + ALL_RECIPES.length) % ALL_RECIPES.length;
}

export default function HomePage() {
  const [offset, setOffset] = useState(0);
  const recipe = useMemo(() => ALL_RECIPES[dayIndex(offset)], [offset]);
  const n = recipePerServing(recipe);
  const method = recipe.methods[0];
  const totalTime = method ? method.prepTime + method.activeTime + method.cookTime : 0;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <p className="text-sm mb-1" style={{ color: "var(--nk-fg-soft)" }}>Днес в N Kitchen</p>
      <div className="rounded-3xl overflow-hidden border grid md:grid-cols-2" style={{ borderColor: "var(--nk-border)" }}>
        <RecipeCover category={recipe.category} title={recipe.title} className="h-56 md:h-full" />
        <div className="p-6 md:p-8 flex flex-col justify-center" style={{ background: "var(--nk-card-bg)" }}>
          <h1 className="font-display text-3xl md:text-4xl leading-tight mb-3">{recipe.title}</h1>
          <div className="flex flex-wrap gap-1.5 text-[11px] mb-4">
            {recipe.dietType.map((d) => (
              <span key={d} className="px-2 py-0.5 rounded-full" style={{ background: "var(--nk-bg-2)", color: "var(--nk-olive)" }}>
                {d === "keto" ? "KETO" : "LOW-CARB"}
              </span>
            ))}
            {method && (
              <span className="px-2 py-0.5 rounded-full" style={{ background: "var(--nk-bg-2)" }}>
                {METHOD_LABELS[method.method]} · {totalTime} мин
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full" style={{ background: "var(--nk-bg-2)" }}>
              {n.protein} г протеин
            </span>
          </div>
          <p className="text-sm mb-6" style={{ color: "var(--nk-fg-soft)" }}>{recipe.description}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/cooking/${recipe.id}`}
              className="px-5 py-3 rounded-full font-semibold text-sm"
              style={{ background: "var(--nk-ember)", color: "#FBF3E7" }}
            >
              ГОТВИ
            </Link>
            <button
              onClick={() => setOffset((o) => o + 1)}
              className="px-5 py-3 rounded-full font-semibold text-sm border"
              style={{ borderColor: "var(--nk-border)" }}
            >
              ДРУГО ПРЕДЛОЖЕНИЕ
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
        <QuickLink href="/recipes" title="Какво да сготвя?" icon="▤" />
        <QuickLink href="/cook4me" title="Cook4me" icon="◍" />
        <QuickLink href="/quick" title="Нещо набързо" icon="⚡" />
        <QuickLink href="/fridge" title="Моят хладилник" icon="▢" />
        <QuickLink href="/weekly-menu" title="Седмично меню" icon="▦" />
        <QuickLink href="/favorites" title="Любими" icon="♥" />
        <QuickLink href="/shopping" title="Пазаруване" icon="☰" />
        <QuickLink href="/chef" title="Моят готвач" icon="✳" />
      </div>
    </div>
  );
}

function QuickLink({ href, title, icon }: { href: string; title: string; icon: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border p-4 flex flex-col gap-2 hover:opacity-80 transition-opacity"
      style={{ background: "var(--nk-card-bg)", borderColor: "var(--nk-border)" }}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium font-display">{title}</span>
    </Link>
  );
}
