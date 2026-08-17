"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Начало", icon: "⌂" },
  { href: "/recipes", label: "Рецепти", icon: "▤" },
  { href: "/cook4me", label: "Cook4me", icon: "◍" },
  { href: "/quick", label: "Набързо", icon: "⚡" },
  { href: "/weekly-menu", label: "Седмично меню", icon: "▦" },
  { href: "/fridge", label: "Моят хладилник", icon: "▢" },
  { href: "/shopping", label: "Пазаруване", icon: "☰" },
  { href: "/favorites", label: "Любими", icon: "♥" },
  { href: "/chef", label: "Моят готвач", icon: "✳" },
  { href: "/settings", label: "Настройки", icon: "⚙" },
];

export default function Sidebar() {
  const pathname = usePathname();

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

      {/* Mobile bottom nav */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-40 flex items-stretch border-t overflow-x-auto nk-scrollbar"
        style={{ background: "var(--nk-card-bg)", borderColor: "var(--nk-border)" }}
      >
        {NAV.slice(0, 6).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex-1 min-w-[64px] flex flex-col items-center justify-center gap-0.5 py-2 text-[10px]"
            style={{ color: isActive(pathname, item.href) ? "var(--nk-ember)" : "var(--nk-fg-soft)" }}
          >
            <span className="text-lg leading-none">{item.icon}</span>
            {item.label}
          </Link>
        ))}
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
