import { ing, step, recipe } from "../builder";
import type { Recipe } from "@/lib/types";

export const pizza2Recipes: Recipe[] = [
  recipe({
    id: "keto-pizza-margherita",
    title: "Кето пица Маргарита",
    description: "Класика с домат, моцарела и риган.",
    category: "pizza", cuisine: "international", dietType: ["keto"],
    ingredients: [ing("almond-flour", 150), ing("egg", 2, "pcs"), ing("mozzarella", 120), ing("psyllium", 6), ing("tomato-fresh", 150), ing("oregano", 1), ing("olive-oil", 10, "ml"), ing("salt", 3)],
    servingsBase: 2,
    methods: [{
      method: "oven", isBestResult: true, prepTime: 18, activeTime: 15, cookTime: 24,
      ovenSettings: { tempC: 200, fan: true, preheat: true, covered: false },
      steps: [
        step("Приготви основата от брашно, псилиум, яйца и малко моцарела, предпечи 10 мин.", { appliance: "oven", minutes: 10, tempC: 200 }),
        step("Разстели пасирани домати, добави остатъчната моцарела."),
        step("Допечи 12-14 мин на 200°C.", { appliance: "oven", minutes: 14, tempC: 200 }),
        step("Поръси с риган и зехтин преди сервиране."),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["pizza", "dairy"], image: "keto-pizza-margherita",
  }),
  recipe({
    id: "keto-pizza-lukanka",
    title: "Кето пица с луканка и чушки",
    description: "Българска версия с луканка вместо салам.",
    category: "pizza", cuisine: "bg", dietType: ["keto"],
    ingredients: [ing("almond-flour", 150), ing("egg", 2, "pcs"), ing("mozzarella", 100), ing("psyllium", 6), ing("sausage-lukanka", 80), ing("pepper", 1, "pcs"), ing("tomato-fresh", 130), ing("salt", 3)],
    servingsBase: 2,
    methods: [{
      method: "oven", isBestResult: true, prepTime: 18, activeTime: 15, cookTime: 26,
      ovenSettings: { tempC: 200, fan: true, preheat: true, covered: false },
      steps: [
        step("Приготви и предпечи основата 10 мин.", { appliance: "oven", minutes: 10, tempC: 200 }),
        step("Разстели доматен сос, добави нарязана луканка и чушка."),
        step("Поръси с моцарела, допечи 14 мин.", { appliance: "oven", minutes: 14, tempC: 200 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["pizza", "bulgarian", "dairy"], image: "keto-pizza-lukanka",
  }),
];
