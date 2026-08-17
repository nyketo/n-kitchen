"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";

export default function PantryPage() {
  const items = useLiveQuery(() => db.pantry.toArray(), []) ?? [];

  async function toggle(id: number | undefined, inStock: boolean) {
    if (id != null) await db.pantry.update(id, { inStock: !inStock });
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl mb-1">Моят шкаф</h1>
      <p className="text-sm mb-6" style={{ color: "var(--nk-fg-soft)" }}>
        Подправки и основни продукти, които винаги имаш под ръка. Рецептите и AI ги предпочитат.
      </p>
      <ul className="grid sm:grid-cols-2 gap-2">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center rounded-xl border px-4 py-2.5 text-sm" style={{ borderColor: "var(--nk-border)" }}>
            <span style={{ opacity: item.inStock ? 1 : 0.4 }}>{item.name}</span>
            <button onClick={() => toggle(item.id, item.inStock)} className="text-xs px-2 py-1 rounded-full"
              style={{ background: item.inStock ? "var(--nk-olive)" : "var(--nk-bg-2)", color: item.inStock ? "#FBF3E7" : "var(--nk-fg-soft)" }}>
              {item.inStock ? "Наличен" : "Изчерпан"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
