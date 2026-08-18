"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

// A handful of Unicode symbols (⚡ ☁ ✳) render as colorful emoji on iOS
// regardless of text-presentation hints, breaking the thin-line icon look
// of the rest of the nav. Those three use small inline SVGs instead —
// guaranteed monochrome on every platform. Everything else keeps using a
// plain text glyph, since those render consistently fine.
const NAV = [
  { href: "/", label: "Начало", icon: "⌂" },
  { href: "/recipes", label: "Рецепти", icon: "▤" },
  { href: "/cook4me", label: "Cook4me", icon: "◍" },
  { href: "/quick", label: "Набързо", icon: <BoltIcon /> },
  { href: "/weekly-menu", label: "Седмично меню", icon: "▦" },
  { href: "/fridge", label: "Моят хладилник", icon: "▢" },
  { href: "/shopping", label: "Пазаруване", icon: "☰" },
  { href: "/favorites", label: "Любими", icon: "♥" },
  { href: "/chef", label: "Моят готвач", icon: <SparkleIcon /> },
  { href: "/account", label: "Профил", icon: <CloudIcon /> },
  { href: "/settings", label: "Настройки", icon: "⚙" },
];

// Primary items always visible in the mobile bottom bar. Everything else lives behind "Още".
const MOBILE_PRIMARY = ["/", "/recipes", "/chef", "/fridge"];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [moreOpen, setMoreOpen] = useState(false);

  const primaryItems = NAV.filter((i) => MOBILE_PRIMARY.includes(i.href));
  const moreItems = NAV.filter((i) => !MOBILE_PRIMARY.includes(i.href));

  function go(href: string) {
    setMoreOpen(false);
    router.push(href);
  }

  return (
    <>
      {/* Desktop / tablet sidebar */}
      <aside
        className="hidden md:flex md:flex-col md:w-56 lg:w-64 shrink-0 border-r nk-scrollbar overflow-y-auto"
        style={{ background: "var(--nk-bg-2)", borderColor: "var(--nk-border)" }}
      >
        <Logo />
        <nav className="flex-1 px-3 py-2 space-y-0.5">
          {NAV.map((item) => (
            <NavLink key={item.href} item={item} active={isActive(pathname, item.href)} />
          ))}
        </nav>
        <div className="p-4 text-xs" style={{ color: "var(--nk-fg-soft)" }}>
          €0 разход · офлайн готов
        </div>
      </aside>

      {/* Mobile "more" sheet — covers every nav item that doesn't fit in the bottom bar */}
      {moreOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end" onClick={() => setMoreOpen(false)}>
          <div className="absolute inset-0" style={{ background: "rgba(20,12,6,0.45)" }} />
          <div
            className="relative w-full rounded-t-3xl border-t p-4 pb-8 grid grid-cols-3 gap-3"
            style={{ background: "var(--nk-card-bg)", borderColor: "var(--nk-border)", paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="col-span-3 flex items-center justify-between mb-1">
              <span className="font-display text-lg">Още</span>
              <button onClick={() => setMoreOpen(false)} className="text-sm px-2 py-1" aria-label="Затвори">✕</button>
            </div>
            {moreItems.map((item) => (
              <button
                key={item.href}
                onClick={() => go(item.href)}
                className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border py-4 text-xs"
                style={{
                  borderColor: "var(--nk-border)",
                  background: isActive(pathname, item.href) ? "var(--nk-ember)" : "var(--nk-bg-2)",
                  color: isActive(pathname, item.href) ? "#FBF3E7" : "var(--nk-fg)",
                }}
              >
                <span className="text-xl leading-none">{item.icon}</span>
                <span className="text-center leading-tight">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile bottom nav — always shows all destinations (primary here, rest under "Още") */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-40 flex items-stretch border-t"
        style={{
          background: "var(--nk-card-bg)",
          borderColor: "var(--nk-border)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {primaryItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium"
            style={{ color: isActive(pathname, item.href) ? "var(--nk-ember)" : "var(--nk-fg-soft)" }}
          >
            <span className="text-xl leading-none">{item.icon}</span>
            <span className="leading-tight">{item.label}</span>
          </Link>
        ))}
        <button
          onClick={() => setMoreOpen(true)}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium"
          style={{ color: moreOpen ? "var(--nk-ember)" : "var(--nk-fg-soft)" }}
        >
          <span className="text-xl leading-none">⋯</span>
          <span className="leading-tight">Още</span>
        </button>
      </nav>
    </>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function NavLink({ item, active }: { item: (typeof NAV)[number]; active: boolean }) {
  return (
    <Link
      href={item.href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors"
      style={{
        background: active ? "var(--nk-ember)" : "transparent",
        color: active ? "#FBF3E7" : "var(--nk-fg)",
        fontWeight: active ? 600 : 500,
      }}
    >
      <span className="w-5 text-center" style={{ opacity: 0.85 }}>{item.icon}</span>
      {item.label}
    </Link>
  );
}

export function BoltIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

export function CloudIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 18h10a4 4 0 0 0 .5-7.97 5.5 5.5 0 0 0-10.6-1.5A4.5 4.5 0 0 0 7 18Z" />
    </svg>
  );
}

export function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2c.6 3.6 2 6.4 4 8.2 2 1.8 4.6 2.8 8 3-3.4.2-6 1.2-8 3-2 1.8-3.4 4.6-4 8.2-.6-3.6-2-6.4-4-8.2-2-1.8-4.6-2.8-8-3 3.4-.2 6-1.2 8-3 2-1.8 3.4-4.6 4-8.2Z" />
    </svg>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 px-5 py-6">
      <span
        className="font-display italic text-2xl w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ background: "var(--nk-ember)", color: "#FBF3E7" }}
      >
        N
      </span>
      <span className="font-display text-lg leading-tight">
        N Kitchen
      </span>
    </Link>
  );
}
