import type { Recipe } from "./types";
import type { FridgeItem } from "./db";
import { INGREDIENT_MAP } from "@/data/ingredients";

export type MatchLevel = "full" | "missing-1" | "missing-2plus";

export function matchRecipeToFridge(recipe: Recipe, fridge: FridgeItem[]): { level: MatchLevel; missing: string[] } {
  const have = new Map<string, number>();
  for (const item of fridge) {
    const key = item.ingredientId ?? item.name.toLowerCase();
    have.set(key, (have.get(key) ?? 0) + item.quantity);
  }

  const missing: string[] = [];
  for (const ri of recipe.ingredients) {
    if (ri.optional) continue;
    const ing = INGREDIENT_MAP[ri.ingredientId];
    if (!ing) continue;
    // Pantry staples (spices/fats) are assumed available — only check main ingredients.
    if (ing.category === "spice") continue;
    const needed = ri.grams ?? ri.ml ?? (ri.pieces ?? 0) * (ing.pieceGrams ?? 50);
    const owned = have.get(ri.ingredientId) ?? 0;
    if (owned < needed * 0.6) missing.push(ing.name_bg);
  }

  if (missing.length === 0) return { level: "full", missing };
  if (missing.length === 1) return { level: "missing-1", missing };
  return { level: "missing-2plus", missing };
}

export const MATCH_BADGE: Record<MatchLevel, string> = {
  full: "🟢 Имаш всичко",
  "missing-1": "🟡 Липсва 1 продукт",
  "missing-2plus": "🟠 Липсват продукти",
};
