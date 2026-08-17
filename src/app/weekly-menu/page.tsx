"use client";

import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, type WeeklyMenuDay } from "@/lib/db";
import { ALL_RECIPES, getRecipeById } from "@/data/recipes";

const DAYS = ["Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота", "Неделя"];

export default function WeeklyMenuPage() {
  const rows = useLiveQuery(() => db.weeklyMenu.toArray(), []) ?? [];
  const byDay = new Map(rows.map((r) => [r.day, r]));

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="font-display text-3xl mb-1">Седмично меню</h1>
      <p className="text-sm mb-6" style={{ color: "var(--nk-fg-soft)" }}>7 дни. За всеки ден избери OMAD или 16:8 и рецепти.</p>

      <div className="space-y-4">
        {DAYS.map((day) => (
          <DayRow key={day} day={day} data={byDay.get(day)} />
        ))}
      </div>
    </div>
  );
}

function DayRow({ day, data }: { day: string; data?: WeeklyMenuDay }) {
  const [picking, setPicking] = useState(false);
  const mode = data?.mode ?? "OMAD";
  const recipeIds = data?.recipeIds ?? [];

  async function setMode(m: "OMAD" | "16:8") {
    await db.weeklyMenu.put({ day, mode: m, recipeIds });
  }

  async function addRecipe(id: string) {
    await db.weeklyMenu.put({ day, mode, recipeIds: [...recipeIds, id] });
    setPicking(false);
  }

  async function removeRecipe(id: string) {
    await db.weeklyMenu.put({ day, mode, recipeIds: recipeIds.filter((r) => r !== id) });
  }

  return (
    <div className="rounded-2xl border p-4" style={{ borderColor: "var(--nk-border)", background: "var(--nk-card-bg)" }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-lg">{day}</h3>
        <div className="flex gap-1">
          {(["OMAD", "16:8"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)} className="px-3 py-1 rounded-full text-xs border"
              style={{ borderColor: "var(--nk-border)", background: mode === m ? "var(--nk-ember)" : "transparent", color: mode === m ? "#FBF3E7" : "var(--nk-fg)" }}>
              {m}
            </button>
          ))}
        </div>
      </div>
      <ul className="space-y-1 mb-2">
        {recipeIds.map((id) => {
          const r = getRecipeById(id);
          if (!r) return null;
          return (
            <li key={id} className="flex justify-between text-sm">
              <span>{r.title}</span>
              <button onClick={() => removeRecipe(id)} className="text-xs" style={{ color: "var(--nk-danger)" }}>премахни</button>
            </li>
          );
        })}
      </ul>
      {picking ? (
        <select autoFocus onChange={(e) => e.target.value && addRecipe(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 text-sm" style={{ borderColor: "var(--nk-border)" }}>
          <option value="">Избери рецепта…</option>
          {ALL_RECIPES.map((r) => <option key={r.id} value={r.id}>{r.title}</option>)}
        </select>
      ) : (
        <button onClick={() => setPicking(true)} className="text-xs" style={{ color: "var(--nk-ember)" }}>+ добави рецепта</button>
      )}
    </div>
  );
}
