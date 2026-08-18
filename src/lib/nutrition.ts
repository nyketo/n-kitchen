import { INGREDIENT_MAP } from "@/data/ingredients";
import type { Recipe, RecipeIngredient } from "./types";

export interface NutritionTotals {
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
  netCarbs: number;
}

const ZERO: NutritionTotals = { kcal: 0, protein: 0, fat: 0, carbs: 0, fiber: 0, netCarbs: 0 };

function ingredientGrams(ri: RecipeIngredient): number {
  const ing = INGREDIENT_MAP[ri.ingredientId];
  if (!ing) return 0;
  if (ri.grams != null) return ri.grams;
  if (ri.ml != null) return ri.ml; // 1:1 approximation for liquids
  if (ri.pieces != null) return ri.pieces * (ing.pieceGrams ?? 50);
  return 0;
}

/** Deterministic nutrition calculation — never estimated by AI. */
export function calcIngredientNutrition(ri: RecipeIngredient): NutritionTotals {
  const ing = INGREDIENT_MAP[ri.ingredientId];
  if (!ing) return ZERO;
  const grams = ingredientGrams(ri);
  const factor = grams / 100;
  const carbs = ing.carbs * factor;
  const fiber = ing.fiber * factor;
  return {
    kcal: ing.kcal * factor,
    protein: ing.protein * factor,
    fat: ing.fat * factor,
    carbs,
    fiber,
    netCarbs: Math.max(0, carbs - fiber),
  };
}

export function sumNutrition(list: NutritionTotals[]): NutritionTotals {
  return list.reduce(
    (acc, n) => ({
      kcal: acc.kcal + n.kcal,
      protein: acc.protein + n.protein,
      fat: acc.fat + n.fat,
      carbs: acc.carbs + n.carbs,
      fiber: acc.fiber + n.fiber,
      netCarbs: acc.netCarbs + n.netCarbs,
    }),
    { ...ZERO }
  );
}

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function roundTotals(t: NutritionTotals): NutritionTotals {
  return {
    kcal: Math.round(t.kcal),
    protein: round1(t.protein),
    fat: round1(t.fat),
    carbs: round1(t.carbs),
    fiber: round1(t.fiber),
    netCarbs: round1(t.netCarbs),
  };
}

/** Total nutrition for a recipe at its base serving count (servingsBase, usually per-recipe total for 1 person). */
export function recipeBaseNutrition(recipe: Recipe): NutritionTotals {
  const per = recipe.ingredients.map(calcIngredientNutrition);
  return roundTotals(sumNutrition(per));
}

/** Nutrition scaled by a serving multiplier (x1..x4). Scales every ingredient proportionally. */
export function recipeScaledNutrition(recipe: Recipe, multiplier: number): NutritionTotals {
  const base = recipeBaseNutrition(recipe);
  return roundTotals({
    kcal: base.kcal * multiplier,
    protein: base.protein * multiplier,
    fat: base.fat * multiplier,
    carbs: base.carbs * multiplier,
    fiber: base.fiber * multiplier,
    netCarbs: base.netCarbs * multiplier,
  });
}

/** Per-serving nutrition (base nutrition divided by servingsBase). */
export function recipePerServing(recipe: Recipe): NutritionTotals {
  const base = recipeBaseNutrition(recipe);
  const s = recipe.servingsBase || 1;
  return roundTotals({
    kcal: base.kcal / s,
    protein: base.protein / s,
    fat: base.fat / s,
    carbs: base.carbs / s,
    fiber: base.fiber / s,
    netCarbs: base.netCarbs / s,
  });
}

/**
 * Scale ingredient quantities for a target serving multiplier.
 * Used for shopping-list / "use what I have" / recipe display at x2/x3/x4.
 */
export function scaleIngredients(ingredients: RecipeIngredient[], multiplier: number): RecipeIngredient[] {
  return ingredients.map((ri) => ({
    ...ri,
    grams: ri.grams != null ? round1(ri.grams * multiplier) : undefined,
    ml: ri.ml != null ? round1(ri.ml * multiplier) : undefined,
    pieces: ri.pieces != null ? Math.round(ri.pieces * multiplier * 10) / 10 : undefined,
  }));
}

/**
 * "Направи за OMAD": increases protein-bearing ingredients (meat/fish/eggs) by ~1.5-1.8x,
 * but does NOT scale fats/sauces/spices/cooking-liquid proportionally — matches N Kitchen rule #24.
 */
export function makeOmadIngredients(recipe: Recipe): RecipeIngredient[] {
  const PROTEIN_CATEGORIES = new Set(["meat", "fish", "egg"]);
  const PROTEIN_BOOST = 1.6;
  return recipe.ingredients.map((ri) => {
    const ing = INGREDIENT_MAP[ri.ingredientId];
    if (!ing) return ri;
    if (PROTEIN_CATEGORIES.has(ing.category)) {
      return {
        ...ri,
        grams: ri.grams != null ? Math.round(ri.grams * PROTEIN_BOOST) : undefined,
        pieces: ri.pieces != null ? Math.round(ri.pieces * PROTEIN_BOOST) : undefined,
      };
    }
    // liquids / fats / spices / sauce stay the same, cooking liquid gets a *small* bump only
    if (ing.category === "other" && ri.ml != null) {
      return { ...ri, ml: Math.round(ri.ml * 1.15) };
    }
    return ri;
  });
}

export function nutritionForIngredients(ingredients: RecipeIngredient[]): NutritionTotals {
  return roundTotals(sumNutrition(ingredients.map(calcIngredientNutrition)));
}

/**
 * Conservative per-serving net-carb ceiling for a meal to still count as strict keto,
 * given a typical daily keto budget of ~20-30g net carbs spread over 1-3 meals.
 */
export const KETO_NET_CARB_LIMIT_G = 15;

/** Whether a recipe's *actual computed* nutrition (not just its dietType label) fits strict keto per serving. */
export function isKetoFriendly(recipe: Recipe): boolean {
  return recipePerServing(recipe).netCarbs <= KETO_NET_CARB_LIMIT_G;
}

/**
 * "Адаптирай към Кето": deterministically trims the biggest carb contributors —
 * vegetable-category ingredients used in bulk (onion, carrot, leek, cabbage, peppers, etc.)
 * — instead of touching protein, fat, or spices. No AI involved, so it's free and instant.
 */
export function makeKetoAdaptedIngredients(recipe: Recipe): RecipeIngredient[] {
  const REDUCE_ABOVE_G = 60;
  const REDUCE_FACTOR = 0.6;
  return recipe.ingredients.map((ri) => {
    const ing = INGREDIENT_MAP[ri.ingredientId];
    if (!ing) return ri;
    if (ing.category === "vegetable" && ri.grams != null && ri.grams > REDUCE_ABOVE_G) {
      return { ...ri, grams: Math.round(ri.grams * REDUCE_FACTOR) };
    }
    return ri;
  });
}
