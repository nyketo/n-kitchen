"use client";

import { ALL_RECIPES } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";

export default function Cook4mePage() {
  const recipes = ALL_RECIPES.filter((r) => r.methods.some((m) => m.method === "cook4me"));
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="font-display text-3xl mb-1">Cook4me</h1>
      <p className="text-sm mb-6" style={{ color: "var(--nk-fg-soft)" }}>{recipes.length} рецепти с точни Tefal Cook4me инструкции.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((r) => <RecipeCard key={r.id} recipe={r} />)}
      </div>
    </div>
  );
}
