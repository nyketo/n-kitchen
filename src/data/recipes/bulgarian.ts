// N Kitchen — Българска национална кухня: супи, яхнии, печено/варено месо и скара.
// Класически рецепти, съобразени с кето/лоу-карб — без картофи, ориз, брашно или боб.
// Десерти, торти и баници с брашно умишлено не са включени тук, защото не могат да се
// адаптират честно към кето без да загубят характера си.
import { ing, step, recipe } from "../builder";
import type { Recipe } from "@/lib/types";

export const bulgarianRecipes: Recipe[] = [
  // ---------------- СУПИ ----------------
  recipe({
    id: "bg-shkembe-chorba",
    title: "Шкембе чорба",
    description: "Класическа люта чорба с чесън и оцет — без брашнена запръжка.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("beef-tripe", 400), ing("garlic", 12), ing("apple-cider-vinegar", 15, "ml"),
      ing("paprika", 2), ing("butter", 15), ing("hot-pepper-fresh", 1, "pcs", "по желание", true),
      ing("salt", 5), ing("black-pepper", 1),
    ],
    servingsBase: 1,
    methods: [{
      method: "cook4me", isBestResult: true, prepTime: 10, activeTime: 8, cookTime: 50,
      steps: [
        step("Добави шкембетата, нарязани на ивици, в купата с 600 ml вода.", { appliance: "cook4me" }),
        step("Затвори капака, избери Pressure Cooking.", { appliance: "cook4me" }),
        step("Задай 45 мин при високо налягане.", { appliance: "cook4me", minutes: 45 }),
        step("Остави естествено освобождаване на парата 10 мин."),
        step("Разтопи маслото в тиган, добави счукания чесън и паприка за 30 сек, залей чорбата."),
        step("Подправи с оцет, сол, черен пипер и люта чушка на вкус."),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "winter", dairyFree: false, omadCompatible: false,
    tags: ["soup", "beef", "bulgarian"], image: "shkembe-chorba",
  }),
  recipe({
    id: "bg-tarator",
    title: "Таратор",
    description: "Студена лятна супа от кисело мляко, краставица, орехи и копър.",
    category: "bulgarian", cuisine: "bg", dietType: ["low-carb"],
    ingredients: [
      ing("yogurt", 200), ing("cucumber", 200), ing("walnuts", 20, "g", "надробени"),
      ing("dill", 5), ing("garlic", 6), ing("olive-oil", 10, "ml"), ing("salt", 3),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 10, activeTime: 5, cookTime: 0,
      steps: [
        step("Настържи краставицата и разбий с киселото мляко и 100 ml студена вода."),
        step("Добави счукания чесън, ситно нарязания копър и зехтина."),
        step("Поръси с надробени орехи и охлади в хладилник поне 30 мин преди сервиране."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "summer", dairyFree: false, omadCompatible: false,
    tags: ["soup", "dairy", "bulgarian", "quick"], image: "tarator",
  }),
  recipe({
    id: "bg-cauliflower-cream-soup",
    title: "Крем супа от карфиол със сирене",
    description: "Кадифена крем супа от карфиол, с масло и бяло саламурено сирене.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("cauliflower", 300), ing("butter", 20), ing("onion", 30), ing("garlic", 6),
      ing("white-cheese", 40), ing("salt", 4), ing("black-pepper", 1),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 10, activeTime: 10, cookTime: 20,
      steps: [
        step("Задушавай лука и чесъна в маслото 3 мин.", { appliance: "stovetop", minutes: 3 }),
        step("Добави карфиола на розички и 400 ml вода, вари до омекване 18 мин.", { appliance: "stovetop", minutes: 18 }),
        step("Пасирай до гладка кремообразна консистенция."),
        step("Поръси с натрошено сирене преди сервиране."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "winter", dairyFree: false, omadCompatible: false,
    tags: ["soup", "dairy", "bulgarian"], image: "cauliflower-cream-soup",
  }),
  recipe({
    id: "bg-broccoli-cream-soup-cheese",
    title: "Крем супа от броколи с кашкавал",
    description: "Гъста крем супа от броколи, обогатена с топен кашкавал.",
    category: "bulgarian", cuisine: "bg", dietType: ["low-carb"],
    ingredients: [
      ing("broccoli", 300), ing("butter", 20), ing("onion", 30), ing("garlic", 6),
      ing("yellow-cheese", 40), ing("salt", 4),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 10, activeTime: 10, cookTime: 20,
      steps: [
        step("Задушавай лука и чесъна в маслото 3 мин.", { appliance: "stovetop", minutes: 3 }),
        step("Добави броколите и 400 ml вода, вари 18 мин до омекване.", { appliance: "stovetop", minutes: 18 }),
        step("Пасирай, добави настъргания кашкавал и разбъркай до разтопяване."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "winter", dairyFree: false, omadCompatible: false,
    tags: ["soup", "dairy", "bulgarian"], image: "broccoli-cream-soup",
  }),
  recipe({
    id: "bg-chicken-celery-soup",
    title: "Пилешка супа с целина и моркови",
    description: "Лека бистра супа с пилешко бонфиле, целина и моркови.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("chicken-thigh", 300), ing("celery", 60), ing("carrot", 50), ing("onion", 40),
      ing("bay-leaf", 1, "pcs"), ing("salt", 5), ing("black-pepper", 1),
    ],
    servingsBase: 1,
    methods: [{
      method: "cook4me", isBestResult: true, prepTime: 10, activeTime: 5, cookTime: 25,
      steps: [
        step("Добави пилешкото и нарязаните зеленчуци в купата с 600 ml вода.", { appliance: "cook4me" }),
        step("Затвори капака, избери Pressure Cooking.", { appliance: "cook4me" }),
        step("Задай 20 мин при високо налягане.", { appliance: "cook4me", minutes: 20 }),
        step("Остави естествено освобождаване на парата 5 мин, подправи на вкус."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: true, omadCompatible: false,
    tags: ["soup", "chicken", "bulgarian"], image: "chicken-celery-soup",
  }),
  recipe({
    id: "bg-zucchini-garlic-soup",
    title: "Крем супа от тиквички с чесън",
    description: "Освежаваща крем супа от тиквички с чесън и крема сирене.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("zucchini", 350), ing("butter", 20), ing("onion", 30), ing("garlic", 8),
      ing("cream-cheese", 30), ing("salt", 4),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 10, activeTime: 10, cookTime: 18,
      steps: [
        step("Задушавай лука и чесъна в маслото 3 мин.", { appliance: "stovetop", minutes: 3 }),
        step("Добави тиквичките на резени и 350 ml вода, вари 15 мин.", { appliance: "stovetop", minutes: 15 }),
        step("Пасирай със крема сиренето до гладкост."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "summer", dairyFree: false, omadCompatible: false,
    tags: ["soup", "dairy", "bulgarian"], image: "zucchini-garlic-soup",
  }),

  // ---------------- ЯХНИИ ----------------
  recipe({
    id: "bg-kavarma-pork",
    title: "Каварма от свинско",
    description: "Традиционна каварма в гювече — свинско с лук, чушки и чубрица.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("pork-shoulder", 350), ing("onion", 80), ing("pepper", 100), ing("paprika", 2),
      ing("savory", 1), ing("ghee", 15), ing("salt", 5), ing("black-pepper", 1),
    ],
    servingsBase: 1,
    methods: [{
      method: "oven", prepTime: 15, activeTime: 10, cookTime: 50,
      ovenSettings: { tempC: 190, fan: false, covered: true, preheat: true },
      steps: [
        step("Запечи месото на кубчета в гхи 6 мин.", { appliance: "stovetop", minutes: 6 }),
        step("Добави лука и чушките, задушавай 5 мин."),
        step("Прехвърли в гювече, подправи с паприка, чубрица, сол и пипер."),
        step("Покрий и печи на 190°C 45 мин.", { appliance: "oven", minutes: 45, tempC: 190 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "winter", dairyFree: true, omadCompatible: false,
    tags: ["stew", "pork", "bulgarian", "oven"], image: "kavarma-pork",
  }),
  recipe({
    id: "bg-kavarma-chicken",
    title: "Каварма от пилешко",
    description: "По-лека версия на кавармата с пилешко бонфиле и домати.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("chicken-thigh", 350), ing("onion", 80), ing("pepper", 100), ing("tomato-fresh", 60),
      ing("paprika", 2), ing("olive-oil", 10, "ml"), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 15, activeTime: 10, cookTime: 30,
      hobSettings: { power: "средно-силен, после слаб" },
      steps: [
        step("Запечи пилешкото в олиото 5 мин.", { appliance: "stovetop", minutes: 5 }),
        step("Добави лука и чушките, задушавай 5 мин."),
        step("Добави доматите и паприката, задушавай на слаб огън 20 мин.", { appliance: "stovetop", minutes: 20 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "all", dairyFree: true, omadCompatible: false,
    tags: ["stew", "chicken", "bulgarian"], image: "kavarma-chicken",
  }),
  recipe({
    id: "bg-gyuvech-no-potato",
    title: "Гювеч по селски без картофи",
    description: "Летен гювеч със свинско, тиквички, чушки и домати — без картофи.",
    category: "bulgarian", cuisine: "bg", dietType: ["low-carb"],
    ingredients: [
      ing("pork-shoulder", 300), ing("zucchini", 150), ing("pepper", 100), ing("tomato-fresh", 100),
      ing("onion", 50), ing("garlic", 8), ing("olive-oil", 15, "ml"), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "oven", prepTime: 15, activeTime: 10, cookTime: 45,
      ovenSettings: { tempC: 200, fan: false, covered: true, preheat: true },
      steps: [
        step("Запечи месото на кубчета в олиото 5 мин."),
        step("Смеси със зеленчуците, нарязани на едро, в гювече."),
        step("Подправи със сол и чесън, покрий и печи на 200°C 40 мин.", { appliance: "oven", minutes: 40, tempC: 200 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "summer", dairyFree: true, omadCompatible: false,
    tags: ["stew", "pork", "bulgarian", "oven", "one-pot"], image: "gyuvech-no-potato",
  }),
  recipe({
    id: "bg-beef-celery-yahniya",
    title: "Яхния от телешко с целина",
    description: "Бавно задушено телешко с целина, моркови и домати.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("beef-chuck", 350), ing("celery", 150), ing("onion", 60), ing("carrot", 50),
      ing("tomato-fresh", 60), ing("paprika", 2), ing("ghee", 15), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "cook4me", isBestResult: true, prepTime: 15, activeTime: 8, cookTime: 40,
      steps: [
        step("Добави месото на кубчета и гхи в купата, избери Browning.", { appliance: "cook4me" }),
        step("Запечи 6 мин, добави зеленчуците и паприката."),
        step("Затвори капака, избери Pressure Cooking.", { appliance: "cook4me" }),
        step("Задай 30 мин при високо налягане.", { appliance: "cook4me", minutes: 30 }),
        step("Остави естествено освобождаване на парата 10 мин."),
      ],
    }],
    difficulty: "medium", cleanupLevel: "minimal", season: "winter", dairyFree: true, omadCompatible: false,
    tags: ["stew", "beef", "bulgarian", "cook4me"], image: "beef-celery-yahniya",
  }),
  recipe({
    id: "bg-lamb-onion-stew",
    title: "Задушено агнешко с лук",
    description: "Пролетно ястие с крехко агнешко и много лук.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("lamb-shoulder", 350), ing("onion", 100), ing("garlic", 10), ing("bay-leaf", 2, "pcs"),
      ing("savory", 1), ing("ghee", 15), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 15, activeTime: 10, cookTime: 60,
      hobSettings: { power: "средно-силен, после слаб огън" },
      steps: [
        step("Запечи месото на кубчета в гхи 8 мин.", { appliance: "stovetop", minutes: 8 }),
        step("Добави лука на полумесеци, задушавай 5 мин."),
        step("Добави чесъна, дафинов лист, чубрица и 150 ml вода."),
        step("Покрий и задушавай на слаб огън 45 мин до крехкост.", { appliance: "stovetop", minutes: 45 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "all", dairyFree: true, omadCompatible: false,
    tags: ["stew", "lamb", "bulgarian"], image: "lamb-onion-stew",
  }),
  recipe({
    id: "bg-pork-knuckle-garlic-yahniya",
    title: "Яхния от свински джолан с чесън",
    description: "Наситена яхния с много чесън и дафинов лист.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("pork-shoulder", 400, "g", "джолан"), ing("garlic", 15), ing("onion", 60),
      ing("bay-leaf", 2, "pcs"), ing("black-pepper", 1), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "cook4me", isBestResult: true, prepTime: 10, activeTime: 6, cookTime: 45,
      steps: [
        step("Добави месото, чесъна, лука и подправките в купата с 400 ml вода.", { appliance: "cook4me" }),
        step("Затвори капака, избери Pressure Cooking.", { appliance: "cook4me" }),
        step("Задай 40 мин при високо налягане.", { appliance: "cook4me", minutes: 40 }),
        step("Остави естествено освобождаване на парата 10 мин."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "winter", dairyFree: true, omadCompatible: false,
    tags: ["stew", "pork", "bulgarian", "cook4me"], image: "pork-knuckle-garlic-yahniya",
  }),

  // ---------------- ПЕЧЕНО / ВАРЕНО ----------------
  recipe({
    id: "bg-pork-loin-village-tray",
    title: "Печено свинско филе по селски",
    description: "Свинско филе на тава с чушки, лук и чесън.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("pork-loin", 300), ing("pepper", 100), ing("onion", 60), ing("garlic", 8),
      ing("olive-oil", 15, "ml"), ing("salt", 5), ing("black-pepper", 1),
    ],
    servingsBase: 1,
    methods: [{
      method: "oven", prepTime: 10, activeTime: 5, cookTime: 35,
      ovenSettings: { tempC: 200, fan: true, preheat: true },
      steps: [
        step("Подреди месото и зеленчуците на тава, залей с олиото."),
        step("Подправи със сол, чесън и черен пипер."),
        step("Печи на 200°C 30-35 мин.", { appliance: "oven", minutes: 32, tempC: 200 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "all", dairyFree: true, omadCompatible: true,
    tags: ["pork", "bulgarian", "oven"], image: "pork-loin-village-tray",
  }),
  recipe({
    id: "bg-kapama-no-rice",
    title: "Капама по бански без ориз",
    description: "Слоеста капама със свинско, луканка и зеле — без ориз.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("pork-shoulder", 250), ing("sausage-lukanka", 50), ing("cabbage", 200),
      ing("sauerkraut", 100), ing("onion", 40), ing("bay-leaf", 2, "pcs"), ing("black-pepper", 1),
    ],
    servingsBase: 1,
    methods: [{
      method: "oven", prepTime: 15, activeTime: 10, cookTime: 60,
      ovenSettings: { tempC: 180, fan: false, covered: true, preheat: true },
      steps: [
        step("Наслагвай на пластове в гювече: зеле, месо, луканка, лук, кисело зеле."),
        step("Подправи с дафинов лист и черен пипер между пластовете."),
        step("Покрий и печи на 180°C 55-60 мин.", { appliance: "oven", minutes: 58, tempC: 180 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "winter", dairyFree: true, omadCompatible: false,
    tags: ["pork", "cabbage", "bulgarian", "oven"], image: "kapama-no-rice",
  }),
  recipe({
    id: "bg-chicken-liver-village-cheese",
    title: "Дробчета по селски със сирене",
    description: "Пилешки дробчета с лук, паприка и натрошено сирене.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("chicken-liver", 300), ing("onion", 60), ing("white-cheese", 40), ing("paprika", 1),
      ing("olive-oil", 10, "ml"), ing("salt", 4),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 10, activeTime: 12, cookTime: 12,
      steps: [
        step("Задушавай лука в олиото 3 мин.", { appliance: "stovetop", minutes: 3 }),
        step("Добави дробчетата и паприката, запечи 8 мин на средно силен огън.", { appliance: "stovetop", minutes: 8 }),
        step("Поръси с натрошено сирене преди сервиране."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: false, omadCompatible: true,
    tags: ["chicken", "bulgarian", "quick"], image: "chicken-liver-village-cheese",
  }),
  recipe({
    id: "bg-whole-chicken-garlic-lemon",
    title: "Печено пиле цяло с чесън и лимон",
    description: "Цяло пиле на фурна с много чесън и лимон под кожата.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("chicken-whole", 400), ing("garlic", 15), ing("lemon", 15, "ml"),
      ing("olive-oil", 10, "ml"), ing("salt", 6), ing("black-pepper", 1),
    ],
    servingsBase: 1,
    methods: [{
      method: "oven", prepTime: 15, activeTime: 10, cookTime: 60,
      ovenSettings: { tempC: 190, fan: true, preheat: true },
      steps: [
        step("Разтрий пилето с олио, счукан чесън, лимонов сок, сол и пипер под кожата."),
        step("Постави в тава с гърдите нагоре."),
        step("Печи на 190°C 55-60 мин до златисто.", { appliance: "oven", minutes: 58, tempC: 190 }),
        step("Остави да почине 10 мин преди рязане."),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "all", dairyFree: true, omadCompatible: true,
    tags: ["chicken", "bulgarian", "oven"], image: "whole-chicken-garlic-lemon",
  }),
  recipe({
    id: "bg-pork-belly-sazdarma-style",
    title: "Свинско месо саздърма стил с чесън",
    description: "Крехко свинско коремче, бавно задушено с чесън и чубрица.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("pork-belly", 250), ing("garlic", 10), ing("savory", 1), ing("black-pepper", 1), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "oven", prepTime: 10, activeTime: 5, cookTime: 70,
      ovenSettings: { tempC: 160, fan: false, covered: true, preheat: true },
      steps: [
        step("Натрий месото със счукания чесън, чубрица, сол и пипер."),
        step("Постави в тава с капак или фолио."),
        step("Печи на 160°C 65-70 мин до крехкост.", { appliance: "oven", minutes: 68, tempC: 160 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "winter", dairyFree: true, omadCompatible: true,
    tags: ["pork", "bulgarian", "oven"], image: "pork-belly-sazdarma-style",
  }),
  recipe({
    id: "bg-beef-hunter-style-no-mushroom",
    title: "Телешко задушено по ловджийски",
    description: "Наситено телешко с моркови, чушки и домати — без гъби.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("beef-chuck", 350), ing("carrot", 60), ing("pepper", 80), ing("onion", 50),
      ing("tomato-fresh", 60), ing("paprika", 2), ing("ghee", 15), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "stovetop", prepTime: 15, activeTime: 10, cookTime: 55,
      hobSettings: { power: "средно-силен, после слаб огън" },
      steps: [
        step("Запечи месото на кубчета в гхи 8 мин.", { appliance: "stovetop", minutes: 8 }),
        step("Добави зеленчуците, задушавай 5 мин."),
        step("Добави паприка и 150 ml вода, покрий и задушавай на слаб огън 45 мин.", { appliance: "stovetop", minutes: 45 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "winter", dairyFree: true, omadCompatible: false,
    tags: ["stew", "beef", "bulgarian"], image: "beef-hunter-style-no-mushroom",
  }),

  // ---------------- СКАРА ----------------
  recipe({
    id: "bg-chicken-skewers-grill",
    title: "Пилешки шишчета на скара",
    description: "Мариновани шишчета от пилешко филе с чушки и лук.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("chicken-breast", 300), ing("pepper", 80), ing("onion", 40),
      ing("olive-oil", 10, "ml"), ing("paprika", 1), ing("salt", 4),
    ],
    servingsBase: 1,
    methods: [{
      method: "grill", prepTime: 15, activeTime: 12, cookTime: 12,
      grillSettings: { heat: "средно-силен", minutesPerSide: 6, thicknessNote: "нанизано на шишчета" },
      steps: [
        step("Нарежи пилешкото на кубчета, маринова с олио, паприка и сол 10 мин."),
        step("Нанижи на шишчета, редувайки с чушки и лук."),
        step("Изпечи на скара по 6 мин от всяка страна.", { appliance: "grill", minutes: 6 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "summer", dairyFree: true, omadCompatible: true,
    tags: ["chicken", "grill", "bulgarian"], image: "chicken-skewers-grill",
  }),
  recipe({
    id: "bg-lamb-chops-rosemary-grill",
    title: "Агнешки котлети на скара с розмарин",
    description: "Бързо изпечени агнешки котлети с чесън и розмарин.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("lamb-chop", 350), ing("olive-oil", 10, "ml"), ing("garlic", 8),
      ing("rosemary", 1), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "grill", prepTime: 10, activeTime: 8, cookTime: 8,
      grillSettings: { heat: "силен, директен", minutesPerSide: 3, thicknessNote: "~2 см котлети" },
      steps: [
        step("Натрий котлетите с олио, счукан чесън, розмарин и сол."),
        step("Изпечи на силен грил по 3-4 мин от всяка страна.", { appliance: "grill", minutes: 3 }),
        step("Остави да почине 3 мин преди сервиране."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "summer", dairyFree: true, omadCompatible: true,
    tags: ["lamb", "grill", "bulgarian"], image: "lamb-chops-rosemary-grill",
  }),
  recipe({
    id: "bg-pork-neck-savory-garlic-grill",
    title: "Свински врат с чубрица на скара",
    description: "Сочен врат, маринован с чесън и чубрица.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("pork-neck", 350), ing("garlic", 10), ing("savory", 2),
      ing("olive-oil", 10, "ml"), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "grill", prepTime: 15, activeTime: 10, cookTime: 10,
      grillSettings: { heat: "средно-силен", minutesPerSide: 5, thicknessNote: "~2 см резени" },
      steps: [
        step("Натрий месото с олио, счукан чесън, чубрица и сол, остави 15 мин."),
        step("Изпечи на скара по 5 мин от всяка страна.", { appliance: "grill", minutes: 5 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "summer", dairyFree: true, omadCompatible: true,
    tags: ["pork", "grill", "bulgarian"], image: "pork-neck-savory-garlic-grill",
  }),
  recipe({
    id: "bg-lukanka-sudzhuk-grill-mix",
    title: "Луканка и суджук на скара",
    description: "Бърза скара микс от традиционни български колбаси с чушки.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("sausage-lukanka", 150), ing("sausage-sudzhuk", 150), ing("pepper", 100),
    ],
    servingsBase: 1,
    methods: [{
      method: "grill", prepTime: 5, activeTime: 10, cookTime: 10,
      grillSettings: { heat: "среден", minutesPerSide: 4, thicknessNote: "цели колбаси" },
      steps: [
        step("Подреди луканката, суджука и чушките на скарата."),
        step("Печи по 4-5 мин от всяка страна до изпичане.", { appliance: "grill", minutes: 4 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "summer", dairyFree: true, omadCompatible: true,
    tags: ["pork", "grill", "bulgarian", "quick"], image: "lukanka-sudzhuk-grill-mix",
  }),
  recipe({
    id: "bg-chicken-wings-savory-grill",
    title: "Пилешки крилца на скара с чубрица",
    description: "Хрупкави крилца, подправени само с чубрица, олио и сол.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("chicken-wing", 400), ing("olive-oil", 10, "ml"), ing("savory", 2),
      ing("paprika", 1), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "grill", prepTime: 10, activeTime: 15, cookTime: 15,
      grillSettings: { heat: "среден", minutesPerSide: 7, thicknessNote: "цели крилца" },
      steps: [
        step("Разбъркай крилцата с олио, чубрица, паприка и сол."),
        step("Изпечи на скара по 7 мин от всяка страна до хрупкаво.", { appliance: "grill", minutes: 7 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "summer", dairyFree: true, omadCompatible: true,
    tags: ["chicken", "grill", "bulgarian"], image: "chicken-wings-savory-grill",
  }),
  recipe({
    id: "bg-beef-shin-slow-cooked",
    title: "Телешки джолан на бавен огън",
    description: "Дълго къкрящ телешки джолан с лук, чесън и дафинов лист.",
    category: "bulgarian", cuisine: "bg", dietType: ["keto", "low-carb"],
    ingredients: [
      ing("beef-shin", 400), ing("onion", 60), ing("garlic", 10),
      ing("bay-leaf", 2, "pcs"), ing("black-pepper", 1), ing("salt", 5),
    ],
    servingsBase: 1,
    methods: [{
      method: "cook4me", isBestResult: true, prepTime: 10, activeTime: 5, cookTime: 45,
      steps: [
        step("Добави месото, лука, чесъна и подправките в купата с 500 ml вода.", { appliance: "cook4me" }),
        step("Затвори капака, избери Pressure Cooking.", { appliance: "cook4me" }),
        step("Задай 40 мин при високо налягане.", { appliance: "cook4me", minutes: 40 }),
        step("Остави естествено освобождаване на парата 10 мин."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "winter", dairyFree: true, omadCompatible: false,
    tags: ["beef", "bulgarian", "cook4me"], image: "beef-shin-slow-cooked",
  }),
];
