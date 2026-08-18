// N Kitchen — Ingredient nutrition database (per 100g/100ml, raw unless noted)
// Values are realistic nutritional-database approximations (USDA/EU FCDB-style).
// kcal/protein/fat/carbs/fiber in grams per 100g. netCarbs = carbs - fiber (computed at runtime).

export type IngredientCategory =
  | "meat" | "fish" | "egg" | "dairy" | "vegetable" | "fruit"
  | "fat" | "spice" | "nut" | "sweetener" | "flour" | "other";

export interface Ingredient {
  id: string;
  name_bg: string;
  name_de?: string;
  name_en?: string;
  category: IngredientCategory;
  unit: "g" | "ml" | "pcs";
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
  dairy?: boolean;
  nuts?: boolean;
  blocked?: boolean; // globally blocked ingredient (мушки, патладжан, пуешко, маслини)
  pieceGrams?: number; // avg weight if unit === 'pcs'
  tags?: string[];
}

export const INGREDIENTS: Ingredient[] = [
  // ---- MEAT ----
  { id: "pork-neck", name_bg: "Свински врат", name_de: "Schweinenacken", category: "meat", unit: "g", kcal: 263, protein: 17.5, fat: 21, carbs: 0, fiber: 0 },
  { id: "pork-shoulder", name_bg: "Свинско рамо", name_de: "Schweineschulter", category: "meat", unit: "g", kcal: 242, protein: 18, fat: 18.5, carbs: 0, fiber: 0 },
  { id: "pork-belly", name_bg: "Свински гърди (бекон основа)", name_de: "Schweinebauch", category: "meat", unit: "g", kcal: 396, protein: 14, fat: 37, carbs: 0, fiber: 0 },
  { id: "pork-loin", name_bg: "Свинско филе", name_de: "Schweinefilet", category: "meat", unit: "g", kcal: 143, protein: 21.5, fat: 5.9, carbs: 0, fiber: 0 },
  { id: "pork-ribs", name_bg: "Свински ребра", name_de: "Rippchen", category: "meat", unit: "g", kcal: 277, protein: 16.7, fat: 23, carbs: 0, fiber: 0 },
  { id: "pork-leg", name_bg: "Свински бут", name_de: "Schweinekeule", category: "meat", unit: "g", kcal: 200, protein: 20, fat: 13, carbs: 0, fiber: 0 },
  { id: "beef-shin", name_bg: "Телешко кокоше месо (джолан)", name_de: "Rinderhaxe", category: "meat", unit: "g", kcal: 137, protein: 20.5, fat: 5.5, carbs: 0, fiber: 0 },
  { id: "beef-chuck", name_bg: "Телешко плешка", name_de: "Rinderschulter", category: "meat", unit: "g", kcal: 197, protein: 20, fat: 12.5, carbs: 0, fiber: 0 },
  { id: "beef-sirloin", name_bg: "Телешки антрекот", name_de: "Rinderentrecote", category: "meat", unit: "g", kcal: 218, protein: 21, fat: 14.5, carbs: 0, fiber: 0 },
  { id: "beef-tenderloin", name_bg: "Телешко филе", name_de: "Rinderfilet", category: "meat", unit: "g", kcal: 179, protein: 21.5, fat: 9.5, carbs: 0, fiber: 0 },
  { id: "beef-minced", name_bg: "Телешка кайма", name_de: "Rinderhack", category: "meat", unit: "g", kcal: 215, protein: 19, fat: 15, carbs: 0, fiber: 0 },
  { id: "pork-minced", name_bg: "Свинска кайма", name_de: "Schweinehack", category: "meat", unit: "g", kcal: 263, protein: 17, fat: 21, carbs: 0, fiber: 0 },
  { id: "mixed-minced", name_bg: "Смляна кайма (смес)", name_de: "Gemischtes Hack", category: "meat", unit: "g", kcal: 240, protein: 18, fat: 18, carbs: 0, fiber: 0 },
  { id: "chicken-breast", name_bg: "Пилешко филе", name_de: "Hähnchenbrust", category: "meat", unit: "g", kcal: 120, protein: 22.5, fat: 2.6, carbs: 0, fiber: 0 },
  { id: "chicken-thigh", name_bg: "Пилешко бонфиле (бут)", name_de: "Hähnchenschenkel", category: "meat", unit: "g", kcal: 177, protein: 18.5, fat: 11, carbs: 0, fiber: 0 },
  { id: "chicken-wing", name_bg: "Пилешки крилца", name_de: "Hähnchenflügel", category: "meat", unit: "g", kcal: 203, protein: 18.4, fat: 14, carbs: 0, fiber: 0 },
  { id: "chicken-whole", name_bg: "Цяло пиле", name_de: "Ganzes Hähnchen", category: "meat", unit: "g", kcal: 190, protein: 18, fat: 13, carbs: 0, fiber: 0 },
  { id: "chicken-liver", name_bg: "Пилешки дробчета", name_de: "Hähnchenleber", category: "meat", unit: "g", kcal: 119, protein: 17.9, fat: 4.8, carbs: 0.7, fiber: 0 },
  { id: "bacon", name_bg: "Бекон", name_de: "Speck", category: "meat", unit: "g", kcal: 417, protein: 12, fat: 42, carbs: 1.4, fiber: 0 },
  { id: "sausage-lukanka", name_bg: "Луканка", category: "meat", unit: "g", kcal: 380, protein: 24, fat: 31, carbs: 1, fiber: 0 },
  { id: "sausage-sudzhuk", name_bg: "Суджук", category: "meat", unit: "g", kcal: 400, protein: 23, fat: 33, carbs: 1.5, fiber: 0 },
  { id: "sausage-quality", name_bg: "Качествена свинска наденица (ниско въглехидратна)", category: "meat", unit: "g", kcal: 300, protein: 15, fat: 26, carbs: 1.5, fiber: 0 },

  // ---- FISH ----
  { id: "mackerel", name_bg: "Скумрия (филе)", name_de: "Makrele", category: "fish", unit: "g", kcal: 205, protein: 18.6, fat: 13.9, carbs: 0, fiber: 0 },
  { id: "mackerel-whole", name_bg: "Скумрия (цяла, изчистена)", name_de: "Makrele ganz", category: "fish", unit: "g", kcal: 190, protein: 17.5, fat: 12.8, carbs: 0, fiber: 0 },
  { id: "salmon", name_bg: "Сьомга (филе)", name_de: "Lachs", category: "fish", unit: "g", kcal: 208, protein: 20, fat: 13, carbs: 0, fiber: 0 },
  { id: "trout", name_bg: "Пъстърва", name_de: "Forelle", category: "fish", unit: "g", kcal: 148, protein: 20.8, fat: 6.6, carbs: 0, fiber: 0 },
  { id: "whitefish", name_bg: "Бяла риба (щука/бяла риба)", name_de: "Weißfisch", category: "fish", unit: "g", kcal: 105, protein: 21, fat: 1.5, carbs: 0, fiber: 0 },
  { id: "seabream", name_bg: "Ципура", name_de: "Dorade", category: "fish", unit: "g", kcal: 121, protein: 20, fat: 4, carbs: 0, fiber: 0 },
  { id: "shrimp", name_bg: "Скариди", name_de: "Garnelen", category: "fish", unit: "g", kcal: 99, protein: 24, fat: 0.3, carbs: 0.2, fiber: 0 },

  // ---- EGG ----
  { id: "egg", name_bg: "Яйце", name_de: "Ei", category: "egg", unit: "pcs", pieceGrams: 55, kcal: 143, protein: 12.6, fat: 9.9, carbs: 0.7, fiber: 0 },

  // ---- DAIRY ----
  { id: "butter", name_bg: "Краве масло", name_de: "Butter", category: "fat", unit: "g", kcal: 717, protein: 0.9, fat: 81, carbs: 0.1, fiber: 0, dairy: true },
  { id: "ghee", name_bg: "Гхи", name_de: "Ghee", category: "fat", unit: "g", kcal: 900, protein: 0, fat: 100, carbs: 0, fiber: 0, dairy: false },
  { id: "schlagsahne", name_bg: "Течна сметана за разбиване (Schlagsahne)", name_de: "Schlagsahne", category: "dairy", unit: "ml", kcal: 335, protein: 2.1, fat: 35, carbs: 3, fiber: 0, dairy: true },
  { id: "white-cheese", name_bg: "Бяло саламурено сирене", category: "dairy", unit: "g", kcal: 264, protein: 17, fat: 21, carbs: 2, fiber: 0, dairy: true },
  { id: "yellow-cheese", name_bg: "Кашкавал", category: "dairy", unit: "g", kcal: 350, protein: 24, fat: 27, carbs: 2, fiber: 0, dairy: true },
  { id: "mozzarella", name_bg: "Моцарела", category: "dairy", unit: "g", kcal: 280, protein: 22, fat: 20, carbs: 2.2, fiber: 0, dairy: true },
  { id: "parmesan", name_bg: "Пармезан", category: "dairy", unit: "g", kcal: 392, protein: 35.8, fat: 25.8, carbs: 4.1, fiber: 0, dairy: true },
  { id: "cream-cheese", name_bg: "Крема сирене", category: "dairy", unit: "g", kcal: 342, protein: 6, fat: 34, carbs: 4, fiber: 0, dairy: true },
  { id: "yogurt", name_bg: "Кисело мляко (пълномаслено)", category: "dairy", unit: "g", kcal: 66, protein: 3.8, fat: 3.8, carbs: 4.7, fiber: 0, dairy: true },

  // ---- FATS ----
  { id: "olive-oil", name_bg: "Зехтин", name_de: "Olivenöl", category: "fat", unit: "ml", kcal: 884, protein: 0, fat: 100, carbs: 0, fiber: 0 },
  { id: "apple-cider-vinegar", name_bg: "Ябълков оцет", name_de: "Apfelessig", category: "other", unit: "ml", kcal: 22, protein: 0, fat: 0, carbs: 0.9, fiber: 0 },

  // ---- VEGETABLES ----
  { id: "cabbage", name_bg: "Прясно зеле", name_de: "Weißkohl", category: "vegetable", unit: "g", kcal: 25, protein: 1.3, fat: 0.1, carbs: 5.8, fiber: 2.5 },
  { id: "sauerkraut", name_bg: "Кисело зеле", name_de: "Sauerkraut", category: "vegetable", unit: "g", kcal: 19, protein: 0.9, fat: 0.1, carbs: 4.3, fiber: 2.9 },
  { id: "cucumber", name_bg: "Краставица", name_de: "Gurke", category: "vegetable", unit: "g", kcal: 15, protein: 0.7, fat: 0.1, carbs: 3.6, fiber: 0.5 },
  { id: "tomato-fresh", name_bg: "Пресен домат", name_de: "Tomate", category: "vegetable", unit: "g", kcal: 18, protein: 0.9, fat: 0.2, carbs: 3.9, fiber: 1.2 },
  { id: "pepper", name_bg: "Чушка", name_de: "Paprika", category: "vegetable", unit: "g", kcal: 27, protein: 1, fat: 0.3, carbs: 6.3, fiber: 2.1, pieceGrams: 120 },
  { id: "zucchini", name_bg: "Тиквичка", name_de: "Zucchini", category: "vegetable", unit: "g", kcal: 17, protein: 1.2, fat: 0.3, carbs: 3.1, fiber: 1 },
  { id: "broccoli", name_bg: "Броколи", name_de: "Brokkoli", category: "vegetable", unit: "g", kcal: 34, protein: 2.8, fat: 0.4, carbs: 6.6, fiber: 2.6 },
  { id: "cauliflower", name_bg: "Карфиол", name_de: "Blumenkohl", category: "vegetable", unit: "g", kcal: 25, protein: 1.9, fat: 0.3, carbs: 5, fiber: 2 },
  { id: "green-beans", name_bg: "Зелен фасул", name_de: "Grüne Bohnen", category: "vegetable", unit: "g", kcal: 31, protein: 1.8, fat: 0.2, carbs: 7, fiber: 3.4 },
  { id: "green-salad", name_bg: "Зелена салата", name_de: "Kopfsalat", category: "vegetable", unit: "g", kcal: 15, protein: 1.4, fat: 0.2, carbs: 2.9, fiber: 1.3 },
  { id: "spinach", name_bg: "Спанак", name_de: "Spinat", category: "vegetable", unit: "g", kcal: 23, protein: 2.9, fat: 0.4, carbs: 3.6, fiber: 2.2 },
  { id: "onion", name_bg: "Лук", name_de: "Zwiebel", category: "vegetable", unit: "g", kcal: 40, protein: 1.1, fat: 0.1, carbs: 9.3, fiber: 1.7 },
  { id: "garlic", name_bg: "Чесън", name_de: "Knoblauch", category: "vegetable", unit: "g", kcal: 149, protein: 6.4, fat: 0.5, carbs: 33, fiber: 2.1, pieceGrams: 4 },
  { id: "leek", name_bg: "Праз", name_de: "Lauch", category: "vegetable", unit: "g", kcal: 61, protein: 1.5, fat: 0.3, carbs: 14.2, fiber: 1.8 },
  { id: "celery", name_bg: "Целина", name_de: "Sellerie", category: "vegetable", unit: "g", kcal: 16, protein: 0.7, fat: 0.2, carbs: 3, fiber: 1.6 },
  { id: "carrot", name_bg: "Морков", name_de: "Karotte", category: "vegetable", unit: "g", kcal: 41, protein: 0.9, fat: 0.2, carbs: 9.6, fiber: 2.8 },
  { id: "radish", name_bg: "Репички", name_de: "Radieschen", category: "vegetable", unit: "g", kcal: 16, protein: 0.7, fat: 0.1, carbs: 3.4, fiber: 1.6 },
  { id: "pickled-pepper", name_bg: "Пиперонки (люти, туршия)", category: "vegetable", unit: "g", kcal: 20, protein: 0.9, fat: 0.4, carbs: 4, fiber: 1.5 },
  { id: "hot-pepper-fresh", name_bg: "Люта чушка прясна", category: "vegetable", unit: "g", kcal: 40, protein: 1.9, fat: 0.4, carbs: 8.8, fiber: 1.5, pieceGrams: 15 },

  // ---- NUTS / SEEDS ----
  { id: "walnuts", name_bg: "Орехи", category: "nut", unit: "g", kcal: 654, protein: 15.2, fat: 65.2, carbs: 13.7, fiber: 6.7, nuts: true },
  { id: "almonds", name_bg: "Бадеми", category: "nut", unit: "g", kcal: 579, protein: 21.2, fat: 49.9, carbs: 21.6, fiber: 12.5, nuts: true },
  { id: "pumpkin-seeds", name_bg: "Тиквени семки", category: "nut", unit: "g", kcal: 559, protein: 30.2, fat: 49, carbs: 10.7, fiber: 6, nuts: true },

  // ---- SWEETENERS / DESSERT ----
  { id: "erythritol", name_bg: "Еритритол", category: "sweetener", unit: "g", kcal: 0, protein: 0, fat: 0, carbs: 0, fiber: 0 },
  { id: "cocoa", name_bg: "Какао на прах (неподсладено)", category: "other", unit: "g", kcal: 228, protein: 19.6, fat: 13.7, carbs: 57.9, fiber: 33.2 },

  // ---- FLOUR SUBSTITUTES (Keto bread/pizza) ----
  { id: "almond-flour", name_bg: "Бадемово брашно", category: "flour", unit: "g", kcal: 571, protein: 21, fat: 50, carbs: 20, fiber: 10, nuts: true },
  { id: "coconut-flour", name_bg: "Кокосово брашно", category: "flour", unit: "g", kcal: 400, protein: 19, fat: 14, carbs: 60, fiber: 38 },
  { id: "psyllium", name_bg: "Псилиум люспи", category: "flour", unit: "g", kcal: 210, protein: 2, fat: 0.5, carbs: 80, fiber: 78 },
  { id: "flaxseed", name_bg: "Ленено семе (смляно)", category: "flour", unit: "g", kcal: 534, protein: 18.3, fat: 42.2, carbs: 28.9, fiber: 27.3 },
  { id: "baking-powder", name_bg: "Бакпулвер", category: "other", unit: "g", kcal: 53, protein: 0, fat: 0, carbs: 27.7, fiber: 0.2 },

  // ---- SPICES (My Pantry defaults) ----
  { id: "salt", name_bg: "Сол", category: "spice", unit: "g", kcal: 0, protein: 0, fat: 0, carbs: 0, fiber: 0 },
  { id: "black-pepper", name_bg: "Черен пипер", category: "spice", unit: "g", kcal: 251, protein: 10.4, fat: 3.3, carbs: 64, fiber: 25.3 },
  { id: "paprika", name_bg: "Червен пипер", category: "spice", unit: "g", kcal: 282, protein: 14.1, fat: 12.9, carbs: 54, fiber: 34.9 },
  { id: "bay-leaf", name_bg: "Дафинов лист", category: "spice", unit: "g", kcal: 313, protein: 7.6, fat: 8.4, carbs: 75, fiber: 26.3, pieceGrams: 0.3 },
  { id: "allspice", name_bg: "Бахар", category: "spice", unit: "g", kcal: 263, protein: 6.1, fat: 8.7, carbs: 72.1, fiber: 21.6 },
  { id: "rosemary", name_bg: "Розмарин", category: "spice", unit: "g", kcal: 331, protein: 4.9, fat: 15.2, carbs: 64, fiber: 42.6 },
  { id: "savory", name_bg: "Чубрица", category: "spice", unit: "g", kcal: 272, protein: 6.7, fat: 5.9, carbs: 68.7, fiber: 45.7 },
  { id: "spearmint", name_bg: "Джоджен", category: "spice", unit: "g", kcal: 285, protein: 20.9, fat: 5.8, carbs: 52 , fiber: 14.9 },
  { id: "mint", name_bg: "Мента", category: "spice", unit: "g", kcal: 70, protein: 3.8, fat: 0.9, carbs: 15, fiber: 8 },
  { id: "oregano", name_bg: "Риган", category: "spice", unit: "g", kcal: 265, protein: 9, fat: 4.3, carbs: 69, fiber: 42.5 },
  { id: "lemon", name_bg: "Лимон (сок)", category: "fruit", unit: "ml", kcal: 22, protein: 0.4, fat: 0.2, carbs: 6.9, fiber: 0.3 },
];

export const INGREDIENT_MAP: Record<string, Ingredient> = Object.fromEntries(
  INGREDIENTS.map((i) => [i.id, i])
);

// Hard-blocked ingredients per N Kitchen rules — never appear in recipes/AI output.
export const GLOBALLY_BLOCKED = ["mushrooms", "eggplant", "turkey", "olives"];
