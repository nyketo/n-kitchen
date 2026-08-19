"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

// Every nav item uses the same style of inline SVG icon — same box size,
// same stroke weight, same line style — so the row reads as one consistent
// set instead of a mix of text glyphs and icons. Text glyphs (⌂ ▤ ☁ etc.)
// also render inconsistently across platforms (some turn into colorful
// emoji on iOS), which was the original reason to move away from them.
const NAV = [
  { href: "/", label: "Начало", icon: <HomeIcon /> },
  { href: "/recipes", label: "Рецепти", icon: <RecipesIcon /> },
  { href: "/cook4me", label: "Cook4me", icon: <PotIcon /> },
  { href: "/quick", label: "Набързо", icon: <BoltIcon /> },
  { href: "/weekly-menu", label: "Седмично меню", icon: <CalendarIcon /> },
  { href: "/fridge", label: "Моят хладилник", icon: <FridgeIcon /> },
  { href: "/shopping", label: "Пазаруване", icon: <ShoppingIcon /> },
  { href: "/favorites", label: "Любими", icon: <HeartIcon /> },
  { href: "/chef", label: "Моят готвач", icon: <SparkleIcon /> },
  { href: "/account", label: "Профил", icon: <CloudIcon /> },
  { href: "/settings", label: "Настройки", icon: <SettingsIcon /> },
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
        className="hidden md:flex md:flex-col md:w-56 lg:w-64 shrink-0 border-r nk-scrollbar overflow-y-auto sticky top-0 h-screen"
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
                <span className="flex items-center justify-center h-5">{item.icon}</span>
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
            <span className="flex items-center justify-center h-5">{item.icon}</span>
            <span className="leading-tight">{item.label}</span>
          </Link>
        ))}
        <button
          onClick={() => setMoreOpen(true)}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium"
          style={{ color: moreOpen ? "var(--nk-ember)" : "var(--nk-fg-soft)" }}
        >
          <span className="flex items-center justify-center h-5"><DotsIcon /></span>
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
      <span className="w-5 inline-flex items-center justify-center" style={{ opacity: 0.85 }}>{item.icon}</span>
      {item.label}
    </Link>
  );
}

// One consistent icon set for the whole nav — same 20x20 box, same stroke
// weight (1.8), same rounded line style — so the row reads as one family
// instead of a mix of filled glyphs, text symbols and odd sizes.
const ICON_PROPS = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function HomeIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
      <path d="M10 20v-5h4v5" />
    </svg>
  );
}

export function RecipesIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M5 4.5h9.5a3.5 3.5 0 0 1 3.5 3.5v11.5H8a3 3 0 0 1-3-3V4.5Z" />
      <path d="M5 16.5h13" />
      <path d="M8.5 8h6" />
    </svg>
  );
}

export function PotIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M4.5 10h15l-1 8.2a2 2 0 0 1-2 1.8H7.5a2 2 0 0 1-2-1.8L4.5 10Z" />
      <path d="M4.5 10 2.5 8" />
      <path d="M19.5 10l2-2" />
      <path d="M8 10V6.5a1.5 1.5 0 0 1 3 0V10" />
    </svg>
  );
}

export function BoltIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
      <path d="M4 10h16" />
      <path d="M8 3.5v3.5" />
      <path d="M16 3.5v3.5" />
    </svg>
  );
}

export function FridgeIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="6" y="2.5" width="12" height="19" rx="1.8" />
      <path d="M6 10h12" />
      <path d="M9 5.5v2.2" />
      <path d="M9 13v2.2" />
    </svg>
  );
}

export function ShoppingIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M5 8h14l-1.3 10.2a2 2 0 0 1-2 1.8H8.3a2 2 0 0 1-2-1.8L5 8Z" />
      <path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2" />
    </svg>
  );
}

export function HeartIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 20.2 4.6 13a4.6 4.6 0 0 1 6.8-6.2l.6.6.6-.6a4.6 4.6 0 0 1 6.8 6.2L12 20.2Z" />
    </svg>
  );
}

export function CloudIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M7 18h10a4 4 0 0 0 .5-7.97 5.5 5.5 0 0 0-10.6-1.5A4.5 4.5 0 0 0 7 18Z" />
    </svg>
  );
}

export function SparkleIcon() {
  return (
    <svg {...ICON_PROPS} fill="currentColor" stroke="none">
      <path d="M12 2c.6 3.6 2 6.4 4 8.2 2 1.8 4.6 2.8 8 3-3.4.2-6 1.2-8 3-2 1.8-3.4 4.6-4 8.2-.6-3.6-2-6.4-4-8.2-2-1.8-4.6-2.8-8-3 3.4-.2 6-1.2 8-3 2-1.8 3.4-4.6 4-8.2Z" />
    </svg>
  );
}

export function SettingsIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.2M12 18.3v2.2M4.9 6.9l1.6 1.6M17.5 15.5l1.6 1.6M3.5 12h2.2M18.3 12h2.2M4.9 17.1l1.6-1.6M17.5 8.5l1.6-1.6" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="5" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="19" cy="12" r="1.8" />
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
