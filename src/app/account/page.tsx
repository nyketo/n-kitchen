"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { initialMerge, pushAll } from "@/lib/sync";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [step, setStep] = useState<"enterEmail" | "enterCode">("enterEmail");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "verifying" | "codeError">("idle");
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "done" | "error">("idle");
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoadingUser(false);
      return;
    }
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoadingUser(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Sends a one-time 6-digit code by email. We deliberately verify it in-place
  // with verifyOtp() below rather than relying on the email's link: on iPhone,
  // tapping a link opens whatever browser is set as default (often not the
  // one N Kitchen is installed/running in, especially as a home-screen app),
  // so the sign-in would "complete" in the wrong app and this app would stay
  // signed out. Typing the code back into the same app avoids that entirely.
  async function sendCode() {
    if (!supabase || !email.trim()) return;
    setStatus("sending");
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { shouldCreateUser: true },
    });
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("sent");
    setStep("enterCode");
  }

  async function confirmCode() {
    if (!supabase || !code.trim()) return;
    setStatus("verifying");
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: "email",
    });
    if (error) {
      setStatus("codeError");
      return;
    }
    setStatus("idle");
    setCode("");
  }

  async function signOut() {
    await supabase?.auth.signOut();
    setStep("enterEmail");
    setStatus("idle");
    setEmail("");
    setCode("");
  }

  async function syncNow() {
    setSyncStatus("syncing");
    try {
      await initialMerge();
      await pushAll();
      setSyncStatus("done");
    } catch {
      setSyncStatus("error");
    }
  }

  if (!supabase) {
    return (
      <div className="p-4 md:p-8 max-w-lg mx-auto pb-20 md:pb-8">
        <h1 className="font-display text-3xl mb-4">Синхронизация в облака</h1>
        <p className="text-sm" style={{ color: "var(--nk-fg-soft)" }}>
          Облачната синхронизация още не е активна на този деплой (липсват настройките за връзка). N Kitchen работи напълно нормално и офлайн, без нея.
        </p>
      </div>
    );
  }

  if (loadingUser) return null;

  return (
    <div className="p-4 md:p-8 max-w-lg mx-auto pb-20 md:pb-8">
      <h1 className="font-display text-3xl mb-1">Синхронизация в облака</h1>
      <p className="text-xs mb-6" style={{ color: "var(--nk-fg-soft)" }}>
        По желание — за достъп до твоите рецепти, любими и бележки от повече от едно устройство. Без вход всичко продължава да работи офлайн, само на това устройство.
      </p>

      {!user && step === "enterEmail" && (
        <div className="rounded-2xl border p-4" style={{ borderColor: "var(--nk-border)", background: "var(--nk-card-bg)" }}>
          <p className="text-sm mb-3">Влез с имейл — ще ти изпратим код за вход, без парола.</p>
          <div className="flex gap-2 mb-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="твоят имейл"
              className="flex-1 rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: "var(--nk-border)", background: "var(--nk-bg-2)" }}
            />
            <button
              onClick={sendCode}
              disabled={status === "sending" || !email.trim()}
              className="px-4 py-2 rounded-lg text-sm font-semibold"
              style={{ background: "var(--nk-ember)", color: "#FBF3E7" }}
            >
              Изпрати код
            </button>
          </div>
          {status === "error" && (
            <p className="text-xs" style={{ color: "var(--nk-danger)" }}>
              Нещо се обърка при изпращането. Провери дали имейлът е верен и опитай отново.
            </p>
          )}
        </div>
      )}

      {!user && step === "enterCode" && (
        <div className="rounded-2xl border p-4" style={{ borderColor: "var(--nk-border)", background: "var(--nk-card-bg)" }}>
          <p className="text-sm mb-1">
            ✓ Изпратихме код за вход на <strong>{email}</strong>
          </p>
          <p className="text-xs mb-3" style={{ color: "var(--nk-fg-soft)" }}>
            Отвори пощата си и въведи кода тук долу — не е нужно да отваряш никакъв линк или друго приложение.
          </p>
          <div className="flex gap-2 mb-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 10))}
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="код от имейла"
              className="flex-1 rounded-lg border px-3 py-2 text-sm tracking-[0.3em] text-center font-semibold"
              style={{ borderColor: "var(--nk-border)", background: "var(--nk-bg-2)" }}
            />
            <button
              onClick={confirmCode}
              disabled={status === "verifying" || code.trim().length < 4}
              className="px-4 py-2 rounded-lg text-sm font-semibold"
              style={{ background: "var(--nk-olive)", color: "#FBF3E7" }}
            >
              Потвърди
            </button>
          </div>
          {status === "codeError" && (
            <p className="text-xs mb-2" style={{ color: "var(--nk-danger)" }}>
              Кодът е грешен или изтекъл. Провери го отново или поискай нов.
            </p>
          )}
          <button
            onClick={() => { setStep("enterEmail"); setStatus("idle"); setCode(""); }}
            className="text-xs underline"
            style={{ color: "var(--nk-fg-soft)" }}
          >
            Промени имейла или изпрати нов код
          </button>
        </div>
      )}

      {user && (
        <div className="rounded-2xl border p-4" style={{ borderColor: "var(--nk-border)", background: "var(--nk-card-bg)" }}>
          <p className="text-sm mb-1">
            Вписан като <strong>{user.email}</strong>
          </p>
          <p className="text-xs mb-4" style={{ color: "var(--nk-fg-soft)" }}>
            Данните ти се качват автоматично на всеки 30 сек, докато N Kitchen е отворен. Може и ръчно:
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              onClick={syncNow}
              disabled={syncStatus === "syncing"}
              className="px-4 py-2 rounded-lg text-sm font-semibold"
              style={{ background: "var(--nk-olive)", color: "#FBF3E7" }}
            >
              {syncStatus === "syncing" ? "Синхронизирам…" : "Синхронизирай сега"}
            </button>
            <button
              onClick={signOut}
              className="px-4 py-2 rounded-lg text-sm border"
              style={{ borderColor: "var(--nk-border)" }}
            >
              Изход
            </button>
          </div>
          {syncStatus === "done" && (
            <p className="text-xs" style={{ color: "var(--nk-olive)" }}>✓ Синхронизирано.</p>
          )}
          {syncStatus === "error" && (
            <p className="text-xs" style={{ color: "var(--nk-danger)" }}>Синхронизацията не успя — провери връзката и опитай пак.</p>
          )}
        </div>
      )}
    </div>
  );
}
