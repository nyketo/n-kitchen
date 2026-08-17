import { ing, step, recipe } from "../builder";
import type { Recipe } from "@/lib/types";

export const cabbageRecipes: Recipe[] = [
  recipe({
    id: "cabbage-stuffed-rolls-pork-cook4me",
    title: "Сарми от зеле със свинска кайма в Cook4me",
    description: "Класически сарми без ориз — само кайма и подправки.",
    category: "cabbage", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [ing("pork-minced", 350), ing("cabbage", 500, "g", "листа за увиване"), ing("onion", 60), ing("tomato-fresh", 100), ing("olive-oil", 15, "ml"), ing("savory", 1), ing("salt", 6)],
    servingsBase: 1,
    methods: [{
      method: "cook4me", isBestResult: true, prepTime: 25, activeTime: 20, cookTime: 30,
      steps: [
        step("Попари зелевите листа за омекване."),
        step("Смеси каймата с настъргания лук, чубрица и сол."),
        step("Увий сармички в листата, подреди плътно в купата."),
        step("Залей с пасирани домати и 150 ml вода."),
        step("Затвори капака, Pressure Cooking 28-30 мин.", { appliance: "cook4me", minutes: 30 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "winter", dairyFree: true, omadCompatible: true,
    tags: ["cabbage", "bulgarian", "cook4me"], image: "cabbage-rolls-cook4me",
  }),
  recipe({
    id: "cabbage-braised-bacon-stovetop",
    title: "Задушено зеле с бекон",
    description: "Уютно зимно ястие в един тиган.",
    category: "cabbage", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [ing("cabbage", 400), ing("bacon", 100), ing("onion", 50), ing("paprika", 1), ing("salt", 4)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", isBestResult: true, prepTime: 10, activeTime: 15, cookTime: 25,
      hobSettings: { power: "среден огън ≈ 5/9" },
      steps: [
        step("Запържи бекона и лука 6 мин.", { appliance: "stovetop", minutes: 6 }),
        step("Добави нарязаното зеле, паприка и сол."),
        step("Задушавай на слаб огън 18 мин с капак.", { appliance: "stovetop", minutes: 18 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "winter", dairyFree: true, omadCompatible: true,
    tags: ["cabbage", "bulgarian"], image: "braised-cabbage-bacon",
  }),
  recipe({
    id: "cabbage-chicken-soup-hearty",
    title: "Гъста пилешка супа със зеле",
    description: "Заситваща зимна супа с много зеле.",
    category: "cabbage", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [ing("chicken-thigh", 300), ing("cabbage", 300), ing("carrot", 50), ing("onion", 50), ing("paprika", 1), ing("salt", 5)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", isBestResult: true, prepTime: 10, activeTime: 12, cookTime: 35,
      hobSettings: { power: "среден огън ≈ 5/9" },
      steps: [
        step("Свари пилето с моркова и лука в 700 ml вода 20 мин.", { appliance: "stovetop", minutes: 20 }),
        step("Извади и нарежи пилето, върни в супата."),
        step("Добави зелето и паприка, довари 15 мин.", { appliance: "stovetop", minutes: 15 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "winter", dairyFree: true, omadCompatible: false,
    tags: ["cabbage", "soup", "bulgarian", "chicken"], image: "cabbage-chicken-soup",
  }),
  recipe({
    id: "cabbage-sauerkraut-pork-ribs-cook4me",
    title: "Кисело зеле с ребра в Cook4me",
    description: "Класика за студените месеци — готово под налягане.",
    category: "cabbage", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [ing("pork-ribs", 350), ing("sauerkraut", 400), ing("onion", 50), ing("paprika", 2), ing("olive-oil", 15, "ml"), ing("bay-leaf", 1, "pcs"), ing("salt", 4)],
    servingsBase: 1,
    methods: [{
      method: "cook4me", isBestResult: true, prepTime: 12, activeTime: 10, cookTime: 32,
      steps: [
        step("Запечи ребрата с лука 8 мин с отворен капак.", { appliance: "cook4me", minutes: 8 }),
        step("Добави киселото зеле, паприка, дафинов лист и 150 ml вода."),
        step("Затвори капака, Pressure Cooking 30 мин.", { appliance: "cook4me", minutes: 30 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "winter", dairyFree: true, omadCompatible: true,
    tags: ["cabbage", "pork", "bulgarian", "cook4me"], image: "sauerkraut-ribs-cook4me",
  }),
  recipe({
    id: "cabbage-beef-minced-skillet-quick",
    title: "Зеле с телешка кайма на тиган",
    description: "Бърз всекидневен вариант за 25 минути.",
    category: "cabbage", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [ing("beef-minced", 300), ing("cabbage", 350), ing("onion", 50), ing("tomato-fresh", 80), ing("olive-oil", 15, "ml"), ing("salt", 5)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", isBestResult: true, prepTime: 10, activeTime: 15, cookTime: 22,
      hobSettings: { power: "среден огън ≈ 5/9" },
      steps: [
        step("Запържи каймата с лука 8 мин.", { appliance: "stovetop", minutes: 8 }),
        step("Добави зелето и домата, задушавай 14 мин.", { appliance: "stovetop", minutes: 14 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "winter", dairyFree: true, omadCompatible: true,
    tags: ["cabbage", "beef", "bulgarian", "quick"], image: "cabbage-beef-skillet",
  }),
  recipe({
    id: "cabbage-slaw-keto-mayo-free",
    title: "Хрупкава зелева салата (кето слоу)",
    description: "Освежаваща салата, отлична за гарнитура на грил месо.",
    category: "cabbage", cuisine: "international", dietType: ["keto", "low-carb"],
    ingredients: [ing("cabbage", 300), ing("carrot", 40), ing("olive-oil", 20, "ml"), ing("apple-cider-vinegar", 12, "ml"), ing("mint", 1), ing("salt", 3)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 10, activeTime: 10, cookTime: 0,
      steps: [
        step("Настържи зелето и моркова на тънки ивици."),
        step("Смеси с олио, оцет, мента и сол, остави 15 мин преди сервиране."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: true, omadCompatible: false,
    tags: ["cabbage", "salad", "quick"], image: "keto-coleslaw",
  }),
];
