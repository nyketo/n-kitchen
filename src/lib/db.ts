import Dexie, { type Table } from "dexie";

export interface FavoriteRow { recipeId: string; createdAt: number; }
export interface RatingRow { recipeId: string; stars: number; quickTags: string[]; updatedAt: number; }
export interface NoteRow { id?: number; recipeId: string; text: string; createdAt: number; }
export interface FridgeItem { id?: number; name: string; quantity: number; unit: "g" | "ml" | "pcs"; expiry?: string; ingredientId?: string; }
export interface PantryItem { id?: number; name: string; ingredientId?: string; inStock: boolean; }
export interface ShoppingItem { id?: number; name: string; quantity: number; unit: "g" | "ml" | "pcs"; category: string; checked: boolean; sourceRecipeId?: string; }
export interface WeeklyMenuDay { day: string; mode: "OMAD" | "16:8"; recipeIds: string[]; }
export interface UserPreferences {
  id?: number;
  theme: "light" | "dark" | "system";
  language: "bg" | "de" | "en";
  region: "bg" | "de";
  proteinTargetG?: number;
  netCarbLimitG?: number;
  calorieTarget?: number;
  ingredientStatus: Record<string, "blocked" | "not-preferred" | "favorite">;
  weeklyFrequency: { fish: number; pork: number; chicken: number; beef: number };
  oven: { fan: boolean; unit: "C"; hasConvection: boolean };
  hob: { type: "induction" | "ceramic" | "electric" | "gas"; powerLevels: number };
  aiBudgetEUR: number;
  dairyFreeOnly: boolean;
}
export interface PersonalProduct { id?: number; name: string; kcal: number; protein: number; fat: number; carbs: number; fiber: number; confirmed: boolean; }
export interface UserPhoto { id?: number; recipeId: string; dataUrl: string; createdAt: number; }
export interface AiUsageRow { id?: number; month: string; costEUR: number; requests: number; }
export interface RecentPromptRow { id?: number; recipeId: string; viewedAt: number; }
export interface SavedAiRecipe { id?: number; title: string; prompt: string; text: string; createdAt: number; }

class NKitchenDB extends Dexie {
  favorites!: Table<FavoriteRow, string>;
  ratings!: Table<RatingRow, string>;
  notes!: Table<NoteRow, number>;
  fridge!: Table<FridgeItem, number>;
  pantry!: Table<PantryItem, number>;
  shopping!: Table<ShoppingItem, number>;
  weeklyMenu!: Table<WeeklyMenuDay, string>;
  preferences!: Table<UserPreferences, number>;
  personalProducts!: Table<PersonalProduct, number>;
  photos!: Table<UserPhoto, number>;
  aiUsage!: Table<AiUsageRow, number>;
  recentlyViewed!: Table<RecentPromptRow, number>;
  savedAiRecipes!: Table<SavedAiRecipe, number>;

  constructor() {
    super("n-kitchen");
    this.version(1).stores({
      favorites: "recipeId, createdAt",
      ratings: "recipeId, updatedAt",
      notes: "++id, recipeId, createdAt",
      fridge: "++id, name, ingredientId",
      pantry: "++id, name, ingredientId",
      shopping: "++id, category, checked",
      weeklyMenu: "day",
      preferences: "++id",
      personalProducts: "++id, name",
      photos: "++id, recipeId",
      aiUsage: "++id, month",
      recentlyViewed: "++id, recipeId, viewedAt",
    });
    this.version(2).stores({
      savedAiRecipes: "++id, createdAt",
    });
  }
}

export const db = new NKitchenDB();

export const DEFAULT_PANTRY: string[] = [
  "apple-cider-vinegar", "ghee", "butter", "olive-oil", "savory", "spearmint", "mint",
  "oregano", "black-pepper", "salt", "paprika", "bay-leaf", "allspice", "rosemary", "pickled-pepper",
];

export const DEFAULT_PREFERENCES: UserPreferences = {
  theme: "system",
  language: "bg",
  region: "bg",
  proteinTargetG: 120,
  netCarbLimitG: 30,
  ingredientStatus: {
    mushrooms: "blocked", eggplant: "blocked", turkey: "blocked", olives: "blocked",
  },
  weeklyFrequency: { fish: 2, pork: 3, chicken: 3, beef: 2 },
  oven: { fan: true, unit: "C", hasConvection: true },
  hob: { type: "induction", powerLevels: 9 },
  aiBudgetEUR: 3,
  dairyFreeOnly: false,
};

export async function ensurePreferences(): Promise<UserPreferences> {
  const existing = await db.preferences.toCollection().first();
  if (existing) return existing;
  const id = await db.preferences.add(DEFAULT_PREFERENCES);
  return { ...DEFAULT_PREFERENCES, id: id as number };
}

export async function ensurePantry(): Promise<void> {
  const count = await db.pantry.count();
  if (count > 0) return;
  await db.pantry.bulkAdd(
    DEFAULT_PANTRY.map((ingredientId) => ({ name: ingredientId, ingredientId, inStock: true }))
  );
}
