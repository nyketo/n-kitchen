// N Kitchen — Българска национална кухня, партида 2: супи, яхнии, печено, скара и салати.
// Продължение на bulgarian.ts — десерти, торти и баници с брашно умишлено не са включени.
import { ing, step, recipe } from "../builder";
import type { Recipe } from "@/lib/types";

export const bulgarian2Recipes: Recipe[] = [
  // ---------------- СУПИ ----------------
  recipe({
    id: "bg-meatball-egg-lemon-soup",
    title: "Супа топчета с яйце-лимон",
    description: "Домашна супа с малки кюфтенца, класически овкусена с яйце и лимон — без ориз.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("mixed-minced", 250), ing("onion", 40), ing("egg", 2, "pcs"), ing("lemon", 20, "ml"),
      ing("black-pepper", 1), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 15, activeTime: 15, cookTime: 20,
      steps: [
        step("Замеси каймата с настъргания лук, сол и пипер, оформи малки топчета."),
        step("Свари топчетата в 600 ml вода 12 мин.", { appliance: "stovetop", minutes: 12 }),
        step("Разбий едно яйце с лимоновия сок, разреди с малко от бульона и вкарай в тенджерата, като бъркаш."),
        step("Загрей внимателно без да завира 2 мин и сервирай веднага.", { appliance: "stovetop", minutes: 2 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "all", dairyFree: true, omadCompatible: false,
    tags: ["soup", "beef", "pork", "bulgarian"], image: "meatball-egg-lemon-soup",
  }),
  recipe({
    id: "bg-fish-soup",
    title: "Рибена чорба",
    description: "Наситена чорба от бяла риба с моркови, целина и лют пипер.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("whitefish", 350), ing("carrot", 50), ing("celery", 50), ing("onion", 40),
      ing("tomato-fresh", 50), ing("hot-pepper-fresh", 1, "pcs", "по желание", true), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 15, activeTime: 10, cookTime: 25,
      steps: [
        step("Задушавай ситно нарязаните зеленчуци в 500 ml вода 10 мин.", { appliance: "stovetop", minutes: 10 }),
        step("Добави рибата на парчета и доматите, вари 12-15 мин на слаб огън.", { appliance: "stovetop", minutes: 13 }),
        step("Подправи със сол и лют пипер на вкус."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "all", dairyFree: true, omadCompatible: false,
    tags: ["soup", "fish", "bulgarian"], image: "fish-soup",
  }),
  recipe({
    id: "bg-spinach-egg-soup",
    title: "Супа от спанак с яйце",
    description: "Лека супа от спанак, забулена с разбито яйце в края.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("spinach", 250), ing("onion", 30), ing("egg", 2, "pcs"), ing("butter", 15),
      ing("salt", 4), ing("black-pepper", 1),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 10, activeTime: 10, cookTime: 15,
      steps: [
        step("Задушавай лука в маслото 3 мин.", { appliance: "stovetop", minutes: 3 }),
        step("Добави спанака и 500 ml вода, вари 10 мин.", { appliance: "stovetop", minutes: 10 }),
        step("Разбий яйцата и ги вкарай тънка струя, като бъркаш непрекъснато 1 мин."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["soup", "vegetarian", "bulgarian", "quick"], image: "spinach-egg-soup",
  }),
  recipe({
    id: "bg-leek-cream-soup",
    title: "Крем супа от праз",
    description: "Кадифена крем супа от праз лук с масло и сметана.",
    category: "bulgarian", cuisine: "bg", dietType: ["low-carb"],
    ingredients: [
      ing("leek", 300), ing("butter", 20), ing("schlagsahne", 60, "ml"), ing("salt", 4), ing("black-pepper", 1),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 10, activeTime: 10, cookTime: 20,
      steps: [
        step("Задушавай праза, нарязан на колелца, в маслото 5 мин.", { appliance: "stovetop", minutes: 5 }),
        step("Добави 400 ml вода, вари 15 мин до омекване.", { appliance: "stovetop", minutes: 15 }),
        step("Пасирай, добави сметаната и разбъркай."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "winter", dairyFree: false, omadCompatible: false,
    tags: ["soup", "dairy", "bulgarian", "vegetarian"], image: "leek-cream-soup",
  }),
  recipe({
    id: "bg-green-bean-soup",
    title: "Супа от зелен фасул с чубрица",
    description: "Лятна супа от зелен боб с домати и чубрица.",
    category: "bulgarian", cuisine: "bg", dietType: ["low-carb"],
    ingredients: [
      ing("green-beans", 300), ing("tomato-fresh", 80), ing("onion", 40), ing("savory", 1),
      ing("olive-oil", 15, "ml"), ing("salt", 4),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 10, activeTime: 10, cookTime: 25,
      steps: [
        step("Задушавай лука в олиото 3 мин.", { appliance: "stovetop", minutes: 3 }),
        step("Добави фасула, доматите и 500 ml вода, вари 20 мин.", { appliance: "stovetop", minutes: 20 }),
        step("Подправи с чубрица и сол в края."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "summer", dairyFree: true, omadCompatible: false,
    tags: ["soup", "vegetarian", "bulgarian"], image: "green-bean-soup",
  }),

  // ---------------- ЯХНИИ ----------------
  recipe({
    id: "bg-pork-leek-yahniya",
    title: "Яхния от свинско с праз",
    description: "Зимна яхния със свинско рамо и много праз лук.",
    category: "bulgarian", cuisine: "bg", dietType: ["low-carb"],
    ingredients: [
      ing("pork-shoulder", 350), ing("leek", 200), ing("paprika", 2), ing("ghee", 15), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 15, activeTime: 10, cookTime: 45,
      hobSettings: { power: "средно-силен, после слаб огън" },
      steps: [
        step("Запечи месото на кубчета в гхи 7 мин.", { appliance: "stovetop", minutes: 7 }),
        step("Добави праза на колелца, задушавай 5 мин."),
        step("Добави паприка и 150 ml вода, покрий и задушавай 35 мин.", { appliance: "stovetop", minutes: 35 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "winter", dairyFree: true, omadCompatible: false,
    tags: ["stew", "pork", "bulgarian"], image: "pork-leek-yahniya",
  }),
  recipe({
    id: "bg-chicken-paprikash",
    title: "Пилешки паприкаш",
    description: "Крехко пилешко в сос от чушки, домати и сметана.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("chicken-thigh", 350), ing("pepper", 100), ing("tomato-fresh", 60), ing("onion", 50),
      ing("paprika", 2), ing("schlagsahne", 50, "ml"), ing("olive-oil", 10, "ml"), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 15, activeTime: 10, cookTime: 30,
      steps: [
        step("Запечи пилешкото в олиото 5 мин.", { appliance: "stovetop", minutes: 5 }),
        step("Добави лука и чушките, задушавай 5 мин."),
        step("Добави доматите и паприката, задушавай 15 мин.", { appliance: "stovetop", minutes: 15 }),
        step("Разбъркай със сметаната в края, без да завира."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["stew", "chicken", "bulgarian"], image: "chicken-paprikash",
  }),
  recipe({
    id: "bg-veal-shank-stew",
    title: "Задушен телешки джолан с моркови",
    description: "Бавно задушен телешки джолан с моркови и дафинов лист.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("beef-shin", 400), ing("carrot", 80), ing("onion", 60), ing("bay-leaf", 2, "pcs"),
      ing("black-pepper", 1), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "cook4me", isBestResult: true, prepTime: 15, activeTime: 6, cookTime: 45,
      steps: [
        step("Добави джолана и зеленчуците в купата с 500 ml вода.", { appliance: "cook4me" }),
        step("Затвори капака, избери Pressure Cooking.", { appliance: "cook4me" }),
        step("Задай 40 мин при високо налягане.", { appliance: "cook4me", minutes: 40 }),
        step("Остави естествено освобождаване на парата 10 мин."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "winter", dairyFree: true, omadCompatible: false,
    tags: ["stew", "beef", "bulgarian", "cook4me"], image: "veal-shank-stew",
  }),
  recipe({
    id: "bg-beef-green-bean-stew",
    title: "Яхния от телешко със зелен фасул",
    description: "Гъста яхния с телешко месо и зелен боб в доматен сос.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("beef-chuck", 300), ing("green-beans", 200), ing("tomato-fresh", 80), ing("onion", 50),
      ing("savory", 1), ing("ghee", 15), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 15, activeTime: 10, cookTime: 55,
      hobSettings: { power: "средно-силен, после слаб огън" },
      steps: [
        step("Запечи месото на кубчета в гхи 8 мин.", { appliance: "stovetop", minutes: 8 }),
        step("Добави лука, задушавай 4 мин."),
        step("Добави фасула, доматите, чубрица и 150 ml вода, покрий и задушавай 45 мин.", { appliance: "stovetop", minutes: 45 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "summer", dairyFree: true, omadCompatible: false,
    tags: ["stew", "beef", "bulgarian"], image: "beef-green-bean-stew",
  }),
  recipe({
    id: "bg-pork-cabbage-stew",
    title: "Задушено свинско със зеле",
    description: "Домашно задушено свинско с прясно зеле и паприка.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("pork-shoulder", 300), ing("cabbage", 250), ing("onion", 50), ing("paprika", 2),
      ing("ghee", 15), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "oven", prepTime: 15, activeTime: 10, cookTime: 50,
      ovenSettings: { tempC: 180, fan: false, covered: true, preheat: true },
      steps: [
        step("Запечи месото на кубчета в гхи 6 мин."),
        step("Смеси със зелето и лука в гювече, подправи с паприка и сол."),
        step("Покрий и печи на 180°C 45 мин.", { appliance: "oven", minutes: 45, tempC: 180 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "winter", dairyFree: true, omadCompatible: false,
    tags: ["stew", "pork", "cabbage", "bulgarian", "oven"], image: "pork-cabbage-stew",
  }),
  recipe({
    id: "bg-chicken-liver-onion-stew",
    title: "Яхния от пилешки дробчета с лук",
    description: "По-сочна яхнийна версия на дробчетата, задушени в доматен сос.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("chicken-liver", 300), ing("onion", 80), ing("tomato-fresh", 60), ing("paprika", 1),
      ing("olive-oil", 10, "ml"), ing("salt", 4),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 10, activeTime: 12, cookTime: 15,
      steps: [
        step("Задушавай лука в олиото 5 мин.", { appliance: "stovetop", minutes: 5 }),
        step("Добави дробчетата, запечи 5 мин."),
        step("Добави доматите и паприката, задушавай 8 мин на слаб огън.", { appliance: "stovetop", minutes: 8 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: true, omadCompatible: true,
    tags: ["stew", "chicken", "bulgarian", "quick"], image: "chicken-liver-onion-stew",
  }),

  // ---------------- ПЕЧЕНО / ВАРЕНО ----------------
  recipe({
    id: "bg-sirene-po-shopski",
    title: "Сирене по шопски",
    description: "Гювече с яйца, сирене, чушка и домат — класическа сутрешна или вечерна класика.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("egg", 2, "pcs"), ing("white-cheese", 60), ing("tomato-fresh", 60), ing("pepper", 50),
      ing("butter", 10), ing("black-pepper", 1),
    ],
    servingsBase: 1,
    methods: [{
      method: "oven", prepTime: 10, activeTime: 5, cookTime: 15,
      ovenSettings: { tempC: 200, fan: false, preheat: true },
      steps: [
        step("Разпредели нарязаните домат и чушка в гювече с маслото."),
        step("Натрроши сиренето отгоре, пече 8 мин на 200°C.", { appliance: "oven", minutes: 8, tempC: 200 }),
        step("Извади, разбий яйцата отгоре и допечи още 6-7 мин до сварени яйца.", { appliance: "oven", minutes: 7, tempC: 200 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: false, omadCompatible: true,
    tags: ["vegetarian", "bulgarian", "oven", "quick"], image: "sirene-po-shopski",
  }),
  recipe({
    id: "bg-stuffed-peppers-meat",
    title: "Пълнени чушки с кайма",
    description: "Класически пълнени чушки, но с плънка само от кайма и домат — без ориз.",
    category: "bulgarian", cuisine: "bg", dietType: ["low-carb"],
    ingredients: [
      ing("pepper", 300, "g", "4 средни чушки"), ing("mixed-minced", 300), ing("onion", 60),
      ing("tomato-fresh", 80), ing("paprika", 2), ing("olive-oil", 15, "ml"), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "oven", prepTime: 20, activeTime: 12, cookTime: 40,
      ovenSettings: { tempC: 190, fan: false, covered: true, preheat: true },
      steps: [
        step("Задушавай лука в олиото 3 мин, добави каймата и запечи 6 мин."),
        step("Разбъркай с половината домати и паприка, подправи."),
        step("Напълни изчистените чушки и подреди изправени в гювече."),
        step("Залей с останалите домати, покрий и печи на 190°C 35 мин.", { appliance: "oven", minutes: 35, tempC: 190 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "summer", dairyFree: true, omadCompatible: false,
    tags: ["pork", "beef", "bulgarian", "oven"], image: "stuffed-peppers-meat",
  }),
  recipe({
    id: "bg-stuffed-zucchini-meat",
    title: "Пълнени тиквички с кайма",
    description: "Изчистени тиквички, пълнени с кайма и залети с кисело мляко.",
    category: "bulgarian", cuisine: "bg", dietType: ["low-carb"],
    ingredients: [
      ing("zucchini", 350, "g", "2 средни"), ing("mixed-minced", 250), ing("onion", 50),
      ing("yogurt", 80), ing("egg", 1, "pcs"), ing("salt", 5), ing("black-pepper", 1),
    ],
    servingsBase: 1,
    methods: [{
      method: "oven", prepTime: 20, activeTime: 12, cookTime: 35,
      ovenSettings: { tempC: 190, fan: false, preheat: true },
      steps: [
        step("Издълбай тиквичките на лодички, задръж месото за плънката."),
        step("Задушавай лука, добави каймата и издълбаното месо от тиквичките, запечи 6 мин."),
        step("Напълни лодичките и подреди в тава."),
        step("Разбий яйцето с киселото мляко, залей отгоре."),
        step("Печи на 190°C 30 мин до златисто.", { appliance: "oven", minutes: 30, tempC: 190 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "summer", dairyFree: false, omadCompatible: false,
    tags: ["pork", "beef", "bulgarian", "oven"], image: "stuffed-zucchini-meat",
  }),
  recipe({
    id: "bg-cabbage-rolls-meat",
    title: "Зелеви сарми с кайма",
    description: "Домашни сарми от зелеви листа, пълнени само с кайма — без ориз.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("sauerkraut", 300, "g", "листа за увиване"), ing("mixed-minced", 300), ing("onion", 60),
      ing("paprika", 2), ing("olive-oil", 15, "ml"), ing("salt", 4),
    ],
    servingsBase: 1,
    methods: [{
      method: "oven", prepTime: 25, activeTime: 15, cookTime: 50,
      ovenSettings: { tempC: 180, fan: false, covered: true, preheat: true },
      steps: [
        step("Задушавай лука в олиото 3 мин, смеси със суровата кайма и паприка."),
        step("Разгъни листата кисело зеле, увий по малко плънка във всяко."),
        step("Подреди сармите плътно в гювече, залей с 200 ml вода."),
        step("Покрий и печи на 180°C 45 мин.", { appliance: "oven", minutes: 45, tempC: 180 }),
      ],
    }],
    difficulty: "advanced", cleanupLevel: "normal", season: "winter", dairyFree: true, omadCompatible: false,
    tags: ["pork", "beef", "cabbage", "bulgarian", "oven"], image: "cabbage-rolls-meat",
  }),
  recipe({
    id: "bg-pork-ribs-oven-garlic",
    title: "Свински ребра на фурна с чесън",
    description: "Крехки ребра, бавно печени с чесън и чубрица.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("pork-ribs", 400), ing("garlic", 12), ing("savory", 1), ing("olive-oil", 10, "ml"), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "oven", prepTime: 10, activeTime: 5, cookTime: 65,
      ovenSettings: { tempC: 170, fan: false, covered: true, preheat: true },
      steps: [
        step("Натрий ребрата с олио, счукан чесън, чубрица и сол."),
        step("Постави в тава, покрий с фолио."),
        step("Печи на 170°C 55 мин покрито, после 10 мин без фолио за хрупкавост.", { appliance: "oven", minutes: 65, tempC: 170 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "winter", dairyFree: true, omadCompatible: true,
    tags: ["pork", "bulgarian", "oven"], image: "pork-ribs-oven-garlic",
  }),

  // ---------------- СКАРА ----------------
  recipe({
    id: "bg-kyufte-grill",
    title: "Кюфтета на скара",
    description: "Класически български кюфтета с кимион, изпечени на скара.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("mixed-minced", 350), ing("onion", 50), ing("cumin", 2), ing("black-pepper", 1),
      ing("olive-oil", 10, "ml"), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "grill", prepTime: 15, activeTime: 12, cookTime: 12,
      grillSettings: { heat: "среден", minutesPerSide: 5, thicknessNote: "плоски кюфтета ~2 см" },
      steps: [
        step("Замеси каймата с настъргания лук, кимион, пипер и сол."),
        step("Оформи плоски кюфтета, намажи с олио."),
        step("Изпечи на скара по 5-6 мин от всяка страна.", { appliance: "grill", minutes: 5 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "summer", dairyFree: true, omadCompatible: true,
    tags: ["pork", "beef", "grill", "bulgarian"], image: "kyufte-grill",
  }),
  recipe({
    id: "bg-kebapche-grill",
    title: "Кебапчета на скара",
    description: "Удължени кебапчета от смляно месо с чубрица и кимион.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("mixed-minced", 350), ing("garlic", 8), ing("cumin", 2), ing("savory", 1),
      ing("olive-oil", 10, "ml"), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "grill", prepTime: 15, activeTime: 12, cookTime: 12,
      grillSettings: { heat: "среден", minutesPerSide: 5, thicknessNote: "удължени ~10 см" },
      steps: [
        step("Замеси каймата с чесъна, кимион, чубрица и сол."),
        step("Оформи удължени кебапчета с мокри ръце."),
        step("Изпечи на скара по 5-6 мин от всяка страна.", { appliance: "grill", minutes: 5 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "summer", dairyFree: true, omadCompatible: true,
    tags: ["pork", "beef", "grill", "bulgarian"], image: "kebapche-grill",
  }),
  recipe({
    id: "bg-mackerel-grill",
    title: "Скумрия на скара",
    description: "Цяла скумрия, изпечена на скара с лимон и джоджен.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("mackerel-whole", 400), ing("lemon", 15, "ml"), ing("olive-oil", 10, "ml"),
      ing("spearmint", 1), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "grill", prepTime: 10, activeTime: 10, cookTime: 12,
      grillSettings: { heat: "среден", minutesPerSide: 6, thicknessNote: "цяла риба" },
      steps: [
        step("Натрий рибата отвън и отвътре с олио, сол и джоджен."),
        step("Изпечи на скара по 5-6 мин от всяка страна.", { appliance: "grill", minutes: 6 }),
        step("Полей с лимонов сок преди сервиране."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "summer", dairyFree: true, omadCompatible: true,
    tags: ["fish", "grill", "bulgarian", "quick"], image: "mackerel-grill",
  }),
  recipe({
    id: "bg-trout-grill-dill",
    title: "Пъстърва на скара с копър",
    description: "Прясна пъстърва, изпечена цяла на скара с копър и лимон.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("trout", 400), ing("dill", 8), ing("lemon", 15, "ml"), ing("olive-oil", 10, "ml"), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "grill", prepTime: 10, activeTime: 10, cookTime: 12,
      grillSettings: { heat: "среден", minutesPerSide: 6, thicknessNote: "цяла риба" },
      steps: [
        step("Напълни рибата с копър и резени лимон, намажи с олио и сол."),
        step("Изпечи на скара по 5-6 мин от всяка страна.", { appliance: "grill", minutes: 6 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "summer", dairyFree: true, omadCompatible: true,
    tags: ["fish", "grill", "bulgarian", "quick"], image: "trout-grill-dill",
  }),

  // ---------------- САЛАТИ ----------------
  recipe({
    id: "bg-shopska-salad",
    title: "Шопска салата",
    description: "Най-известната българска салата — домати, краставици, чушки и сирене.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("tomato-fresh", 150), ing("cucumber", 100), ing("pepper", 60), ing("onion", 20),
      ing("white-cheese", 60), ing("olive-oil", 15, "ml"), ing("salt", 3),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 12, activeTime: 12, cookTime: 0,
      steps: [
        step("Нарежи доматите, краставицата, чушката и лука на кубчета."),
        step("Разбъркай със зехтина и солта в купа."),
        step("Настържи сиренето отгоре."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "summer", dairyFree: false, omadCompatible: false,
    tags: ["salad", "vegetarian", "bulgarian", "quick"], image: "shopska-salad",
  }),
  recipe({
    id: "bg-shepherd-salad",
    title: "Овчарска салата",
    description: "Богата салата с шунка, яйце, сирене и кашкавал върху пресни зеленчуци.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("tomato-fresh", 100), ing("cucumber", 80), ing("pepper", 50), ing("ham", 60),
      ing("egg", 1, "pcs"), ing("white-cheese", 40), ing("yellow-cheese", 30),
      ing("olive-oil", 10, "ml"), ing("salt", 3),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 15, activeTime: 15, cookTime: 8,
      steps: [
        step("Свари яйцето 8 мин, охлади и обели.", { appliance: "stovetop", minutes: 8 }),
        step("Нарежи зеленчуците, шунката и яйцето на кубчета, смеси в купа."),
        step("Полей със зехтин и сол, поръси с настъргани сирене и кашкавал."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["salad", "bulgarian", "quick"], image: "shepherd-salad",
  }),
  recipe({
    id: "bg-snow-white-salad",
    title: "Снежанка салата",
    description: "Освежаваща салата от кисело мляко, краставица, чесън и орехи.",
    category: "bulgarian", cuisine: "bg", dietType: ["low-carb"],
    ingredients: [
      ing("yogurt", 200), ing("cucumber", 200), ing("walnuts", 20, "g", "надробени"),
      ing("garlic", 6), ing("dill", 4), ing("olive-oil", 8, "ml"), ing("salt", 3),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 12, activeTime: 12, cookTime: 0,
      steps: [
        step("Настържи или нарежи на ситно краставицата, отцеди леко."),
        step("Смеси с киселото мляко, счукания чесън и копъра."),
        step("Полей със зехтин и поръси с надробени орехи."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "summer", dairyFree: false, omadCompatible: false,
    tags: ["salad", "dairy", "bulgarian", "quick"], image: "snow-white-salad",
  }),
  recipe({
    id: "bg-cucumber-radish-salad",
    title: "Салата от краставици и репички с копър",
    description: "Хрупкава и лека салата, готова за минути.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("cucumber", 200), ing("radish", 100), ing("dill", 5), ing("olive-oil", 12, "ml"),
      ing("apple-cider-vinegar", 8, "ml"), ing("salt", 3),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 8, activeTime: 8, cookTime: 0,
      steps: [
        step("Нарежи краставиците и репичките на тънки резени."),
        step("Разбъркай със зехтин, оцет, копър и сол."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "summer", dairyFree: true, omadCompatible: false,
    tags: ["salad", "vegetarian", "bulgarian", "quick"], image: "cucumber-radish-salad",
  }),
];
