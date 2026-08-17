"use client";

import { useState } from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { ALL_RECIPES } from "@/data/recipes";
import { matchRecipeToFridge, MATCH_BADGE } from "@/lib/matching";
import { INGREDIENTS } from "@/data/ingredients";

export default function FridgePage() {
  const items = useLiveQuery(() => db.fridge.toArray(), []) ?? [];
  const [name, setName] = useState("");
  const [qty, setQty] = useState(200);
  const [unit, setUnit] = useState<"g" | "ml" | "pcs">("g");
  const [ingredientId, setIngredientId] = useState("");
  const [showWhatCanICook, setShowWhatCanICook] = useState(false);

  async function addItem() {
    if (!name.trim()) return;
    await db.fridge.add({ name: name.trim(), quantity: qty, unit, ingredientId: ingredientId || undefined });
    setName(""); setIngredientId("");
  }

  async function removeItem(id?: number) {
    if (id != null) await db.fridge.delete(id);
  }

  const matches = ALL_RECIPES
    .map((r) => ({ recipe: r, ...matchRecipeToFridge(r, items) }))
    .filter((m) => m.level !== "missing-2plus" || items.length === 0)
    .sort((a, b) => (a.level === "full" ? -1 : 1) - (b.level === "full" ? -1 : 1))
    .slice(0, 12);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="font-display text-3xl mb-1">Моят хладилник</h1>
      <p className="text-sm mb-6" style={{ color: "var(--nk-fg-soft)" }}>Продукти, които имаш в момента.</p>

      <div className="flex flex-wrap gap-2 mb-6 rounded-2xl border p-4" style={{ borderColor: "var(--nk-border)", background: "var(--nk-card-bg)" }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Продукт (напр. Свински врат)"
          className="flex-1 min-w-[160px] rounded-lg border px-3 py-2 text-sm" style={{ borderColor: "var(--nk-border)" }} />
        <select value={ingredientId} onChange={(e) => setIngredientId(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: "var(--nk-border)" }}>
          <option value="">— свържи с база (по желание) —</option>
          {INGREDIENTS.map((i) => <option key={i.id} value={i.id}>{i.name_bg}</option>)}
        </select>
        <input type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))}
          className="w-24 rounded-lg border px-3 py-2 text-sm" style={{ borderColor: "var(--nk-border)" }} />
        <select value={unit} onChange={(e) => setUnit(e.target.value as "g" | "ml" | "pcs")}
          className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: "var(--nk-border)" }}>
          <option value="g">g</option><option value="ml">ml</option><option value="pcs">бр.</option>
        </select>
        <button onClick={addItem} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: "var(--nk-ember)", color: "#FBF3E7" }}>
          Добави
        </button>
      </div>

      <ul className="space-y-2 mb-8">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center rounded-xl border px-4 py-2.5 text-sm" style={{ borderColor: "var(--nk-border)" }}>
            <span>{item.name} — {item.quantity} {item.unit}</span>
            <button onClick={() => removeItem(item.id)} className="text-xs" style={{ color: "var(--nk-danger)" }}>Премахни</button>
          </li>
        ))}
        {items.length === 0 && <p className="text-sm" style={{ color: "var(--nk-fg-soft)" }}>Хладилникът е празен — добави продукти отгоре.</p>}
      </ul>

      <button onClick={() => setShowWhatCanICook((v) => !v)} className="px-5 py-3 rounded-full text-sm font-semibold mb-4" style={{ background: "var(--nk-olive)", color: "#FBF3E7" }}>
        КАКВО МОГА ДА СГОТВЯ?
      </button>

      {showWhatCanICook && (
        <ul className="space-y-2">
          {matches.map(({ recipe, level }) => (
            <li key={recipe.id}>
              <Link href={`/recipes/${recipe.id}`} className="flex justify-between items-center rounded-xl border px-4 py-3 text-sm hover:opacity-80" style={{ borderColor: "var(--nk-border)" }}>
                <span>{recipe.title}</span>
                <span className="text-xs">{MATCH_BADGE[level]}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
