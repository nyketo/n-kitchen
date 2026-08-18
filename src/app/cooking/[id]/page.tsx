"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { getRecipeById } from "@/data/recipes";
import { METHOD_LABELS } from "@/lib/labels";
import { db } from "@/lib/db";

export default function CookingModePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const recipe = getRecipeById(id);
  const search = useSearchParams();
  const router = useRouter();

  const methodParam = search.get("method");
  const method = recipe?.methods.find((m) => m.method === methodParam) ?? recipe?.methods[0];

  const [stepIdx, setStepIdx] = useState(0);
  const [finished, setFinished] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  const step = method?.steps[stepIdx];

  useEffect(() => {
    // Resetting the timer when the step changes is an intentional external-state
    // reset (matches React's documented "adjust state on prop change" pattern).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSeconds(step?.minutes ? step.minutes * 60 : 0);
    setRunning(false);
  }, [stepIdx, step?.minutes]);

  useEffect(() => {
    if (!running) return;
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [running, seconds]);

  useEffect(() => {
    (async () => {
      try {
        if ("wakeLock" in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request("screen");
        }
      } catch { /* Wake Lock not supported — ignore */ }
    })();
    return () => { wakeLockRef.current?.release().catch(() => {}); };
  }, []);

  if (!recipe || !method) return notFound();

  const isLast = stepIdx === method.steps.length - 1;
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  async function finish() {
    setFinished(true);
  }

  if (finished) {
    return <FinishScreen recipeId={id} onDone={() => router.push(`/recipes/${id}`)} />;
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col p-6 md:p-12 overflow-y-auto"
      style={{ background: "var(--nk-bg)", paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm" style={{ color: "var(--nk-fg-soft)" }}>
          {METHOD_LABELS[method.method]} · Стъпка {stepIdx + 1}/{method.steps.length}
        </span>
        <button onClick={() => router.back()} className="text-sm" style={{ color: "var(--nk-fg-soft)" }}>Изход ✕</button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
        <p className="font-display text-3xl md:text-6xl leading-tight max-w-3xl">{step?.text}</p>

        {(step?.tempC || step?.minutes) && (
          <div className="flex gap-8">
            {step?.tempC && (
              <div>
                <div className="font-display text-4xl md:text-6xl">{step.tempC}°C</div>
                <div className="text-xs uppercase mt-1" style={{ color: "var(--nk-fg-soft)" }}>температура</div>
              </div>
            )}
            {step?.minutes ? (
              <div>
                <div className="font-display text-4xl md:text-6xl tabular-nums">{mm}:{ss}</div>
                <div className="text-xs uppercase mt-1" style={{ color: "var(--nk-fg-soft)" }}>таймер</div>
              </div>
            ) : null}
          </div>
        )}

        {step?.minutes ? (
          <button
            onClick={() => setRunning((r) => !r)}
            className="px-6 py-3 rounded-full text-sm font-semibold border"
            style={{ borderColor: "var(--nk-border)" }}
          >
            {running ? "ПАУЗА" : "СТАРТ ТАЙМЕР"}
          </button>
        ) : null}

        {!isLast && method.steps[stepIdx + 1] && (
          <p className="text-sm opacity-60 max-w-xl">Следва: {method.steps[stepIdx + 1].text}</p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 mt-6">
        <button
          disabled={stepIdx === 0}
          onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
          className="flex-1 py-4 rounded-2xl text-sm font-semibold border disabled:opacity-30"
          style={{ borderColor: "var(--nk-border)" }}
        >
          НАЗАД
        </button>
        {isLast ? (
          <button onClick={finish} className="flex-[2] py-4 rounded-2xl text-sm font-semibold"
            style={{ background: "var(--nk-olive)", color: "#FBF3E7" }}>
            ГОТОВО
          </button>
        ) : (
          <button onClick={() => setStepIdx((i) => i + 1)} className="flex-[2] py-4 rounded-2xl text-sm font-semibold"
            style={{ background: "var(--nk-ember)", color: "#FBF3E7" }}>
            СЛЕДВАЩА СТЪПКА
          </button>
        )}
      </div>
    </div>
  );
}

function FinishScreen({ recipeId, onDone }: { recipeId: string; onDone: () => void }) {
  const [stars, setStars] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const options = ["Perfect", "Too dry", "More sauce", "Softer", "Less salt", "More spicy"];

  function toggle(tag: string) {
    setTags((t) => (t.includes(tag) ? t.filter((x) => x !== tag) : [...t, tag]));
  }

  async function save() {
    await db.ratings.put({ recipeId, stars, quickTags: tags, updatedAt: Date.now() });
    onDone();
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-8 text-center gap-6 overflow-y-auto"
      style={{ background: "var(--nk-bg)", paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}
    >
      <h1 className="font-display text-3xl">Как се получи?</h1>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <button key={s} onClick={() => setStars(s)} className="text-4xl">{stars >= s ? "★" : "☆"}</button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 justify-center max-w-md">
        {options.map((tag) => (
          <button key={tag} onClick={() => toggle(tag)} className="px-3 py-1.5 rounded-full text-xs border"
            style={{ borderColor: "var(--nk-border)", background: tags.includes(tag) ? "var(--nk-ochre)" : "transparent" }}>
            {tag}
          </button>
        ))}
      </div>
      <button onClick={save} className="px-6 py-3 rounded-full text-sm font-semibold" style={{ background: "var(--nk-ember)", color: "#FBF3E7" }}>
        Запази и приключи
      </button>
    </div>
  );
}
