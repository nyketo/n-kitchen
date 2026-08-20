// N Kitchen — Българска национална кухня, партида 4: автентични тестени/сладки класики.
// Тези рецепти умишлено НЕ получават кето/лоу-карб вариант — баница, тиквеник, мекици и
// палачинки не могат да се адаптират честно без да загубят характера си. N Kitchen е сайт
// за готвене, не само за кето, затова традиционните рецепти остават тук, показани точно
// както се правят у дома.
import { ing, step, recipe } from "../builder";
import type { Recipe } from "@/lib/types";

export const bulgarian4Recipes: Recipe[] = [
  recipe({
    id: "bg-banitsa-sirene",
    title: "Баница със сирене",
    description: "Класическа баница на кори с разбито яйце, кисело мляко и сирене.",
    category: "bulgarian", cuisine: "bg", dietType: [], noKetoAdapt: true,
    ingredients: [
      ing("phyllo-pastry", 400, "g", "10 кори"), ing("white-cheese", 300), ing("egg", 4, "pcs"),
      ing("yogurt", 200), ing("butter", 80), ing("baking-powder", 5),
    ],
    servingsBase: 4,
    methods: [{
      method: "oven", prepTime: 20, activeTime: 15, cookTime: 45,
      ovenSettings: { tempC: 180, fan: false, preheat: true },
      steps: [
        step("Разбий яйцата с киселото мляко, натрошеното сирене и бакпулвера."),
        step("Намажи тавата с разтопено масло, наслагвай смачкани кори, като заливаш всяка с малко от сместа."),
        step("Залей последната кора с останалата смес и разтопеното масло отгоре."),
        step("Печи на 180°C 40-45 мин до златисто.", { appliance: "oven", minutes: 43, tempC: 180 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["pastry", "bulgarian", "oven", "vegetarian"], image: "banitsa-sirene",
  }),
  recipe({
    id: "bg-tikvenik",
    title: "Тиквеник",
    description: "Сладка баница с тиква, орехи, захар и канела — есенна класика.",
    category: "bulgarian", cuisine: "bg", dietType: [], noKetoAdapt: true,
    ingredients: [
      ing("phyllo-pastry", 400, "g", "10 кори"), ing("pumpkin", 500, "g", "настъргана"),
      ing("walnuts", 80), ing("sugar", 100), ing("cinnamon", 4), ing("butter", 80),
    ],
    servingsBase: 4,
    methods: [{
      method: "oven", prepTime: 25, activeTime: 15, cookTime: 45,
      ovenSettings: { tempC: 180, fan: false, preheat: true },
      steps: [
        step("Смеси настърганата тиква със захарта, орехите и канелата."),
        step("Намажи тавата с масло, наслагвай кори с плънка на всеки два-три пласта."),
        step("Залей отгоре с разтопеното масло."),
        step("Печи на 180°C 40-45 мин до златисто.", { appliance: "oven", minutes: 43, tempC: 180 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "winter", dairyFree: false, omadCompatible: false,
    tags: ["pastry", "dessert", "bulgarian", "oven", "vegetarian"], image: "tikvenik",
  }),
  recipe({
    id: "bg-mekitsi",
    title: "Мекици",
    description: "Пухкави пържени мекици с кисело мляко — класическа българска закуска.",
    category: "bulgarian", cuisine: "bg", dietType: [], noKetoAdapt: true,
    ingredients: [
      ing("wheat-flour", 350), ing("yogurt", 200), ing("egg", 1, "pcs"), ing("baking-powder", 8),
      ing("salt", 3), ing("sunflower-oil", 40, "ml", "за пържене — реално абсорбирано количество"),
    ],
    servingsBase: 4,
    methods: [{
      method: "stovetop", prepTime: 20, activeTime: 20, cookTime: 15,
      steps: [
        step("Смеси брашното с киселото мляко, яйцето, бакпулвера и солта в меко тесто."),
        step("Остави тестото да почине 15 мин, после разточи и оформи питки."),
        step("Пържи в горещо олио по 2-3 мин от всяка страна до златисто.", { appliance: "stovetop", minutes: 3 }),
        step("Отцеди от излишното олио върху хартиена кърпа преди сервиране."),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["pastry", "breakfast", "bulgarian", "vegetarian"], image: "mekitsi",
  }),
  recipe({
    id: "bg-palachinki",
    title: "Палачинки",
    description: "Тънки палачинки за закуска — с конфитюр, шоколад или сладко сирене.",
    category: "bulgarian", cuisine: "bg", dietType: [], noKetoAdapt: true,
    ingredients: [
      ing("wheat-flour", 200), ing("milk", 400, "ml"), ing("egg", 2, "pcs"), ing("sugar", 20),
      ing("salt", 2), ing("sunflower-oil", 20, "ml", "за пържене"),
    ],
    servingsBase: 4,
    methods: [{
      method: "stovetop", prepTime: 10, activeTime: 20, cookTime: 20,
      steps: [
        step("Разбий брашното с млякото, яйцата, захарта и солта в гладко течно тесто."),
        step("Загрей леко намазнен тиган на среден огън."),
        step("Изпечи тънки палачинки по 1-2 мин от всяка страна.", { appliance: "stovetop", minutes: 2 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["dessert", "breakfast", "bulgarian", "vegetarian"], image: "palachinki",
  }),
  recipe({
    id: "bg-domashen-keks",
    title: "Домашен кекс",
    description: "Прост и влажен домашен кекс — основа за всякакви добавки по избор.",
    category: "bulgarian", cuisine: "bg", dietType: [], noKetoAdapt: true,
    ingredients: [
      ing("wheat-flour", 250), ing("sugar", 180), ing("egg", 3, "pcs"), ing("sunflower-oil", 150, "ml"),
      ing("milk", 100, "ml"), ing("baking-powder", 10), ing("cocoa", 20, "g", "по желание", true),
    ],
    servingsBase: 6,
    methods: [{
      method: "oven", prepTime: 15, activeTime: 10, cookTime: 45,
      ovenSettings: { tempC: 175, fan: true, preheat: true },
      steps: [
        step("Разбий яйцата със захарта до побеляване, добави олиото и млякото."),
        step("Прибави брашното с бакпулвера, разбъркай до гладко тесто."),
        step("Изсипи в намазнена форма и печи на 175°C 40-45 мин.", { appliance: "oven", minutes: 43, tempC: 175 }),
        step("Провери с клечка за сухота преди да извадиш."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["dessert", "bulgarian", "oven", "vegetarian"], image: "domashen-keks",
  }),
  recipe({
    id: "bg-banitsa-praz",
    title: "Баница с праз",
    description: "Солена баница на кори с праз лук, яйце и сирене — по-леко вариант на класиката.",
    category: "bulgarian", cuisine: "bg", dietType: [], noKetoAdapt: true,
    ingredients: [
      ing("phyllo-pastry", 400, "g", "10 кори"), ing("leek", 300), ing("white-cheese", 150),
      ing("egg", 3, "pcs"), ing("butter", 70), ing("black-pepper", 1),
    ],
    servingsBase: 4,
    methods: [{
      method: "oven", prepTime: 25, activeTime: 15, cookTime: 45,
      ovenSettings: { tempC: 180, fan: false, preheat: true },
      steps: [
        step("Задушавай нарязания праз в малко масло 8 мин до омекване."),
        step("Разбий яйцата, добави сиренето, праза и черния пипер."),
        step("Наслагвай кори в намазнена тава, заливай всяка с малко от плънката."),
        step("Печи на 180°C 40-45 мин до златисто.", { appliance: "oven", minutes: 43, tempC: 180 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "winter", dairyFree: false, omadCompatible: false,
    tags: ["pastry", "bulgarian", "oven", "vegetarian"], image: "banitsa-praz",
  }),
];
