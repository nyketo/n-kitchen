"use client";

import { useMemo } from "react";
import { ALL_RECIPES } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";

export default function QuickPage() {
  const suggestions = useMemo(() => {
    const scored = ALL_RECIPES.map((r) => {
      const m = r.methods[0];
      const totalTime = m ? m.prepTime + m.activeTime + m.cookTime : 999;
      const onePot = r.tags.includes("one-pot") || r.cleanupLevel === "minimal";
      return { r, totalTime, onePot };
    }).filter((x) => x.totalTime <= 25);
    scored.sort((a, b) => (a.onePot === b.onePot ? a.totalTime - b.totalTime : a.onePot ? -1 : 1));
    return scored.slice(0, 3).map((x) => x.r);
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <h1 className="font-display text-3xl mb-1">Нещо набързо</h1>
      <p className="text-sm mb-6" style={{ color: "var(--nk-fg-soft)" }}>3 предложения — малко подготовка, малко съдове.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestions.map((r) => <RecipeCard key={r.id} recipe={r} />)}
      </div>
    </div>
  );
}
