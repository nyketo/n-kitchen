"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { initialMerge, pushAll } from "@/lib/sync";

/**
 * Invisible background component. While the user is signed in, it:
 * - runs a one-time merge right after sign-in (cloud data wins if it exists,
 *   otherwise this device's local data is uploaded as the starting point),
 * - re-uploads all synced tables every 30s and whenever the tab is hidden
 *   (covers "closed the tab" / "phone locked" without needing a save button
 *   on every single page).
 * Does nothing at all if cloud sync isn't configured (`supabase` is null)
 * or the user isn't signed in — offline-only use is unaffected either way.
 */
export default function SyncEngine() {
  useEffect(() => {
    if (!supabase) return;

    let interval: ReturnType<typeof setInterval> | null = null;

    function startInterval() {
      if (interval) return;
      interval = setInterval(() => {
        void pushAll();
      }, 30_000);
    }

    function stopInterval() {
      if (interval) clearInterval(interval);
      interval = null;
    }

    function onVisibilityChange() {
      if (document.visibilityState === "hidden") void pushAll();
    }

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        if (event === "SIGNED_IN") void initialMerge();
        startInterval();
      } else {
        stopInterval();
      }
    });

    supabase.auth.getUser().then(({ data }) => {
      if (data.user) startInterval();
    });

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("beforeunload", () => void pushAll());

    return () => {
      stopInterval();
      sub.subscription.unsubscribe();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return null;
}
