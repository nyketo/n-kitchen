import { ing, step, recipe } from "../builder";
import type { Recipe } from "@/lib/types";

export const sauces2Recipes: Recipe[] = [
  recipe({
    id: "sauce-tomato-savory-bg",
    title: "Доматен сос с чубрица",
    description: "Ароматен сос за кюфтета и месо, с типичната българска чубрица.",
    category: "sauces", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [ing("tomato-fresh", 220), ing("olive-oil", 15, "ml"), ing("savory", 1), ing("garlic", 1, "pcs"), ing("salt", 2)],
    servingsBase: 2,
    methods: [{
      method: "stovetop", prepTime: 5, activeTime: 10, cookTime: 12,
      hobSettings: { power: "среден огън ≈ 5/9" },
      steps: [
        step("Пасирай доматите."),
        step("Загрей зехтина, добави чесъна за 30 сек."),
        step("Добави доматите, чубрица и сол, задушавай 10 мин.", { appliance: "stovetop", minutes: 10 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "summer", dairyFree: true, omadCompatible: false,
    tags: ["sauce", "bulgarian"], image: "tomato-savory-sauce",
  }),
  recipe({
    id: "sauce-rosemary-garlic-oil",
    title: "Розмаринова маринова за грил",
    description: "Ароматна марината за месо преди грил.",
    category: "sauces", cuisine: "international", dietType: ["keto", "low-carb"],
    ingredients: [ing("olive-oil", 40, "ml"), ing("rosemary", 1), ing("garlic", 2, "pcs"), ing("salt", 2)],
    servingsBase: 2,
    methods: [{
      method: "stovetop", prepTime: 5, activeTime: 5, cookTime: 0,
      steps: [step("Счукай чесъна, смеси с олио, розмарин и сол. Остави 15 мин преди употреба.")],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: true, omadCompatible: false,
    tags: ["sauce", "marinade"], image: "rosemary-marinade",
  }),
  recipe({
    id: "sauce-walnut-garlic",
    title: "Ореховo-чеснов сос",
    description: "Плътен сос от смлени орехи, зехтин и чесън — за месо или зеленчуци.",
    category: "sauces", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [ing("walnuts", 40), ing("olive-oil", 20, "ml"), ing("garlic", 1, "pcs"), ing("apple-cider-vinegar", 8, "ml"), ing("salt", 2)],
    servingsBase: 2,
    methods: [{
      method: "stovetop", prepTime: 8, activeTime: 8, cookTime: 0,
      steps: [step("Смели орехите и чесъна, смеси със зехтин, оцет и сол до паста.")],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: true, omadCompatible: false,
    tags: ["sauce", "nuts"], image: "walnut-garlic-sauce",
  }),
  recipe({
    id: "sauce-paprika-butter",
    title: "Маслен сос с червен пипер",
    description: "Класически български сос за печено месо и зеленчуци.",
    category: "sauces", cuisine: "bg", dietType: ["keto"],
    ingredients: [ing("butter", 40), ing("paprika", 1), ing("garlic", 1, "pcs"), ing("salt", 1)],
    servingsBase: 2,
    methods: [{
      method: "stovetop", prepTime: 2, activeTime: 4, cookTime: 4,
      hobSettings: { power: "слаб огън ≈ 2/9" },
      steps: [
        step("Разтопи маслото на слаб огън."),
        step("Свали от огъня, добави паприка, чесън и сол, разбъркай бързо, за да не загори паприката."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["sauce", "dairy", "quick", "bulgarian"], image: "paprika-butter-sauce",
  }),
  recipe({
    id: "sauce-pickled-pepper-relish",
    title: "Релиш от пиперонки",
    description: "Пикантно допълнение за месо на грил.",
    category: "sauces", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [ing("pickled-pepper", 60), ing("olive-oil", 15, "ml"), ing("garlic", 1, "pcs")],
    servingsBase: 2,
    methods: [{
      method: "stovetop", prepTime: 5, activeTime: 5, cookTime: 0,
      steps: [step("Наряза пиперонките на ситно, смеси със зехтин и счукан чесън.")],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: true, omadCompatible: false,
    tags: ["sauce", "spicy", "quick"], image: "pepper-relish",
  }),
];
