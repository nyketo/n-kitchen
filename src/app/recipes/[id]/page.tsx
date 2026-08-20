"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { getRecipeById } from "@/data/recipes";
import { INGREDIENT_MAP } from "@/data/ingredients";
import RecipeCover from "@/components/RecipeCover";
import { CATEGORY_LABELS, METHOD_LABELS } from "@/lib/labels";
import { db } from "@/lib/db";
import {
  recipeScaledNutrition, scaleIngredients, makeOmadIngredients, nutritionForIngredients,
  makeKetoAdaptedIngredients, isKetoFriendly, recipePerServing, KETO_NET_CARB_LIMIT_G,
} from "@/lib/nutrition";

export default function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const recipe = getRecipeById(id);
  const hasCuratedVariant = !!recipe?.ketoVariant;
  const [multiplier, setMultiplier] = useState(1);
  const [omad, setOmad] = useState(false);
  const [ketoAdapt, setKetoAdapt] = useState(false);
  // Only relevant when the recipe ships a curated ketoVariant (real rice/potato swapped
  // for cauliflower rice etc.) — "normal" shows the authentic dish, "keto" the adapted one.
  const [variant, setVariant] = useState<"normal" | "keto">("normal");
  const [methodIdx, setMethodIdx] = useState(0);

  const isFavorite = useLiveQuery(() => db.favorites.get(id), [id]);
  const rating = useLiveQuery(() => db.ratings.get(id), [id]);
  const notes = useLiveQuery(() => db.notes.where("recipeId").equals(id).toArray(), [id]);
  const [noteText, setNoteText] = useState("");

  const baseIngredients = useMemo(() => {
    if (!recipe) return [];
    return hasCuratedVariant && variant === "keto" ? recipe.ketoVariant!.ingredients : recipe.ingredients;
  }, [recipe, hasCuratedVariant, variant]);

  const displayedIngredients = useMemo(() => {
    if (!recipe) return [];
    if (omad) return makeOmadIngredients({ ...recipe, ingredients: baseIngredients });
    const base = !hasCuratedVariant && ketoAdapt ? makeKetoAdaptedIngredients(recipe) : baseIngredients;
    return scaleIngredients(base, multiplier);
  }, [recipe, baseIngredients, hasCuratedVariant, multiplier, omad, ketoAdapt]);

  if (!recipe) return notFound();

  const ketoFriendly = isKetoFriendly(recipe);
  const nutrition = omad || ketoAdapt || (hasCuratedVariant && variant === "keto")
    ? nutritionForIngredients(displayedIngredients)
    : recipeScaledNutrition(recipe, multiplier);
  const method = recipe.methods[methodIdx];

  async function toggleFavorite() {
    if (isFavorite) await db.favorites.delete(id);
    else await db.favorites.put({ recipeId: id, createdAt: Date.now() });
  }

  // Event-handler functions below run only on user interaction (click), never during
  // render, so timestamping with Date.now() here does not affect render purity.
  async function setStars(stars: number) {
    // eslint-disable-next-line react-hooks/purity
    const updatedAt = Date.now();
    await db.ratings.put({ recipeId: id, stars, quickTags: rating?.quickTags ?? [], updatedAt });
  }

  async function toggleQuickTag(tag: string) {
    const current = rating?.quickTags ?? [];
    const next = current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag];
    // eslint-disable-next-line react-hooks/purity
    const updatedAt = Date.now();
    await db.ratings.put({ recipeId: id, stars: rating?.stars ?? 0, quickTags: next, updatedAt });
  }

  async function saveNote() {
    if (!noteText.trim()) return;
    await db.notes.add({ recipeId: id, text: noteText.trim(), createdAt: Date.now() });
    setNoteText("");
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <RecipeCover category={recipe.category} title={recipe.title} className="h-56 rounded-3xl mb-6" />

      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="font-display text-3xl md:text-4xl leading-tight">{recipe.title}</h1>
        <button onClick={toggleFavorite} className="text-2xl shrink-0" aria-label="Favorite">
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>
      <p className="text-sm mb-4" style={{ color: "var(--nk-fg-soft)" }}>{recipe.description}</p>

      <div className="flex flex-wrap gap-1.5 text-[11px] mb-6">
        <Badge>{CATEGORY_LABELS[recipe.category]}</Badge>
        {hasCuratedVariant ? (
          variant === "keto" && (
            nutrition.netCarbs <= KETO_NET_CARB_LIMIT_G
              ? <Badge accent>KETO</Badge>
              : <Badge accent>LOW-CARB</Badge>
          )
        ) : (
          <>
            {recipe.dietType.includes("keto") && <Badge accent>{ketoFriendly ? "KETO" : "LOW-CARB"}</Badge>}
            {!recipe.dietType.includes("keto") && recipe.dietType.includes("low-carb") && <Badge accent>LOW-CARB</Badge>}
          </>
        )}
        {recipe.dairyFree && <Badge>БЕЗ МЛЕЧНИ</Badge>}
        {!recipe.dairyFree && <Badge>СЪДЪРЖА МЛЕЧНИ</Badge>}
        {recipe.omadCompatible && <Badge>OMAD подходящо</Badge>}
      </div>

      {hasCuratedVariant && (
        <div className="mb-4 rounded-xl border px-4 py-3" style={{ borderColor: "var(--nk-border)", background: "var(--nk-bg-2)" }}>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <button onClick={() => setVariant("normal")}
              className="px-4 py-2 rounded-full text-xs font-semibold border shrink-0"
              style={{
                borderColor: "var(--nk-border)",
                background: variant === "normal" ? "var(--nk-ember)" : "transparent",
                color: variant === "normal" ? "#FBF3E7" : "var(--nk-fg)",
              }}>
              НОРМАЛНА ВЕРСИЯ
            </button>
            <button onClick={() => setVariant("keto")}
              className="px-4 py-2 rounded-full text-xs font-semibold border shrink-0"
              style={{
                borderColor: "var(--nk-border)",
                background: variant === "keto" ? "var(--nk-olive)" : "transparent",
                color: variant === "keto" ? "#FBF3E7" : "var(--nk-fg)",
              }}>
              КЕТО / ЛОУ-КАРБ ВЕРСИЯ
            </button>
          </div>
          <p className="text-xs" style={{ color: "var(--nk-fg-soft)" }}>
            {variant === "keto"
              ? (recipe.ketoVariant?.note ?? "Адаптирана версия с намалени въглехидрати.")
              : "Автентичната българска рецепта, както се готви традиционно."}
          </p>
        </div>
      )}

      {!hasCuratedVariant && !recipe.noKetoAdapt && !ketoFriendly && !ketoAdapt && !omad && (
        <div className="mb-4 rounded-xl border px-4 py-3 text-xs flex items-center justify-between gap-3"
          style={{ borderColor: "var(--nk-border)", background: "var(--nk-bg-2)" }}>
          <span>
            При тези количества нетните въглехидрати са {recipePerServing(recipe).netCarbs} г на порция — над обичайния кето лимит.
          </span>
          <button onClick={() => { setKetoAdapt(true); setOmad(false); }}
            className="px-3 py-1.5 rounded-full font-semibold shrink-0"
            style={{ background: "var(--nk-olive)", color: "#FBF3E7" }}>
            АДАПТИРАЙ КЪМ КЕТО
          </button>
        </div>
      )}
      {!hasCuratedVariant && ketoAdapt && (
        <div className="mb-4 rounded-xl border px-4 py-3 text-xs flex items-center justify-between gap-3"
          style={{ borderColor: "var(--nk-border)", background: "var(--nk-bg-2)" }}>
          <span>
            ✓ Адаптирано — намалени зеленчуци, сега {nutrition.netCarbs} г нетни въглехидрати на порция.
          </span>
          <button onClick={() => setKetoAdapt(false)}
            className="px-3 py-1.5 rounded-full border shrink-0" style={{ borderColor: "var(--nk-border)" }}>
            Върни оригинала
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <Link
          href={`/cooking/${recipe.id}?method=${method?.method}&mult=${multiplier}`}
          className="px-6 py-3 rounded-full font-semibold text-sm"
          style={{ background: "var(--nk-ember)", color: "#FBF3E7" }}
        >
          ЗАПОЧНИ ГОТВЕНЕ
        </Link>
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((m) => (
            <button key={m} onClick={() => { setMultiplier(m); setOmad(false); }}
              className="w-9 h-9 rounded-full text-xs font-semibold border"
              style={{
                borderColor: "var(--nk-border)",
                background: !omad && multiplier === m ? "var(--nk-ember)" : "transparent",
                color: !omad && multiplier === m ? "#FBF3E7" : "var(--nk-fg)",
              }}>
              ×{m}
            </button>
          ))}
        </div>
      </div>

      {recipe.omadCompatible && (
        <button onClick={() => { setOmad((v) => !v); setKetoAdapt(false); }}
          className="mb-6 px-4 py-2 rounded-full text-xs font-semibold border"
          style={{
            borderColor: "var(--nk-border)",
            background: omad ? "var(--nk-olive)" : "transparent",
            color: omad ? "#FBF3E7" : "var(--nk-fg)",
          }}>
          {omad ? "✓ Направено за OMAD" : "НАПРАВИ ЗА OMAD"}
        </button>
      )}

      <section className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="font-display text-xl mb-3">Продукти</h2>
          <ul className="space-y-1.5 text-sm">
            {displayedIngredients.map((ri, i) => {
              const ing = INGREDIENT_MAP[ri.ingredientId];
              if (!ing) return null;
              const amount = ri.grams != null ? `${ri.grams} g` : ri.ml != null ? `${ri.ml} ml` : `${ri.pieces} бр.`;
              return (
                <li key={i} className="flex justify-between border-b pb-1.5" style={{ borderColor: "var(--nk-border)" }}>
                  <span>{ing.name_bg}{ri.note ? ` (${ri.note})` : ""}</span>
                  <span style={{ color: "var(--nk-fg-soft)" }}>{amount}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-xl mb-3">Хранителни стойности</h2>
          <div className="grid grid-cols-3 gap-2 text-center">
            <Stat label="ккал" value={nutrition.kcal} />
            <Stat label="протеин" value={`${nutrition.protein} г`} />
            <Stat label="мазнини" value={`${nutrition.fat} г`} />
            <Stat label="въглехидрати" value={`${nutrition.carbs} г`} />
            <Stat label="фибри" value={`${nutrition.fiber} г`} />
            <Stat label="нетни в-ди" value={`${nutrition.netCarbs} г`} />
          </div>
        </div>
      </section>

      {recipe.methods.length > 1 && (
        <div className="flex gap-2 mb-4">
          {recipe.methods.map((m, i) => (
            <button key={m.method} onClick={() => setMethodIdx(i)}
              className="px-3 py-1.5 rounded-full text-xs border"
              style={{
                borderColor: "var(--nk-border)",
                background: methodIdx === i ? "var(--nk-ember)" : "transparent",
                color: methodIdx === i ? "#FBF3E7" : "var(--nk-fg)",
              }}>
              {METHOD_LABELS[m.method]}{m.isBestResult ? " ★" : ""}
            </button>
          ))}
        </div>
      )}

      {method && (
        <section className="mb-8">
          <h2 className="font-display text-xl mb-3">Стъпки — {METHOD_LABELS[method.method]}</h2>
          <ol className="space-y-3">
            {method.steps.map((s, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0"
                  style={{ background: "var(--nk-bg-2)" }}>{i + 1}</span>
                <span>{s.text}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="mb-8">
        <h2 className="font-display text-xl mb-3">Как се получи?</h2>
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} onClick={() => setStars(s)} className="text-2xl">
              {(rating?.stars ?? 0) >= s ? "★" : "☆"}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {["Perfect", "Too dry", "More sauce", "Softer", "Less salt", "More spicy"].map((tag) => (
            <button key={tag} onClick={() => toggleQuickTag(tag)}
              className="px-3 py-1.5 rounded-full text-xs border"
              style={{
                borderColor: "var(--nk-border)",
                background: rating?.quickTags?.includes(tag) ? "var(--nk-ochre)" : "transparent",
              }}>
              {tag}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mb-3">
          <input value={noteText} onChange={(e) => setNoteText(e.target.value)}
            placeholder="Лична бележка…" className="flex-1 rounded-lg border px-3 py-2 text-sm"
            style={{ borderColor: "var(--nk-border)", background: "var(--nk-card-bg)" }} />
          <button onClick={saveNote} className="px-4 py-2 rounded-lg text-sm border" style={{ borderColor: "var(--nk-border)" }}>Запази</button>
        </div>
        <ul className="space-y-1 text-sm">
          {notes?.map((n) => <li key={n.id} style={{ color: "var(--nk-fg-soft)" }}>· {n.text}</li>)}
        </ul>
      </section>
    </div>
  );
}

function Badge({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span className="px-2 py-0.5 rounded-full" style={{ background: "var(--nk-bg-2)", color: accent ? "var(--nk-olive)" : undefined }}>
      {children}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border py-3" style={{ borderColor: "var(--nk-border)" }}>
      <div className="font-display text-lg">{value}</div>
      <div className="text-[10px] uppercase" style={{ color: "var(--nk-fg-soft)" }}>{label}</div>
    </div>
  );
}
