"use client";

import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { ALL_RECIPES } from "@/data/recipes";

interface ChatMsg { role: "user" | "assistant" | "system"; text: string; }

export default function ChefPage() {
  const prefs = useLiveQuery(() => db.preferences.toCollection().first(), []);
  const fridge = useLiveQuery(() => db.fridge.toArray(), []) ?? [];
  const usageRows = useLiveQuery(() => db.aiUsage.toArray(), []) ?? [];
  const month = new Date().toISOString().slice(0, 7);
  const usedThisMonth = usageRows.filter((u) => u.month === month).reduce((s, u) => s + u.costEUR, 0);
  const budget = prefs?.aiBudgetEUR ?? 3;
  const overBudget = usedThisMonth >= budget;

  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "system", text: "Моят готвач ползва AI само след изрично действие от твоя страна — никога автоматично." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send(prompt: string) {
    if (overBudget) {
      setMessages((m) => [...m, { role: "system", text: `Достигнат е месечният AI лимит (€${budget}). Останалата част от N Kitchen продължава да работи нормално.` }]);
      return;
    }
    setMessages((m) => [...m, { role: "user", text: prompt }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chef", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          context: {
            fridge: fridge.map((f) => f.name),
            preferences: prefs,
            favoriteRecipeTitles: ALL_RECIPES.slice(0, 5).map((r) => r.title),
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages((m) => [...m, { role: "system", text: data.message ?? "AI не е достъпен в момента." }]);
      } else {
        setMessages((m) => [...m, { role: "assistant", text: data.reply }]);
        await db.aiUsage.add({ month, costEUR: data.usage?.estCostEUR ?? 0, requests: 1 });
      }
    } catch {
      setMessages((m) => [...m, { role: "system", text: "Мрежова грешка при връзка с AI бекенда." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto flex flex-col h-[calc(100vh-2rem)] md:h-screen">
      <h1 className="font-display text-3xl mb-1">Моят готвач</h1>
      <p className="text-xs mb-4" style={{ color: "var(--nk-fg-soft)" }}>
        AI usage this month: €{usedThisMonth.toFixed(2)} / €{budget.toFixed(2)}
        {overBudget && " — лимитът е достигнат"}
      </p>

      <div className="flex-1 overflow-y-auto nk-scrollbar space-y-3 mb-4">
        {messages.map((m, i) => (
          <div key={i} className="text-sm rounded-2xl px-4 py-3 max-w-[85%]"
            style={{
              marginLeft: m.role === "user" ? "auto" : 0,
              background: m.role === "user" ? "var(--nk-ember)" : m.role === "system" ? "var(--nk-bg-2)" : "var(--nk-card-bg)",
              color: m.role === "user" ? "#FBF3E7" : "var(--nk-fg)",
              border: m.role !== "user" ? "1px solid var(--nk-border)" : undefined,
            }}>
            {m.text}
          </div>
        ))}
        {loading && <div className="text-xs" style={{ color: "var(--nk-fg-soft)" }}>Моят готвач мисли…</div>}
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <ActionButton label="ПОПИТАЙ AI" onClick={() => input.trim() && send(input)} />
        <ActionButton label="СЪЗДАЙ РЕЦЕПТА С AI" onClick={() => send("Създай нова рецепта според моите предпочитания и наличности.")} />
        <ActionButton label="АДАПТИРАЙ РЕЦЕПТА С AI" onClick={() => send("Адаптирай последно споменатата рецепта според моите правила.")} />
      </div>

      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && input.trim()) { send(input); setInput(""); } }}
          placeholder="Напр. „Имам свински врат, направи го за 700 g“"
          className="flex-1 rounded-xl border px-4 py-3 text-sm" style={{ borderColor: "var(--nk-border)", background: "var(--nk-card-bg)" }} />
        <button onClick={() => { if (input.trim()) { send(input); setInput(""); } }}
          className="px-5 py-3 rounded-xl text-sm font-semibold" style={{ background: "var(--nk-ember)", color: "#FBF3E7" }}>
          Изпрати
        </button>
      </div>
    </div>
  );
}

function ActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="px-3 py-2 rounded-full text-xs border"
      style={{ borderColor: "var(--nk-border)" }}>
      {label}
    </button>
  );
}
