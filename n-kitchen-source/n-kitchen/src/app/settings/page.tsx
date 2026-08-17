"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db, DEFAULT_PREFERENCES, type UserPreferences } from "@/lib/db";
import { INGREDIENTS } from "@/data/ingredients";
import { applyTheme } from "@/components/AppShell";
import { useState } from "react";

export default function SettingsPage() {
  const prefs = useLiveQuery(() => db.preferences.toCollection().first(), []);
  const usageRows = useLiveQuery(() => db.aiUsage.toArray(), []) ?? [];
  const month = new Date().toISOString().slice(0, 7);
  const usedThisMonth = usageRows.filter((u) => u.month === month).reduce((s, u) => s + u.costEUR, 0);
  const [importMsg, setImportMsg] = useState("");

  if (!prefs) return null;

  async function update(patch: Partial<UserPreferences>) {
    if (prefs?.id != null) await db.preferences.update(prefs.id, patch);
  }

  async function setIngredientStatus(id: string, status: "blocked" | "not-preferred" | "favorite" | "none") {
    const next = { ...prefs!.ingredientStatus };
    if (status === "none") delete next[id];
    else next[id] = status;
    await update({ ingredientStatus: next });
  }

  async function exportData() {
    const data = {
      preferences: prefs,
      favorites: await db.favorites.toArray(),
      ratings: await db.ratings.toArray(),
      notes: await db.notes.toArray(),
      fridge: await db.fridge.toArray(),
      pantry: await db.pantry.toArray(),
      shopping: await db.shopping.toArray(),
      weeklyMenu: await db.weeklyMenu.toArray(),
      personalProducts: await db.personalProducts.toArray(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `n-kitchen-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function importData(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (data.favorites) await db.favorites.bulkPut(data.favorites);
      if (data.ratings) await db.ratings.bulkPut(data.ratings);
      if (data.notes) await db.notes.bulkPut(data.notes);
      if (data.fridge) await db.fridge.bulkPut(data.fridge);
      if (data.pantry) await db.pantry.bulkPut(data.pantry);
      if (data.weeklyMenu) await db.weeklyMenu.bulkPut(data.weeklyMenu);
      setImportMsg("Данните са възстановени успешно.");
    } catch {
      setImportMsg("Възстановяването се провали — невалиден файл.");
    }
  }

  const blockedDefaults = ["mushrooms", "eggplant", "turkey", "olives"];

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-10">
      <h1 className="font-display text-3xl">Настройки</h1>

      <Section title="Изглед">
        <div className="flex gap-2">
          {(["light", "dark", "system"] as const).map((t) => (
            <button key={t} onClick={() => { update({ theme: t }); applyTheme(t); }}
              className="px-4 py-2 rounded-full text-xs border"
              style={{ borderColor: "var(--nk-border)", background: prefs.theme === t ? "var(--nk-ember)" : "transparent", color: prefs.theme === t ? "#FBF3E7" : "var(--nk-fg)" }}>
              {t === "light" ? "Светло" : t === "dark" ? "Тъмно" : "Системно"}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Език и регион">
        <div className="flex gap-2 mb-2">
          {(["bg", "de", "en"] as const).map((l) => (
            <button key={l} onClick={() => update({ language: l })} className="px-4 py-2 rounded-full text-xs border"
              style={{ borderColor: "var(--nk-border)", background: prefs.language === l ? "var(--nk-ember)" : "transparent", color: prefs.language === l ? "#FBF3E7" : "var(--nk-fg)" }}>
              {l === "bg" ? "🇧🇬 Български" : l === "de" ? "🇩🇪 Deutsch" : "🇬🇧 English"}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {(["bg", "de"] as const).map((r) => (
            <button key={r} onClick={() => update({ region: r })} className="px-4 py-2 rounded-full text-xs border"
              style={{ borderColor: "var(--nk-border)", background: prefs.region === r ? "var(--nk-ember)" : "transparent", color: prefs.region === r ? "#FBF3E7" : "var(--nk-fg)" }}>
              {r === "bg" ? "🇧🇬 Bulgaria" : "🇩🇪 Germany"}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Хранителни цели">
        <label className="block text-xs mb-1" style={{ color: "var(--nk-fg-soft)" }}>Protein target (g)</label>
        <input type="number" defaultValue={prefs.proteinTargetG} onBlur={(e) => update({ proteinTargetG: Number(e.target.value) })}
          className="rounded-lg border px-3 py-2 text-sm mb-3 w-full" style={{ borderColor: "var(--nk-border)" }} />
        <label className="block text-xs mb-1" style={{ color: "var(--nk-fg-soft)" }}>Net carbohydrate limit (g)</label>
        <input type="number" defaultValue={prefs.netCarbLimitG} onBlur={(e) => update({ netCarbLimitG: Number(e.target.value) })}
          className="rounded-lg border px-3 py-2 text-sm w-full" style={{ borderColor: "var(--nk-border)" }} />
      </Section>

      <Section title="Food Preferences">
        <p className="text-xs mb-3" style={{ color: "var(--nk-fg-soft)" }}>
          Гъби, патладжан, пуешко и маслини са трайно блокирани в N Kitchen и не могат да бъдат разблокирани.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {blockedDefaults.map((id) => (
            <span key={id} className="px-3 py-1.5 rounded-full text-xs" style={{ background: "var(--nk-danger)", color: "#FBF3E7" }}>
              {id === "mushrooms" ? "Гъби" : id === "eggplant" ? "Патладжан" : id === "turkey" ? "Пуешко" : "Маслини"} — блокирано
            </span>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-1.5 max-h-80 overflow-y-auto nk-scrollbar">
          {INGREDIENTS.map((ing) => {
            const status = prefs.ingredientStatus[ing.id] ?? "none";
            return (
              <div key={ing.id} className="flex items-center justify-between rounded-lg border px-3 py-1.5 text-xs" style={{ borderColor: "var(--nk-border)" }}>
                <span>{ing.name_bg}</span>
                <select value={status} onChange={(e) => setIngredientStatus(ing.id, e.target.value as "blocked" | "not-preferred" | "favorite" | "none")}
                  className="rounded border px-1.5 py-0.5 text-[11px]" style={{ borderColor: "var(--nk-border)" }}>
                  <option value="none">—</option>
                  <option value="favorite">Favorite</option>
                  <option value="not-preferred">Not preferred</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Седмична честота">
        {(["fish", "pork", "chicken", "beef"] as const).map((k) => (
          <div key={k} className="flex items-center justify-between mb-2">
            <span className="text-sm capitalize">{k}</span>
            <input type="number" min={0} max={7} defaultValue={prefs.weeklyFrequency[k]}
              onBlur={(e) => update({ weeklyFrequency: { ...prefs.weeklyFrequency, [k]: Number(e.target.value) } })}
              className="w-16 rounded-lg border px-2 py-1 text-sm text-center" style={{ borderColor: "var(--nk-border)" }} />
          </div>
        ))}
      </Section>

      <Section title="Моята фурна / котлон">
        <label className="flex items-center gap-2 text-sm mb-3">
          <input type="checkbox" checked={prefs.oven.fan} onChange={(e) => update({ oven: { ...prefs.oven, fan: e.target.checked } })} />
          Вентилатор (Fan)
        </label>
        <label className="block text-xs mb-1" style={{ color: "var(--nk-fg-soft)" }}>Тип котлон</label>
        <select value={prefs.hob.type} onChange={(e) => update({ hob: { ...prefs.hob, type: e.target.value as typeof prefs.hob.type } })}
          className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: "var(--nk-border)" }}>
          <option value="induction">Индукция</option><option value="ceramic">Керамичен</option>
          <option value="electric">Електрически</option><option value="gas">Газ</option>
        </select>
      </Section>

      <Section title="AI Budget">
        <div className="flex gap-2 mb-3">
          {[1, 3, 5, 10].map((v) => (
            <button key={v} onClick={() => update({ aiBudgetEUR: v })} className="px-4 py-2 rounded-full text-xs border"
              style={{ borderColor: "var(--nk-border)", background: prefs.aiBudgetEUR === v ? "var(--nk-ember)" : "transparent", color: prefs.aiBudgetEUR === v ? "#FBF3E7" : "var(--nk-fg)" }}>
              €{v}
            </button>
          ))}
        </div>
        <p className="text-sm">AI usage this month: <strong>€{usedThisMonth.toFixed(2)} / €{prefs.aiBudgetEUR.toFixed(2)}</strong></p>
        <p className="text-xs mt-1" style={{ color: "var(--nk-fg-soft)" }}>
          Remaining: €{Math.max(0, prefs.aiBudgetEUR - usedThisMonth).toFixed(2)} · {usageRows.filter((u) => u.month === month).reduce((s, u) => s + u.requests, 0)} requests
        </p>
      </Section>

      <Section title="Costs">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-lg border px-3 py-2 flex justify-between" style={{ borderColor: "var(--nk-border)" }}><span>Hosting</span><span>FREE</span></div>
          <div className="rounded-lg border px-3 py-2 flex justify-between" style={{ borderColor: "var(--nk-border)" }}><span>Database</span><span>FREE</span></div>
          <div className="rounded-lg border px-3 py-2 flex justify-between" style={{ borderColor: "var(--nk-border)" }}><span>Storage</span><span>FREE</span></div>
          <div className="rounded-lg border px-3 py-2 flex justify-between" style={{ borderColor: "var(--nk-border)" }}>
            <span>AI</span><span>€{usedThisMonth.toFixed(2)} / €{prefs.aiBudgetEUR.toFixed(2)}</span>
          </div>
        </div>
      </Section>

      <Section title="Backup">
        <div className="flex gap-3 items-center flex-wrap">
          <button onClick={exportData} className="px-4 py-2 rounded-lg text-sm border" style={{ borderColor: "var(--nk-border)" }}>Export всички данни</button>
          <label className="px-4 py-2 rounded-lg text-sm border cursor-pointer" style={{ borderColor: "var(--nk-border)" }}>
            Import
            <input type="file" accept="application/json" onChange={importData} className="hidden" />
          </label>
        </div>
        {importMsg && <p className="text-xs mt-2" style={{ color: "var(--nk-fg-soft)" }}>{importMsg}</p>}
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl mb-3">{title}</h2>
      {children}
    </section>
  );
}

void DEFAULT_PREFERENCES;
