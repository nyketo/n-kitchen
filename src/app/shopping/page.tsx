"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { getRecipeById } from "@/data/recipes";
import { INGREDIENT_MAP } from "@/data/ingredients";
import type { IngredientCategory } from "@/data/ingredients";

const CATEGORY_ICON: Record<IngredientCategory, string> = {
  meat: "🥩", fish: "🐟", egg: "🥚", vegetable: "🥬", fruit: "🍋", fat: "🫒",
  spice: "🧂", nut: "🌰", sweetener: "🍯", flour: "🌾", grain: "🌾", dairy: "🧀", other: "📦",
};
const CATEGORY_LABEL: Record<IngredientCategory, string> = {
  meat: "Месо", fish: "Риба", egg: "Яйца", vegetable: "Зеленчуци", fruit: "Плодове", fat: "Мазнини",
  spice: "Подправки", nut: "Ядки", sweetener: "Подсладители", flour: "Брашна", grain: "Зърнени/тесто", dairy: "Млечни", other: "Друго",
};

export default function ShoppingPage() {
  const menu = useLiveQuery(() => db.weeklyMenu.toArray(), []) ?? [];
  const fridge = useLiveQuery(() => db.fridge.toArray(), []) ?? [];
  const manualItems = useLiveQuery(() => db.shopping.toArray(), []) ?? [];

  const have = new Map<string, number>();
  for (const f of fridge) {
    const key = f.ingredientId ?? f.name.toLowerCase();
    have.set(key, (have.get(key) ?? 0) + f.quantity);
  }

  const needed = new Map<string, number>();
  for (const day of menu) {
    for (const recipeId of day.recipeIds) {
      const recipe = getRecipeById(recipeId);
      if (!recipe) continue;
      for (const ri of recipe.ingredients) {
        const ing = INGREDIENT_MAP[ri.ingredientId];
        if (!ing || ing.category === "spice") continue;
        const amount = ri.grams ?? ri.ml ?? (ri.pieces ?? 0) * (ing.pieceGrams ?? 50);
        needed.set(ri.ingredientId, (needed.get(ri.ingredientId) ?? 0) + amount);
      }
    }
  }

  const grouped: Record<string, { name: string; amount: number }[]> = {};
  for (const [ingredientId, amount] of needed) {
    const owned = have.get(ingredientId) ?? 0;
    const missing = amount - owned;
    if (missing <= 0) continue;
    const ing = INGREDIENT_MAP[ingredientId];
    if (!ing) continue;
    grouped[ing.category] ??= [];
    grouped[ing.category].push({ name: ing.name_bg, amount: Math.round(missing) });
  }

  const categories = Object.keys(grouped) as IngredientCategory[];

  async function toggleManual(id: number | undefined, checked: boolean) {
    if (id != null) await db.shopping.update(id, { checked: !checked });
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl mb-1">Списък за пазаруване</h1>
      <p className="text-sm mb-6" style={{ color: "var(--nk-fg-soft)" }}>
        Автоматично изчислен от седмичното меню, минус наличното в хладилника.
      </p>

      {categories.length === 0 && manualItems.length === 0 && (
        <p className="text-sm" style={{ color: "var(--nk-fg-soft)" }}>
          Добави рецепти в седмичното меню, за да се генерира списък автоматично.
        </p>
      )}

      {categories.map((cat) => (
        <div key={cat} className="mb-5">
          <h3 className="text-sm font-semibold mb-2">{CATEGORY_ICON[cat]} {CATEGORY_LABEL[cat]}</h3>
          <ul className="space-y-1">
            {grouped[cat].map((item, i) => (
              <li key={i} className="flex justify-between text-sm rounded-lg border px-3 py-2" style={{ borderColor: "var(--nk-border)" }}>
                <span>{item.name}</span>
                <span style={{ color: "var(--nk-fg-soft)" }}>{item.amount} g</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {manualItems.length > 0 && (
        <div className="mb-5">
          <h3 className="text-sm font-semibold mb-2">📦 Други</h3>
          <ul className="space-y-1">
            {manualItems.map((item) => (
              <li key={item.id} className="flex justify-between text-sm rounded-lg border px-3 py-2" style={{ borderColor: "var(--nk-border)" }}>
                <button onClick={() => toggleManual(item.id, item.checked)} style={{ textDecoration: item.checked ? "line-through" : "none" }}>
                  {item.name}
                </button>
                <span style={{ color: "var(--nk-fg-soft)" }}>{item.quantity} {item.unit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
