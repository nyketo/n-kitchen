"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { ensurePantry, ensurePreferences } from "@/lib/db";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const prefs = await ensurePreferences();
      await ensurePantry();
      applyTheme(prefs.theme);
      setReady(true);
    })();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return (
    <div className="flex min-h-screen" style={{ background: "var(--nk-bg)" }}>
      <Sidebar />
      <main className="flex-1 min-w-0 nk-scrollbar pb-24 md:pb-0">
        {ready ? children : <div className="p-8 text-sm" style={{ color: "var(--nk-fg-soft)" }}>N Kitchen се зарежда…</div>}
      </main>
    </div>
  );
}

export function applyTheme(theme: "light" | "dark" | "system") {
  const root = document.documentElement;
  const resolved = theme === "system"
    ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : theme;
  root.classList.toggle("dark", resolved === "dark");
}
