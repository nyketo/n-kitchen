import { ing, step, recipe } from "../builder";
import type { Recipe } from "@/lib/types";

export const soups3Recipes: Recipe[] = [
  recipe({
    id: "soup-beef-shin-cook4me",
    title: "Телешка супа джолан в Cook4me",
    description: "Наситена бульонна супа, готова за 35 мин под налягане.",
    category: "soups", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [ing("beef-shin", 300), ing("carrot", 60), ing("celery", 50), ing("leek", 50), ing("bay-leaf", 1, "pcs"), ing("salt", 5)],
    servingsBase: 1,
    methods: [{
      method: "cook4me", isBestResult: true, prepTime: 10, activeTime: 5, cookTime: 35,
      steps: [
        step("Добави всички съставки и 800 ml вода в купата."),
        step("Затвори капака, Pressure Cooking 35 мин.", { appliance: "cook4me", minutes: 35 }),
        step("Извади месото, нарежи и върни в супата."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "winter", dairyFree: true, omadCompatible: false,
    tags: ["soup", "beef", "cook4me"], image: "beef-shin-soup",
  }),
  recipe({
    id: "soup-cauliflower-cream-bacon",
    title: "Крем супа от карфиол с бекон",
    description: "Кадифена супа с хрупкав бекон отгоре.",
    category: "soups", cuisine: "international", dietType: ["keto"],
    ingredients: [ing("cauliflower", 400), ing("bacon", 60), ing("butter", 20), ing("schlagsahne", 60, "ml"), ing("salt", 5)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", isBestResult: true, prepTime: 10, activeTime: 12, cookTime: 22,
      hobSettings: { power: "среден огън ≈ 5/9" },
      steps: [
        step("Задуши карфиола в масло 5 мин.", { appliance: "stovetop", minutes: 5 }),
        step("Добави 400 ml вода, вари 15 мин.", { appliance: "stovetop", minutes: 15 }),
        step("Пасирай, добави сметана и сол."),
        step("Запържи бекона хрупкав, поръси отгоре.", { appliance: "stovetop", minutes: 5 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "winter", dairyFree: false, omadCompatible: false,
    tags: ["soup", "dairy"], image: "cauliflower-bacon-soup",
  }),
  recipe({
    id: "soup-egg-lemon-chicken-bg",
    title: "Пилешка супа с яйце и лимон",
    description: "Българска класика без ориз, само месо и зеленчуци.",
    category: "soups", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [ing("chicken-breast", 300), ing("carrot", 50), ing("celery", 40), ing("egg", 2, "pcs"), ing("lemon", 15, "ml"), ing("salt", 5)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", isBestResult: true, prepTime: 10, activeTime: 15, cookTime: 30,
      hobSettings: { power: "среден огън ≈ 5/9" },
      steps: [
        step("Свари пилето със зеленчуците в 700 ml вода 25 мин.", { appliance: "stovetop", minutes: 25 }),
        step("Извади и нарежи пилето, върни в супата."),
        step("Разбий яйцата с лимоновия сок, разреди с малко топла супа, вкарай обратно бавно, разбърквай.", { appliance: "stovetop", minutes: 3 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "winter", dairyFree: true, omadCompatible: false,
    tags: ["soup", "chicken", "bulgarian"], image: "egg-lemon-soup",
  }),
  recipe({
    id: "soup-tomato-basil-simple",
    title: "Крем супа от домати",
    description: "Лека и освежаваща лятна крем супа.",
    category: "soups", cuisine: "international", dietType: ["keto", "low-carb"],
    ingredients: [ing("tomato-fresh", 500), ing("onion", 60), ing("olive-oil", 20, "ml"), ing("oregano", 1), ing("salt", 5)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", isBestResult: true, prepTime: 10, activeTime: 10, cookTime: 20,
      hobSettings: { power: "среден огън ≈ 5/9" },
      steps: [
        step("Задуши лука в олио 4 мин.", { appliance: "stovetop", minutes: 4 }),
        step("Добави доматите и 200 ml вода, вари 15 мин.", { appliance: "stovetop", minutes: 15 }),
        step("Пасирай, подправи с риган и сол."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "summer", dairyFree: true, omadCompatible: false,
    tags: ["soup"], image: "tomato-basil-soup",
  }),
  recipe({
    id: "soup-pork-sauerkraut-bg",
    title: "Супа от кисело зеле със свинско",
    description: "Кисела и заситваща зимна супа.",
    category: "soups", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [ing("pork-shoulder", 250), ing("sauerkraut", 300), ing("onion", 50), ing("paprika", 1), ing("olive-oil", 15, "ml"), ing("salt", 4)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", isBestResult: true, prepTime: 10, activeTime: 15, cookTime: 35,
      hobSettings: { power: "среден огън ≈ 5/9" },
      steps: [
        step("Запържи месото на кубчета с лука в олио 8 мин.", { appliance: "stovetop", minutes: 8 }),
        step("Добави киселото зеле, паприка и 600 ml вода."),
        step("Вари 25 мин на слаб огън.", { appliance: "stovetop", minutes: 25 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "winter", dairyFree: true, omadCompatible: false,
    tags: ["soup", "pork", "bulgarian"], image: "sauerkraut-soup",
  }),
];
