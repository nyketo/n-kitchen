import type { Recipe, RecipeIngredient, RecipeStep, MethodInstructions } from "@/lib/types";

export function ing(ingredientId: string, amount: number, kind: "g" | "ml" | "pcs" = "g", note?: string, optional?: boolean): RecipeIngredient {
  const base: RecipeIngredient = { ingredientId, note, optional };
  if (kind === "g") base.grams = amount;
  else if (kind === "ml") base.ml = amount;
  else base.pieces = amount;
  return base;
}

export function step(text: string, opts?: Partial<RecipeStep>): RecipeStep {
  return { text, ...opts };
}

export function method(m: MethodInstructions): MethodInstructions {
  return m;
}

let counter = 0;
export function nextId(prefix: string) {
  counter += 1;
  return `${prefix}-${counter}`;
}

export function recipe(r: Recipe): Recipe {
  return r;
}
