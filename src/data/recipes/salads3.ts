import { ing, step, recipe } from "../builder";
import type { Recipe } from "@/lib/types";

export const salads3Recipes: Recipe[] = [
  recipe({
    id: "salad-caesar-keto-chicken",
    title: "Кето салата Цезар с пиле",
    description: "Класиката, адаптирана без крутони.",
    category: "salads", cuisine: "international", dietType: ["keto"],
    ingredients: [ing("chicken-breast", 200), ing("green-salad", 150), ing("parmesan", 30), ing("olive-oil", 20, "ml"), ing("lemon", 10, "ml"), ing("garlic", 1, "pcs"), ing("salt", 3)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", isBestResult: true, prepTime: 10, activeTime: 12, cookTime: 10,
      hobSettings: { power: "среден-силен огън ≈ 6/9" },
      steps: [
        step("Запечи пилешкото филе 10 мин, нарежи на ивици.", { appliance: "stovetop", minutes: 10 }),
        step("Смеси зелената салата с олио, лимон, счукан чесън и сол."),
        step("Добави пилето и настъргания пармезан."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["salad", "chicken", "dairy", "quick"], image: "caesar-keto",
  }),
  recipe({
    id: "salad-greek-style-bg",
    title: "Гръцка салата",
    description: "Свежа салата с краставица, домат и сирене.",
    category: "salads", cuisine: "international", dietType: ["keto", "low-carb"],
    ingredients: [ing("cucumber", 150), ing("tomato-fresh", 150), ing("white-cheese", 60), ing("onion", 30), ing("olive-oil", 20, "ml"), ing("oregano", 1), ing("salt", 3)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 10, activeTime: 10, cookTime: 0,
      steps: [
        step("Наряза краставицата, доматите и лука на едро."),
        step("Смеси със зехтин, риган и сол."),
        step("Постави настъргано сирене отгоре."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "summer", dairyFree: false, omadCompatible: false,
    tags: ["salad", "dairy", "quick"], image: "greek-salad",
  }),
  recipe({
    id: "salad-broccoli-bacon-egg",
    title: "Салата от броколи с бекон и яйце",
    description: "Заситваща салата с кремообразен дресинг.",
    category: "salads", cuisine: "international", dietType: ["keto"],
    ingredients: [ing("broccoli", 250), ing("bacon", 60), ing("egg", 2, "pcs"), ing("cream-cheese", 30), ing("olive-oil", 10, "ml"), ing("salt", 3)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", isBestResult: true, prepTime: 12, activeTime: 12, cookTime: 12,
      hobSettings: { power: "среден огън ≈ 5/9" },
      steps: [
        step("Свари броколите на пара 6 мин, свари яйцата твърдо 9 мин.", { appliance: "stovetop", minutes: 9 }),
        step("Запържи бекона хрупкав 5 мин.", { appliance: "stovetop", minutes: 5 }),
        step("Смеси всичко с крема сирене, разредено с малко олио."),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["salad", "dairy"], image: "broccoli-bacon-salad",
  }),
  recipe({
    id: "salad-avocado-shrimp-free",
    title: "Салата с краставица и скариди",
    description: "Свежа протеинова салата за лятото.",
    category: "salads", cuisine: "international", dietType: ["keto", "low-carb"],
    ingredients: [ing("shrimp", 200), ing("cucumber", 200), ing("green-salad", 80), ing("olive-oil", 20, "ml"), ing("lemon", 10, "ml"), ing("salt", 3)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", isBestResult: true, prepTime: 10, activeTime: 8, cookTime: 5,
      hobSettings: { power: "силен огън ≈ 7/9" },
      steps: [
        step("Запържи скаридите в малко олио 4-5 мин.", { appliance: "stovetop", minutes: 5 }),
        step("Смеси краставица и салата с олио, лимон и сол."),
        step("Добави скаридите отгоре."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "summer", dairyFree: true, omadCompatible: false,
    tags: ["salad", "quick"], image: "shrimp-cucumber-salad",
  }),
  recipe({
    id: "salad-cabbage-carrot-vinegar",
    title: "Салата от зеле и моркови",
    description: "Хрупкава зимна салата с оцетен дресинг.",
    category: "salads", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [ing("cabbage", 300), ing("carrot", 50), ing("olive-oil", 15, "ml"), ing("apple-cider-vinegar", 10, "ml"), ing("salt", 3)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 10, activeTime: 10, cookTime: 0,
      steps: [
        step("Настържи зелето и моркова на тънко."),
        step("Смеси с олио, оцет и сол, остави 10 мин преди сервиране."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "winter", dairyFree: true, omadCompatible: false,
    tags: ["salad", "cabbage", "bulgarian", "quick"], image: "cabbage-carrot-salad",
  }),
];
