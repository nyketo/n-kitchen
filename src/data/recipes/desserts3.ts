import { ing, step, recipe } from "../builder";
import type { Recipe } from "@/lib/types";

export const desserts3Recipes: Recipe[] = [
  recipe({
    id: "keto-vanilla-panna-cotta",
    title: "Кето ванилова панакота",
    description: "Кремообразен десерт без желатин от захар.",
    category: "desserts", cuisine: "international", dietType: ["keto"],
    ingredients: [ing("schlagsahne", 250, "ml"), ing("erythritol", 40), ing("butter", 10)],
    servingsBase: 2,
    methods: [{
      method: "stovetop", isBestResult: true, prepTime: 5, activeTime: 8, cookTime: 8,
      hobSettings: { power: "слаб огън ≈ 3/9" },
      steps: [
        step("Загрей сметаната с еритритол и масло на слаб огън 8 мин, без да ври.", { appliance: "stovetop", minutes: 8 }),
        step("Изсипи в купички, охлади в хладилник поне 3 часа."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["dessert", "dairy"], image: "vanilla-panna-cotta",
  }),
  recipe({
    id: "keto-chocolate-mug-cake",
    title: "Кето шоколадов кекс в чаша",
    description: "Готов за 5 минути в микровълнова или фурна.",
    category: "desserts", cuisine: "international", dietType: ["keto"],
    ingredients: [ing("almond-flour", 30), ing("cocoa", 10), ing("egg", 1, "pcs"), ing("erythritol", 15), ing("butter", 15), ing("baking-powder", 2)],
    servingsBase: 1,
    methods: [{
      method: "oven", isBestResult: true, prepTime: 5, activeTime: 5, cookTime: 15,
      ovenSettings: { tempC: 180, fan: true, preheat: true, covered: false },
      steps: [
        step("Смеси всички съставки в купа до гладкост."),
        step("Изсипи в чаша, годна за фурна."),
        step("Печи 12-15 мин на 180°C.", { appliance: "oven", minutes: 15, tempC: 180 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["dessert", "dairy", "quick"], image: "choc-mug-cake",
  }),
  recipe({
    id: "keto-cheesecake-mini",
    title: "Мини кето чийзкейк",
    description: "Кремообразен чийзкейк с бадемова коричка.",
    category: "desserts", cuisine: "international", dietType: ["keto"],
    ingredients: [ing("cream-cheese", 200), ing("almond-flour", 60), ing("butter", 40), ing("egg", 2, "pcs"), ing("erythritol", 50)],
    servingsBase: 2,
    methods: [{
      method: "oven", isBestResult: true, prepTime: 15, activeTime: 12, cookTime: 35,
      ovenSettings: { tempC: 165, fan: true, preheat: true, covered: false },
      steps: [
        step("Смеси бадемово брашно с разтопено масло, притисни на дъното на форма."),
        step("Разбий крема сирене с яйцата и еритритол, изсипи отгоре."),
        step("Печи 30-35 мин на 165°C.", { appliance: "oven", minutes: 35, tempC: 165 }),
        step("Охлади напълно преди рязане."),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["dessert", "dairy", "nuts"], image: "mini-cheesecake",
  }),
  recipe({
    id: "keto-whipped-cream-berries-free",
    title: "Разбита сметана с какао",
    description: "Най-бързият десерт — готов за 5 минути.",
    category: "desserts", cuisine: "international", dietType: ["keto"],
    ingredients: [ing("schlagsahne", 150, "ml"), ing("cocoa", 8), ing("erythritol", 15)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 5, activeTime: 5, cookTime: 0,
      steps: [step("Разбий сметаната с миксер до сгъстяване."), step("Добави какао и еритритол, разбъркай леко.")],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["dessert", "dairy", "quick"], image: "whipped-cream-cocoa",
  }),
  recipe({
    id: "keto-almond-cookies-simple",
    title: "Прости бадемови бисквити",
    description: "Хрупкави бисквити само от 4 съставки.",
    category: "desserts", cuisine: "international", dietType: ["keto"],
    ingredients: [ing("almond-flour", 150), ing("butter", 60), ing("erythritol", 40), ing("egg", 1, "pcs")],
    servingsBase: 2,
    methods: [{
      method: "oven", isBestResult: true, prepTime: 10, activeTime: 10, cookTime: 14,
      ovenSettings: { tempC: 170, fan: true, preheat: true, covered: false },
      steps: [
        step("Смеси всички съставки до тесто."),
        step("Оформи малки бисквитки, подреди на тава."),
        step("Печи 12-14 мин на 170°C до леко златисто.", { appliance: "oven", minutes: 14, tempC: 170 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["dessert", "dairy", "nuts"], image: "almond-cookies",
  }),
];
