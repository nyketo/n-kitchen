import { fishRecipes } from "./fish";
import { fish2Recipes } from "./fish2";
import { porkRecipes } from "./pork";
import { pork2Recipes } from "./pork2";
import { beefRecipes } from "./beef";
import { beef2Recipes } from "./beef2";
import { chickenRecipes } from "./chicken";
import { chicken2Recipes } from "./chicken2";
import { mincedRecipes } from "./minced-eggs";
import { minced2Recipes } from "./minced2-eggs2";
import { soupsSaladsRecipes } from "./soups-salads";
import { soupsSalads2Recipes } from "./soups-salads2";
import { dessertsBreadPizzaRecipes } from "./desserts-bread-pizza";
import { dessertsBreadPizza2Recipes } from "./desserts-bread-pizza2";
import { saucesRecipes } from "./sauces";
import { sauces2Recipes } from "./sauces2";
import type { Recipe } from "@/lib/types";

export const ALL_RECIPES: Recipe[] = [
  ...fishRecipes,
  ...fish2Recipes,
  ...porkRecipes,
  ...pork2Recipes,
  ...beefRecipes,
  ...beef2Recipes,
  ...chickenRecipes,
  ...chicken2Recipes,
  ...mincedRecipes,
  ...minced2Recipes,
  ...soupsSaladsRecipes,
  ...soupsSalads2Recipes,
  ...dessertsBreadPizzaRecipes,
  ...dessertsBreadPizza2Recipes,
  ...saucesRecipes,
  ...sauces2Recipes,
];

export const RECIPE_MAP: Record<string, Recipe> = Object.fromEntries(ALL_RECIPES.map((r) => [r.id, r]));

export function getRecipeById(id: string): Recipe | undefined {
  return RECIPE_MAP[id];
}
