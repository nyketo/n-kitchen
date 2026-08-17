"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { getRecipeById } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";

export default function FavoritesPage() {
  const favorites = useLiveQuery(() => db.favorites.orderBy("createdAt").reverse().toArray(), []) ?? [];
  const recipes = favorites.map((f) => getRecipeById(f.recipeId)).filter(Boolean);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="font-display text-3xl mb-6">Любими</h1>
      {recipes.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--nk-fg-soft)" }}>Все още нямаш любими рецепти — натисни ♡ върху рецепта.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((r) => r && <RecipeCard key={r.id} recipe={r} />)}
        </div>
      )}
    </div>
  );
}
