// N Kitchen — Българска национална кухня, партида 3 (финална): супи, яхнии, печено, скара и салати.
// Продължение на bulgarian.ts и bulgarian2.ts — десерти, торти и баници с брашно умишлено не са включени.
import { ing, step, recipe } from "../builder";
import type { Recipe } from "@/lib/types";

export const bulgarian3Recipes: Recipe[] = [
  // ---------------- СУПИ ----------------
  recipe({
    id: "bg-lamb-soup-agneshka-chorba",
    title: "Агнешка чорба с яйце-лимон",
    description: "Пролетна чорба от агнешко месо, забулена с яйце и лимон.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("lamb-shoulder", 300), ing("carrot", 40), ing("onion", 40), ing("egg", 2, "pcs"),
      ing("lemon", 15, "ml"), ing("salt", 5), ing("black-pepper", 1),
    ],
    servingsBase: 1,
    methods: [{
      method: "cook4me", isBestResult: true, prepTime: 15, activeTime: 10, cookTime: 40,
      steps: [
        step("Добави месото на кубчета и зеленчуците в купата с 600 ml вода.", { appliance: "cook4me" }),
        step("Затвори капака, избери Pressure Cooking.", { appliance: "cook4me" }),
        step("Задай 30 мин при високо налягане.", { appliance: "cook4me", minutes: 30 }),
        step("Остави естествено освобождаване на парата 10 мин."),
        step("Разбий яйцата с лимоновия сок, разреди с малко бульон и вкарай в тенджерата, като бъркаш."),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "all", dairyFree: true, omadCompatible: false,
    tags: ["soup", "lamb", "bulgarian", "cook4me"], image: "lamb-soup-agneshka-chorba",
  }),
  recipe({
    id: "bg-celery-root-cream-soup",
    title: "Крем супа от целина",
    description: "Ароматна крем супа от целина с масло и черен пипер.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("celery", 300), ing("onion", 40), ing("butter", 20), ing("schlagsahne", 40, "ml"),
      ing("salt", 4), ing("black-pepper", 1),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 10, activeTime: 10, cookTime: 20,
      steps: [
        step("Задушавай лука и целината в маслото 5 мин.", { appliance: "stovetop", minutes: 5 }),
        step("Добави 400 ml вода, вари 15 мин до омекване.", { appliance: "stovetop", minutes: 15 }),
        step("Пасирай, добави сметаната и разбъркай."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "winter", dairyFree: false, omadCompatible: false,
    tags: ["soup", "dairy", "bulgarian", "vegetarian"], image: "celery-root-cream-soup",
  }),
  recipe({
    id: "bg-cabbage-soup-savory",
    title: "Супа от зеле с чубрица",
    description: "Проста домашна супа от прясно зеле, подправена с чубрица.",
    category: "bulgarian", cuisine: "bg", dietType: ["low-carb"],
    ingredients: [
      ing("cabbage", 300), ing("carrot", 40), ing("onion", 40), ing("savory", 1),
      ing("olive-oil", 15, "ml"), ing("salt", 4),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 10, activeTime: 10, cookTime: 25,
      steps: [
        step("Задушавай лука и моркова в олиото 5 мин.", { appliance: "stovetop", minutes: 5 }),
        step("Добави зелето на ивици и 500 ml вода, вари 20 мин.", { appliance: "stovetop", minutes: 20 }),
        step("Подправи с чубрица и сол в края."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "winter", dairyFree: true, omadCompatible: false,
    tags: ["soup", "cabbage", "bulgarian", "vegetarian"], image: "cabbage-soup-savory",
  }),

  // ---------------- ЯХНИИ ----------------
  recipe({
    id: "bg-beef-onion-yahniya",
    title: "Телешко задушено с много лук",
    description: "Наситено телешко ястие, къкрило бавно с изобилие от лук.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("beef-chuck", 350), ing("onion", 150), ing("paprika", 2), ing("bay-leaf", 1, "pcs"),
      ing("ghee", 15), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 15, activeTime: 10, cookTime: 55,
      hobSettings: { power: "средно-силен, после слаб огън" },
      steps: [
        step("Запечи месото на кубчета в гхи 8 мин.", { appliance: "stovetop", minutes: 8 }),
        step("Добави лука на полумесеци, задушавай 8 мин."),
        step("Добави паприка, дафинов лист и 150 ml вода, покрий и задушавай 40 мин.", { appliance: "stovetop", minutes: 40 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "winter", dairyFree: true, omadCompatible: false,
    tags: ["stew", "beef", "bulgarian"], image: "beef-onion-yahniya",
  }),
  recipe({
    id: "bg-pork-sauerkraut-yahniya",
    title: "Свинско с кисело зеле",
    description: "Зимна класика — свинско месо, задушено бавно с кисело зеле.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("pork-shoulder", 300), ing("sauerkraut", 250), ing("onion", 50), ing("paprika", 1),
      ing("ghee", 15), ing("black-pepper", 1),
    ],
    servingsBase: 1,
    methods: [{
      method: "oven", prepTime: 15, activeTime: 10, cookTime: 55,
      ovenSettings: { tempC: 180, fan: false, covered: true, preheat: true },
      steps: [
        step("Запечи месото на кубчета в гхи 6 мин."),
        step("Смеси с киселото зеле и лука в гювече, подправи с паприка."),
        step("Покрий и печи на 180°C 50 мин.", { appliance: "oven", minutes: 50, tempC: 180 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "winter", dairyFree: true, omadCompatible: false,
    tags: ["stew", "pork", "cabbage", "bulgarian", "oven"], image: "pork-sauerkraut-yahniya",
  }),
  recipe({
    id: "bg-chicken-pepper-tomato-yahniya",
    title: "Пилешко задушено с чушки и домати",
    description: "Лятна яхния с пилешко бонфиле, чушки и много домати.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("chicken-thigh", 350), ing("pepper", 120), ing("tomato-fresh", 120), ing("onion", 50),
      ing("olive-oil", 10, "ml"), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 15, activeTime: 10, cookTime: 35,
      steps: [
        step("Запечи пилешкото в олиото 5 мин.", { appliance: "stovetop", minutes: 5 }),
        step("Добави лука и чушките, задушавай 5 мин."),
        step("Добави доматите, покрий и задушавай на слаб огън 25 мин.", { appliance: "stovetop", minutes: 25 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "summer", dairyFree: true, omadCompatible: false,
    tags: ["stew", "chicken", "bulgarian"], image: "chicken-pepper-tomato-yahniya",
  }),

  // ---------------- ПЕЧЕНО / ВАРЕНО ----------------
  recipe({
    id: "bg-eggs-panagyurski",
    title: "Яйца по панагюрски",
    description: "Загубени яйца в топло кисело мляко с чесън, поляти с горещо масло и чубрица.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("egg", 2, "pcs"), ing("yogurt", 150), ing("garlic", 6), ing("butter", 15),
      ing("paprika", 1), ing("apple-cider-vinegar", 5, "ml"), ing("salt", 3),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 10, activeTime: 10, cookTime: 8,
      steps: [
        step("Смеси киселото мляко със счукания чесън и сол, раздели в купичка."),
        step("Сгъши вода с оцет до леко къкрене, пусни яйцата да се сварят загубени 3 мин.", { appliance: "stovetop", minutes: 3 }),
        step("Извади яйцата отгоре на киселото мляко."),
        step("Стопи маслото с паприка до зачервяване и полей отгоре.", { appliance: "stovetop", minutes: 1 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "all", dairyFree: false, omadCompatible: true,
    tags: ["vegetarian", "bulgarian", "quick"], image: "eggs-panagyurski",
  }),
  recipe({
    id: "bg-meatballs-tomato-sauce-oven",
    title: "Кюфтета в доматен сос на фурна",
    description: "Кюфтета, задушени бавно в наситен доматен сос на фурна.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("mixed-minced", 350), ing("onion", 60), ing("tomato-fresh", 150), ing("garlic", 6),
      ing("cumin", 1), ing("olive-oil", 10, "ml"), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "oven", prepTime: 20, activeTime: 12, cookTime: 35,
      ovenSettings: { tempC: 190, fan: false, covered: true, preheat: true },
      steps: [
        step("Замеси каймата с настъргания лук, кимион и сол, оформи кюфтенца."),
        step("Подреди в гювече, залей с доматите и счукания чесън."),
        step("Покрий и печи на 190°C 30 мин.", { appliance: "oven", minutes: 30, tempC: 190 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "all", dairyFree: true, omadCompatible: false,
    tags: ["pork", "beef", "bulgarian", "oven"], image: "meatballs-tomato-sauce-oven",
  }),
  recipe({
    id: "bg-pork-knuckle-oven-garlic-bay",
    title: "Печен джолан с чесън и дафинов лист",
    description: "Свински джолан, бавно печен до разпадащо се крехка консистенция.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("pork-shoulder", 400, "g", "джолан"), ing("garlic", 15), ing("bay-leaf", 3, "pcs"),
      ing("olive-oil", 10, "ml"), ing("salt", 6), ing("black-pepper", 1),
    ],
    servingsBase: 1,
    methods: [{
      method: "oven", prepTime: 10, activeTime: 5, cookTime: 90,
      ovenSettings: { tempC: 160, fan: false, covered: true, preheat: true },
      steps: [
        step("Натрий джолана с олио, счукан чесън, дафинов лист, сол и пипер."),
        step("Постави в тава с капак или фолио и малко вода на дъното."),
        step("Печи на 160°C 80 мин покрито, после 10 мин без капак за коричка.", { appliance: "oven", minutes: 90, tempC: 160 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "winter", dairyFree: true, omadCompatible: true,
    tags: ["pork", "bulgarian", "oven"], image: "pork-knuckle-oven-garlic-bay",
  }),
  recipe({
    id: "bg-chicken-thighs-yogurt-garlic-oven",
    title: "Пилешки бутчета в кисело мляко с чесън на фурна",
    description: "Сочни пилешки бутчета, мариновани в кисело мляко и чесън, после запечени.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("chicken-thigh", 400), ing("yogurt", 100), ing("garlic", 10), ing("paprika", 1),
      ing("olive-oil", 10, "ml"), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "oven", prepTime: 15, activeTime: 8, cookTime: 40,
      ovenSettings: { tempC: 200, fan: true, preheat: true },
      steps: [
        step("Смеси киселото мляко с чесъна, паприка, олио и сол, намажи бутчетата."),
        step("Остави да мариноват поне 15 мин (по избор — до няколко часа)."),
        step("Печи на 200°C 35-40 мин до златисто.", { appliance: "oven", minutes: 38, tempC: 200 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "all", dairyFree: false, omadCompatible: true,
    tags: ["chicken", "bulgarian", "oven"], image: "chicken-thighs-yogurt-garlic-oven",
  }),

  // ---------------- СКАРА ----------------
  recipe({
    id: "bg-pork-chops-grill",
    title: "Свински котлети на скара",
    description: "Прости и сочни свински котлети, изпечени направо на скара.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("pork-loin", 350, "g", "котлети с кост"), ing("olive-oil", 10, "ml"),
      ing("savory", 1), ing("salt", 5), ing("black-pepper", 1),
    ],
    servingsBase: 1,
    methods: [{
      method: "grill", prepTime: 10, activeTime: 8, cookTime: 8,
      grillSettings: { heat: "среден", minutesPerSide: 4, thicknessNote: "~2 см котлети" },
      steps: [
        step("Натрий котлетите с олио, чубрица, сол и пипер."),
        step("Изпечи на скара по 4-5 мин от всяка страна.", { appliance: "grill", minutes: 4 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "summer", dairyFree: true, omadCompatible: true,
    tags: ["pork", "grill", "bulgarian", "quick"], image: "pork-chops-grill",
  }),
  recipe({
    id: "bg-mixed-grill-plate",
    title: "Смесена скара чиния",
    description: "Комбинирана скара — кюфте, кебапче и наденица, изпечени заедно.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("mixed-minced", 150), ing("sausage-quality", 150), ing("onion", 30), ing("cumin", 1),
      ing("olive-oil", 10, "ml"), ing("salt", 4),
    ],
    servingsBase: 1,
    methods: [{
      method: "grill", prepTime: 15, activeTime: 12, cookTime: 12,
      grillSettings: { heat: "среден", minutesPerSide: 5, thicknessNote: "смесени форми" },
      steps: [
        step("Замеси каймата с лука, кимион и сол, оформи по едно кюфте и едно кебапче."),
        step("Подреди с наденицата на скарата."),
        step("Изпечи по 5-6 мин от всяка страна до готовност.", { appliance: "grill", minutes: 5 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "summer", dairyFree: true, omadCompatible: true,
    tags: ["pork", "beef", "grill", "bulgarian"], image: "mixed-grill-plate",
  }),
  recipe({
    id: "bg-salmon-grill-dill",
    title: "Сьомга на скара с копър",
    description: "Филе сьомга, бързо изпечено на скара с лимон и копър.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("salmon", 300), ing("dill", 6), ing("lemon", 15, "ml"), ing("olive-oil", 10, "ml"), ing("salt", 4),
    ],
    servingsBase: 1,
    methods: [{
      method: "grill", prepTime: 8, activeTime: 8, cookTime: 8,
      grillSettings: { heat: "среден", minutesPerSide: 4, thicknessNote: "филе ~2.5 см" },
      steps: [
        step("Намажи филето с олио и сол."),
        step("Изпечи на скара по 3-4 мин от всяка страна.", { appliance: "grill", minutes: 4 }),
        step("Поръси с копър и полей с лимонов сок преди сервиране."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: true, omadCompatible: true,
    tags: ["fish", "grill", "bulgarian", "quick"], image: "salmon-grill-dill",
  }),

  // ---------------- САЛАТИ / БЪРЗИ ЯСТИЯ ----------------
  recipe({
    id: "bg-roasted-pepper-salad",
    title: "Печени чушки със сирене и чесън",
    description: "Опечени и обелени чушки, залети с олио, чесън и оцет.",
    category: "bulgarian", cuisine: "bg", dietType: ["low-carb"],
    ingredients: [
      ing("pepper", 300, "g", "4 чушки"), ing("white-cheese", 50), ing("garlic", 6),
      ing("olive-oil", 15, "ml"), ing("apple-cider-vinegar", 8, "ml"), ing("salt", 3),
    ],
    servingsBase: 1,
    methods: [{
      method: "oven", prepTime: 10, activeTime: 10, cookTime: 25,
      ovenSettings: { tempC: 220, fan: true, preheat: true },
      steps: [
        step("Печи чушките цели на 220°C 20-25 мин до почерняла кожа.", { appliance: "oven", minutes: 23, tempC: 220 }),
        step("Остави ги покрити 10 мин, обели кожата и извади семките."),
        step("Нарежи на ивици, залей със зехтин, счукан чесън и оцет."),
        step("Поръси с натрошено сирене."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "summer", dairyFree: false, omadCompatible: false,
    tags: ["salad", "vegetarian", "bulgarian", "oven"], image: "roasted-pepper-salad",
  }),
  recipe({
    id: "bg-fried-eggs-white-cheese",
    title: "Яйца на очи със сирене",
    description: "Бързи пържени яйца в масло, поръсени с натрошено саламурено сирене.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("egg", 2, "pcs"), ing("butter", 15), ing("white-cheese", 30), ing("salt", 2),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 3, activeTime: 5, cookTime: 5,
      steps: [
        step("Разтопи маслото в тиган на среден огън."),
        step("Пусни яйцата и пържи 3-4 мин до желаната готовност.", { appliance: "stovetop", minutes: 4 }),
        step("Поръси с натрошено сирене и сол."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: false, omadCompatible: true,
    tags: ["vegetarian", "bulgarian", "quick"], image: "fried-eggs-white-cheese",
  }),
  recipe({
    id: "bg-cabbage-carrot-slaw",
    title: "Салата от зеле и моркови",
    description: "Хрупкава салата от настъргано зеле и моркови с лимон и олио.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("cabbage", 250), ing("carrot", 80), ing("lemon", 15, "ml"), ing("olive-oil", 15, "ml"), ing("salt", 3),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 12, activeTime: 12, cookTime: 0,
      steps: [
        step("Настържи зелето и моркова на тънки ивици."),
        step("Разбъркай със зехтин, лимонов сок и сол, омекотявай леко с ръка 1 мин."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: true, omadCompatible: false,
    tags: ["salad", "cabbage", "bulgarian", "quick"], image: "cabbage-carrot-slaw",
  }),
];
