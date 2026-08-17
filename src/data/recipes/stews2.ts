import { ing, step, recipe } from "../builder";
import type { Recipe } from "@/lib/types";

export const stews2Recipes: Recipe[] = [
  recipe({
    id: "stew-pork-green-beans-bg",
    title: "Яхния от свинско със зелен фасул",
    description: "Домашна лятна яхния в тенджера.",
    category: "stews", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [ing("pork-shoulder", 350), ing("green-beans", 300), ing("tomato-fresh", 120), ing("onion", 60), ing("olive-oil", 15, "ml"), ing("savory", 1), ing("salt", 5)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", isBestResult: true, prepTime: 12, activeTime: 15, cookTime: 40,
      hobSettings: { power: "средно-силен, после слаб огън ≈ 6→3/9" },
      steps: [
        step("Запечи месото на кубчета с лука в олио 8 мин.", { appliance: "stovetop", minutes: 8 }),
        step("Добави доматите и 200 ml вода, задушавай 20 мин.", { appliance: "stovetop", minutes: 20 }),
        step("Добави зеления фасул и чубрица, довари 12 мин.", { appliance: "stovetop", minutes: 12 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "summer", dairyFree: true, omadCompatible: true,
    tags: ["stew", "pork", "bulgarian"], image: "pork-green-beans-stew",
  }),
  recipe({
    id: "stew-chicken-cook4me-vegetables",
    title: "Пилешка яхния със зеленчуци в Cook4me",
    description: "Бърза домашна яхния за 20 минути.",
    category: "stews", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [ing("chicken-thigh", 350), ing("carrot", 60), ing("celery", 50), ing("tomato-fresh", 120), ing("olive-oil", 15, "ml"), ing("bay-leaf", 1, "pcs"), ing("salt", 5)],
    servingsBase: 1,
    methods: [{
      method: "cook4me", isBestResult: true, prepTime: 10, activeTime: 8, cookTime: 20,
      steps: [
        step("Запечи бонфилетата с отворен капак 6 мин.", { appliance: "cook4me", minutes: 6 }),
        step("Добави зеленчуците, домати, дафинов лист и сол."),
        step("Затвори капака, Pressure Cooking 18 мин.", { appliance: "cook4me", minutes: 18 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "winter", dairyFree: true, omadCompatible: true,
    tags: ["stew", "chicken", "bulgarian", "cook4me"], image: "chicken-vegetable-stew",
  }),
  recipe({
    id: "stew-beef-celery-root-free-celery-stalk",
    title: "Телешка яхния с целина",
    description: "Ароматна зимна яхния с целина на дръжки.",
    category: "stews", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [ing("beef-chuck", 350), ing("celery", 200), ing("carrot", 60), ing("tomato-fresh", 100), ing("olive-oil", 15, "ml"), ing("bay-leaf", 1, "pcs"), ing("salt", 5)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", isBestResult: true, prepTime: 12, activeTime: 15, cookTime: 55,
      hobSettings: { power: "средно-силен, после слаб огън ≈ 6→3/9" },
      steps: [
        step("Запечи месото на кубчета в олио 8 мин.", { appliance: "stovetop", minutes: 8 }),
        step("Добави моркова и домати, задушавай 30 мин.", { appliance: "stovetop", minutes: 30 }),
        step("Добави целината, довари 17 мин.", { appliance: "stovetop", minutes: 17 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "winter", dairyFree: true, omadCompatible: true,
    tags: ["stew", "beef", "bulgarian"], image: "beef-celery-stew",
  }),
  recipe({
    id: "stew-pork-cauliflower-paprika",
    title: "Яхния от свинско с карфиол",
    description: "Наситена яхния с червен пипер и карфиол.",
    category: "stews", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [ing("pork-neck", 350), ing("cauliflower", 300), ing("onion", 60), ing("tomato-fresh", 120), ing("paprika", 2), ing("olive-oil", 15, "ml"), ing("salt", 5)],
    servingsBase: 1,
    methods: [{
      method: "cook4me", isBestResult: true, prepTime: 12, activeTime: 10, cookTime: 22,
      steps: [
        step("Запечи месото с лука 8 мин с отворен капак.", { appliance: "cook4me", minutes: 8 }),
        step("Добави домати, паприка, сол и 100 ml вода."),
        step("Затвори капака, Pressure Cooking 15 мин.", { appliance: "cook4me", minutes: 15 }),
        step("Отвори, добави карфиола, довари 7 мин с отворен капак.", { appliance: "cook4me", minutes: 7 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "winter", dairyFree: true, omadCompatible: true,
    tags: ["stew", "pork", "bulgarian", "cook4me"], image: "pork-cauliflower-stew",
  }),
];
