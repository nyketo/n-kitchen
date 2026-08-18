"use client";

import { useState } from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { ALL_RECIPES } from "@/data/recipes";

interface ChatMsg { role: "user" | "assistant" | "system"; text: string; prompt?: string; saved?: boolean; }

export default function ChefPage() {
  const prefs = useLiveQuery(() => db.preferences.toCollection().first(), []);
  const fridge = useLiveQuery(() => db.fridge.toArray(), []) ?? [];
  const usageRows = useLiveQuery(() => db.aiUsage.toArray(), []) ?? [];
  const savedCount = useLiveQuery(() => db.savedAiRecipes.count(), []) ?? 0;
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
        setMessages((m) => [...m, { role: "assistant", text: data.reply, prompt }]);
        await db.aiUsage.add({ month, costEUR: data.usage?.estCostEUR ?? 0, requests: 1 });
      }
    } catch {
      setMessages((m) => [...m, { role: "system", text: "Мрежова грешка при връзка с AI бекенда." }]);
    } finally {
      setLoading(false);
    }
  }

  async function saveMessage(index: number) {
    const msg = messages[index];
    if (msg.role !== "assistant") return;
    const title = (msg.prompt ?? msg.text).slice(0, 60);
    // Timestamping on user-initiated save (click handler), not during render — safe impurity.
    // eslint-disable-next-line react-hooks/purity
    const createdAt = Date.now();
    await db.savedAiRecipes.add({ title, prompt: msg.prompt ?? "", text: msg.text, createdAt });
    setMessages((m) => m.map((mm, i) => (i === index ? { ...mm, saved: true } : mm)));
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto flex flex-col h-[calc(100vh-2rem)] md:h-screen">
      <div className="flex items-start justify-between gap-3 mb-1">
        <h1 className="font-display text-3xl">Моят готвач</h1>
        <Link href="/chef/saved" className="text-xs px-3 py-2 rounded-full border shrink-0" style={{ borderColor: "var(--nk-border)" }}>
          Запазени ({savedCount})
        </Link>
      </div>
      <p className="text-xs mb-4" style={{ color: "var(--nk-fg-soft)" }}>
        AI usage this month: €{usedThisMonth.toFixed(2)} / €{budget.toFixed(2)}
        {overBudget && " — лимитът е достигнат"}
      </p>

      <div className="flex-1 overflow-y-auto nk-scrollbar space-y-3 mb-4">
        {messages.map((m, i) => (
          <div key={i} className="max-w-[85%]" style={{ marginLeft: m.role === "user" ? "auto" : 0 }}>
            <div className="text-sm rounded-2xl px-4 py-3"
              style={{
                background: m.role === "user" ? "var(--nk-ember)" : m.role === "system" ? "var(--nk-bg-2)" : "var(--nk-card-bg)",
                color: m.role === "user" ? "#FBF3E7" : "var(--nk-fg)",
                border: m.role !== "user" ? "1px solid var(--nk-border)" : undefined,
              }}>
              {m.text}
            </div>
            {m.role === "assistant" && (
              <button
                onClick={() => saveMessage(i)}
                disabled={m.saved}
                className="mt-1.5 text-xs px-3 py-1.5 rounded-full border"
                style={{ borderColor: "var(--nk-border)", color: m.saved ? "var(--nk-olive)" : "var(--nk-fg-soft)" }}
              >
                {m.saved ? "✓ Запазено" : "Запази като моя рецепта"}
              </button>
            )}
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
