import { ing, step, recipe } from "../builder";
import type { Recipe } from "@/lib/types";

export const sauces3Recipes: Recipe[] = [
  recipe({
    id: "sauce-lemon-caper-free-butter",
    title: "Лимонов маслен сос за риба",
    description: "Класически сос за бяла риба и морски дарове.",
    category: "sauces", cuisine: "international", dietType: ["keto"],
    ingredients: [ing("butter", 50), ing("lemon", 15, "ml"), ing("garlic", 1, "pcs"), ing("salt", 2)],
    servingsBase: 2,
    methods: [{
      method: "stovetop", prepTime: 3, activeTime: 5, cookTime: 4,
      hobSettings: { power: "слаб огън ≈ 2/9" },
      steps: [step("Разтопи маслото на слаб огън, добави чесън 30 сек.", { appliance: "stovetop", minutes: 4 }), step("Свали от огъня, добави лимонов сок и сол.")],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["sauce", "dairy", "quick"], image: "lemon-butter-sauce",
  }),
  recipe({
    id: "sauce-yogurt-garlic-cucumber-free",
    title: "Кисело мляко с чесън",
    description: "Освежаващ дип за месо на грил.",
    category: "sauces", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [ing("yogurt", 200), ing("garlic", 1, "pcs"), ing("olive-oil", 10, "ml"), ing("mint", 1), ing("salt", 2)],
    servingsBase: 2,
    methods: [{
      method: "stovetop", prepTime: 5, activeTime: 5, cookTime: 0,
      steps: [step("Смеси киселото мляко с настъргания чесън, олио, мента и сол.")],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "summer", dairyFree: false, omadCompatible: false,
    tags: ["sauce", "dairy", "bulgarian", "quick"], image: "yogurt-garlic-sauce",
  }),
  recipe({
    id: "sauce-spicy-tomato-hot-pepper",
    title: "Пикантен доматен сос",
    description: "Наситен и лют сос за месо.",
    category: "sauces", cuisine: "international", dietType: ["keto", "low-carb"],
    ingredients: [ing("tomato-fresh", 250), ing("hot-pepper-fresh", 1, "pcs"), ing("garlic", 2, "pcs"), ing("olive-oil", 15, "ml"), ing("salt", 3)],
    servingsBase: 2,
    methods: [{
      method: "stovetop", prepTime: 8, activeTime: 10, cookTime: 12,
      hobSettings: { power: "среден огън ≈ 5/9" },
      steps: [
        step("Пасирай доматите с лютата чушка."),
        step("Загрей олиото, добави чесъна 30 сек."),
        step("Добави пасираните домати и сол, задушавай 10 мин.", { appliance: "stovetop", minutes: 10 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "summer", dairyFree: true, omadCompatible: false,
    tags: ["sauce", "spicy"], image: "spicy-tomato-sauce",
  }),
  recipe({
    id: "sauce-basil-oil-simple",
    title: "Зехтин с чесън и билки",
    description: "Ароматизиран зехтин за поливане на готово месо.",
    category: "sauces", cuisine: "international", dietType: ["keto", "low-carb"],
    ingredients: [ing("olive-oil", 60, "ml"), ing("garlic", 2, "pcs"), ing("oregano", 1), ing("salt", 2)],
    servingsBase: 2,
    methods: [{
      method: "stovetop", prepTime: 5, activeTime: 5, cookTime: 0,
      steps: [step("Счукай чесъна, смеси със зехтин, риган и сол, остави 10 мин преди употреба.")],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: true, omadCompatible: false,
    tags: ["sauce", "quick"], image: "basil-garlic-oil",
  }),
];
