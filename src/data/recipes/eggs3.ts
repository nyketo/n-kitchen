import { ing, step, recipe } from "../builder";
import type { Recipe } from "@/lib/types";

export const eggs3Recipes: Recipe[] = [
  recipe({
    id: "eggs-shakshuka-bg-style",
    title: "Яйца в доматен сос (шакшука)",
    description: "Пикантно и наситено ястие за закуска или вечеря.",
    category: "eggs", cuisine: "international", dietType: ["keto", "low-carb"],
    ingredients: [ing("egg", 3, "pcs"), ing("tomato-fresh", 250), ing("onion", 50), ing("pepper", 1, "pcs"), ing("olive-oil", 15, "ml"), ing("paprika", 1), ing("salt", 4)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", isBestResult: true, prepTime: 10, activeTime: 12, cookTime: 18,
      hobSettings: { power: "среден огън ≈ 5/9" },
      steps: [
        step("Задуши лука и чушката в олио 5 мин.", { appliance: "stovetop", minutes: 5 }),
        step("Добави доматите, паприка и сол, вари 8 мин.", { appliance: "stovetop", minutes: 8 }),
        step("Направи трапчинки, счупи яйцата вътре, покрий и довърши 5 мин.", { appliance: "stovetop", minutes: 5 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "summer", dairyFree: true, omadCompatible: false,
    tags: ["eggs", "quick"], image: "shakshuka",
  }),
  recipe({
    id: "eggs-cheese-omelette-airfryer",
    title: "Омлет със сирене в Air Fryer",
    description: "Неочакван, но чудесен начин за пухкав омлет.",
    category: "eggs", cuisine: "international", dietType: ["keto"],
    ingredients: [ing("egg", 3, "pcs"), ing("white-cheese", 50), ing("butter", 10), ing("salt", 2)],
    servingsBase: 1,
    methods: [{
      method: "airfryer", isBestResult: true, prepTime: 5, activeTime: 5, cookTime: 10,
      airfryerSettings: { tempC: 160, minutes: 10, preheat: true, shake: false },
      steps: [
        step("Разбий яйцата със сирене и сол, изсипи в намазана форма."),
        step("Готви 10 мин на 160°C.", { appliance: "airfryer", minutes: 10, tempC: 160 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["eggs", "dairy", "airfryer", "quick"], image: "omelette-airfryer",
  }),
  recipe({
    id: "eggs-deviled-classic",
    title: "Пълнени яйца класически",
    description: "Идеална студена закуска или мезе.",
    category: "eggs", cuisine: "international", dietType: ["keto"],
    ingredients: [ing("egg", 4, "pcs"), ing("cream-cheese", 40), ing("paprika", 1), ing("salt", 2)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", isBestResult: true, prepTime: 5, activeTime: 10, cookTime: 10,
      hobSettings: { power: "силен огън ≈ 7/9" },
      steps: [
        step("Свари яйцата твърдо 9-10 мин.", { appliance: "stovetop", minutes: 10 }),
        step("Обели, преполови, извади жълтъците."),
        step("Смеси жълтъците с крема сирене и сол, напълни обратно."),
        step("Поръси с паприка."),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["eggs", "dairy"], image: "deviled-eggs",
  }),
  recipe({
    id: "eggs-bacon-spinach-skillet",
    title: "Яйца с бекон и спанак на тиган",
    description: "Заситваща закуска, богата на протеин.",
    category: "eggs", cuisine: "international", dietType: ["keto"],
    ingredients: [ing("egg", 3, "pcs"), ing("bacon", 60), ing("spinach", 100), ing("olive-oil", 5, "ml"), ing("salt", 2)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", isBestResult: true, prepTime: 5, activeTime: 10, cookTime: 12,
      hobSettings: { power: "среден огън ≈ 5/9" },
      steps: [
        step("Запържи бекона хрупкав 5 мин.", { appliance: "stovetop", minutes: 5 }),
        step("Добави спанака, задуши 2 мин."),
        step("Разбий яйцата отгоре, разбъркай до сварено 5 мин.", { appliance: "stovetop", minutes: 5 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "minimal", season: "all", dairyFree: true, omadCompatible: false,
    tags: ["eggs", "quick"], image: "eggs-bacon-spinach",
  }),
  recipe({
    id: "eggs-cauliflower-hash",
    title: "Хаш от карфиол с яйца",
    description: "Нискокалорична алтернатива на картофен хаш.",
    category: "eggs", cuisine: "international", dietType: ["keto", "low-carb"],
    ingredients: [ing("egg", 2, "pcs"), ing("cauliflower", 250), ing("onion", 40), ing("olive-oil", 15, "ml"), ing("paprika", 1), ing("salt", 4)],
    servingsBase: 1,
    methods: [{
      method: "stovetop", isBestResult: true, prepTime: 10, activeTime: 15, cookTime: 18,
      hobSettings: { power: "среден-силен огън ≈ 6/9" },
      steps: [
        step("Настържи карфиола, запържи с лука в олио 10 мин.", { appliance: "stovetop", minutes: 10 }),
        step("Направи трапчинки, счупи яйцата, покрий и довърши 6 мин.", { appliance: "stovetop", minutes: 6 }),
      ],
    }],
    difficulty: "easy", cleanupLevel: "normal", season: "all", dairyFree: true, omadCompatible: false,
    tags: ["eggs", "quick"], image: "cauliflower-hash",
  }),
  recipe({
    id: "eggs-baked-cups-ham",
    title: "Печени яйца в чашки с шунка",
    description: "Красива закуска за гости, лесна за порциониране.",
    category: "eggs", cuisine: "international", dietType: ["keto"],
    ingredients: [ing("egg", 4, "pcs"), ing("bacon", 80), ing("yellow-cheese", 40), ing("salt", 2)],
    servingsBase: 1,
    methods: [{
      method: "oven", isBestResult: true, prepTime: 10, activeTime: 8, cookTime: 15,
      ovenSettings: { tempC: 190, fan: true, preheat: true, covered: false },
      steps: [
        step("Обвий формички за мъфини с ивици бекон."),
        step("Счупи по едно яйце във всяка, поръси кашкавал и сол."),
        step("Печи 12-15 мин на 190°C.", { appliance: "oven", minutes: 15, tempC: 190 }),
      ],
    }],
    difficulty: "medium", cleanupLevel: "normal", season: "all", dairyFree: false, omadCompatible: false,
    tags: ["eggs", "dairy", "oven"], image: "baked-egg-cups",
  }),
];
