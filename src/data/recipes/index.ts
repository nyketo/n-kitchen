import { fishRecipes } from "./fish";
import { fish2Recipes } from "./fish2";
import { fish3Recipes } from "./fish3";
import { porkRecipes } from "./pork";
import { pork2Recipes } from "./pork2";
import { pork3Recipes } from "./pork3";
import { beefRecipes } from "./beef";
import { beef2Recipes } from "./beef2";
import { beef3Recipes } from "./beef3";
import { chickenRecipes } from "./chicken";
import { chicken2Recipes } from "./chicken2";
import { chicken3Recipes } from "./chicken3";
import { mincedRecipes } from "./minced-eggs";
import { minced2Recipes } from "./minced2-eggs2";
import { minced3Recipes } from "./minced3";
import { eggs3Recipes } from "./eggs3";
import { soupsSaladsRecipes } from "./soups-salads";
import { soupsSalads2Recipes } from "./soups-salads2";
import { soups3Recipes } from "./soups3";
import { salads3Recipes } from "./salads3";
import { stews2Recipes } from "./stews2";
import { cabbageRecipes } from "./cabbage";
import { dessertsBreadPizzaRecipes } from "./desserts-bread-pizza";
import { dessertsBreadPizza2Recipes } from "./desserts-bread-pizza2";
import { desserts3Recipes } from "./desserts3";
import { bread2Recipes } from "./bread2";
import { pizza2Recipes } from "./pizza2";
import { saucesRecipes } from "./sauces";
import { sauces2Recipes } from "./sauces2";
import { sauces3Recipes } from "./sauces3";
import { batch4Recipes } from "./batch4";
import { bulgarianRecipes } from "./bulgarian";
import { bulgarian2Recipes } from "./bulgarian2";
import type { Recipe } from "@/lib/types";

export const ALL_RECIPES: Recipe[] = [
  ...fishRecipes,
  ...fish2Recipes,
  ...fish3Recipes,
  ...porkRecipes,
  ...pork2Recipes,
  ...pork3Recipes,
  ...beefRecipes,
  ...beef2Recipes,
  ...beef3Recipes,
  ...chickenRecipes,
  ...chicken2Recipes,
  ...chicken3Recipes,
  ...mincedRecipes,
  ...minced2Recipes,
  ...minced3Recipes,
  ...eggs3Recipes,
  ...soupsSaladsRecipes,
  ...soupsSalads2Recipes,
  ...soups3Recipes,
  ...salads3Recipes,
  ...stews2Recipes,
  ...cabbageRecipes,
  ...dessertsBreadPizzaRecipes,
  ...dessertsBreadPizza2Recipes,
  ...desserts3Recipes,
  ...bread2Recipes,
  ...pizza2Recipes,
  ...saucesRecipes,
  ...sauces2Recipes,
  ...sauces3Recipes,
  ...batch4Recipes,
  ...bulgarianRecipes,
  ...bulgarian2Recipes,
];

export const RECIPE_MAP: Record<string, Recipe> = Object.fromEntries(ALL_RECIPES.map((r) => [r.id, r]));

export function getRecipeById(id: string): Recipe | undefined {
  return RECIPE_MAP[id];
}
