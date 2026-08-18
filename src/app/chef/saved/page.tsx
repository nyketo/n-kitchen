"use client";

import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";

export default function SavedAiRecipesPage() {
  const saved = useLiveQuery(() => db.savedAiRecipes.orderBy("createdAt").reverse().toArray(), []) ?? [];

  async function remove(id?: number) {
    if (id == null) return;
    await db.savedAiRecipes.delete(id);
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto pb-20 md:pb-8">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display text-3xl">Запазени AI рецепти</h1>
        <Link href="/chef" className="text-xs px-3 py-2 rounded-full border" style={{ borderColor: "var(--nk-border)" }}>
          ← Моят готвач
        </Link>
      </div>
      <p className="text-xs mb-6" style={{ color: "var(--nk-fg-soft)" }}>
        Пазят се само на това устройство, офлайн, без облак.
      </p>

      {saved.length === 0 && (
        <p className="text-sm" style={{ color: "var(--nk-fg-soft)" }}>
          Все още нямаш запазени предложения от AI готвача. Отиди в &quot;Моят готвач&quot;, поискай рецепта и натисни &quot;Запази като моя рецепта&quot;.
        </p>
      )}

      <div className="space-y-4">
        {saved.map((s) => (
          <div key={s.id} className="rounded-2xl border p-4" style={{ borderColor: "var(--nk-border)", background: "var(--nk-card-bg)" }}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-display text-lg leading-snug">{s.title}</h3>
              <button onClick={() => remove(s.id)} className="text-xs shrink-0" style={{ color: "var(--nk-danger)" }}>
                Изтрий
              </button>
            </div>
            {s.prompt && (
              <p className="text-xs mb-2" style={{ color: "var(--nk-fg-soft)" }}>
                Въпрос: {s.prompt}
              </p>
            )}
            <p className="text-sm whitespace-pre-wrap">{s.text}</p>
            <p className="text-[11px] mt-3" style={{ color: "var(--nk-fg-soft)" }}>
              {new Date(s.createdAt).toLocaleDateString("bg-BG", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
