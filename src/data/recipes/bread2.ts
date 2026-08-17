import { ing, step, recipe } from "../builder";
import type { Recipe } from "@/lib/types";

export const bread2Recipes: Recipe[] = [
  recipe({
    id: "keto-flatbread-almond-quick",
    title: "Бърз кето плосък хляб",
    description: "Готов за 10 минути на тиган, без фурна.",
    category: "bread", cuisine: "international", dietType: ["keto"],
    ingredients: [ing("almond-flour", 100), ing("egg", 1, "pcs"), ing("psyllium", 4), ing("olive-oil", 10, "ml"), ing("salt", 2)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", isBestResult: true, prepTime: 8, activeTime: 10, cookTime: 8,
      hobSettings: { power: "среден огън ≈ 5/9" },
      steps: [
        step("Смеси всички съставки до гладко тесто."),
        step("Разстели на тънко, изпечи в тиган по 3-4 мин от всяка страна.", { appliance: "stovetop", minutes: 8 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: true, omadCompatible: false,
    tags: ["bread", "quick"], image: "quick-flatbread",
  }),
  recipe({
    id: "keto-cheese-crackers",
    title: "Кето солети с кашкавал",
    description: "Хрупкави солети — идеални за мезе.",
    category: "bread", cuisine: "international", dietType: ["keto"],
    ingredients: [ing("yellow-cheese", 150), ing("almond-flour", 60), ing("egg", 1, "pcs"), ing("salt", 2)],
    servingsBase: 2,
    methods: [{
      method: "oven", isBestResult: true, prepTime: 12, activeTime: 10, cookTime: 15,
      ovenSettings: { tempC: 180, fan: true, preheat: true, covered: false },
      steps: [
        step("Настържи кашкавала, смеси с брашно, яйце и сол до тесто."),
        step("Разстели тънко, наряза на ивици."),
        step("Печи 12-15 мин на 180°C до златисто.", { appliance: "oven", minutes: 15, tempC: 180 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["bread", "dairy"], image: "cheese-crackers",
  }),
  recipe({
    id: "keto-coconut-flour-loaf",
    title: "Кето хляб с кокосово брашно",
    description: "По-лек хляб с деликатен вкус.",
    category: "bread", cuisine: "international", dietType: ["keto"],
    ingredients: [ing("coconut-flour", 80), ing("egg", 5, "pcs"), ing("butter", 40), ing("baking-powder", 6), ing("salt", 3)],
    servingsBase: 3,
    methods: [{
      method: "oven", isBestResult: true, prepTime: 12, activeTime: 10, cookTime: 40,
      ovenSettings: { tempC: 175, fan: true, preheat: true, covered: false },
      steps: [
        step("Разбий яйцата с разтопено масло."),
        step("Добави кокосово брашно, бакпулвер и сол, разбъркай до гладко тесто."),
        step("Изсипи във форма, печи 35-40 мин на 175°C.", { appliance: "oven", minutes: 40, tempC: 175 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["bread", "dairy"], image: "coconut-flour-loaf",
  }),
];
