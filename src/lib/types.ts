export type CookingMethod = "cook4me" | "stovetop" | "oven" | "airfryer" | "grill";
export type DietType = "keto" | "low-carb";
export type Difficulty = "easy" | "medium" | "advanced";
export type MealCategory =
  | "pork" | "beef" | "chicken" | "minced" | "mackerel" | "other-fish" | "eggs"
  | "soups" | "stews" | "salads" | "desserts" | "bread" | "pizza" | "sauces"
  | "cabbage" | "bulgarian";

export interface RecipeIngredient {
  ingredientId: string;
  grams?: number;   // for g/ml based ingredients
  ml?: number;
  pieces?: number;  // for pcs based ingredients (egg, pepper, garlic clove)
  note?: string;    // e.g. "нарязан на ситно"
  optional?: boolean;
}

export interface RecipeStep {
  text: string;
  appliance?: CookingMethod;
  minutes?: number;      // duration of this step, if timed
  tempC?: number;         // target temperature if relevant
}

export interface MethodInstructions {
  method: CookingMethod;
  isBestResult?: boolean;
  prepTime: number;
  activeTime: number;
  cookTime: number;
  steps: RecipeStep[];
  ovenSettings?: { tempC: number; fan: boolean; rack?: string; preheat?: boolean; covered?: boolean };
  airfryerSettings?: { tempC: number; minutes: number; preheat?: boolean; shake?: boolean };
  grillSettings?: { heat: string; minutesPerSide: number; thicknessNote?: string };
  hobSettings?: { power: string };
  internalTempC?: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: MealCategory;
  cuisine: "bg" | "international";
  dietType: DietType[];
  ingredients: RecipeIngredient[];
  servingsBase: number; // default 1
  methods: MethodInstructions[];
  difficulty: Difficulty;
  cleanupLevel: "minimal" | "normal";
  season: "all" | "summer" | "winter";
  dairyFree: boolean;
  omadCompatible: boolean;
  tags: string[];
  image: string; // path or gradient key
  fishType?: "mackerel" | "other";
}
