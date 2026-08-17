import type { MealCategory } from "@/lib/types";

const GRADIENTS: Record<MealCategory, string> = {
  pork: "linear-gradient(155deg,#C5623A 0%,#9C4A28 45%,#6B2E17 100%)",
  beef: "linear-gradient(155deg,#A6472A 0%,#7A331C 45%,#3E1D0F 100%)",
  chicken: "linear-gradient(155deg,#E3AE55 0%,#C1872F 45%,#8C5D1E 100%)",
  minced: "linear-gradient(155deg,#B8462F 0%,#8A2F1E 45%,#521B12 100%)",
  mackerel: "linear-gradient(155deg,#5C6C3E 0%,#3F4B27 45%,#232A15 100%)",
  "other-fish": "linear-gradient(155deg,#4B6E76 0%,#33484E 45%,#1C2A2E 100%)",
  eggs: "linear-gradient(155deg,#EFC066 0%,#CC983E 45%,#93691F 100%)",
  soups: "linear-gradient(155deg,#7C5836 0%,#573A21 45%,#2E1D10 100%)",
  stews: "linear-gradient(155deg,#8C4A2A 0%,#623119 45%,#33190D 100%)",
  salads: "linear-gradient(155deg,#6E8C4A 0%,#4B6030 45%,#293618 100%)",
  desserts: "linear-gradient(155deg,#9E7B57 0%,#75563A 45%,#453120 100%)",
  bread: "linear-gradient(155deg,#D19E5D 0%,#A9753A 45%,#734E24 100%)",
  pizza: "linear-gradient(155deg,#C5623A 0%,#9C4A28 45%,#5B2A17 100%)",
  sauces: "linear-gradient(155deg,#AD6A34 0%,#7C4A22 45%,#472A13 100%)",
  cabbage: "linear-gradient(155deg,#7C9152 0%,#556334 45%,#2F391B 100%)",
  bulgarian: "linear-gradient(155deg,#9C4A28 0%,#C5623A 45%,#6B2E17 100%)",
};

const ICONS: Record<MealCategory, string> = {
  pork: "🐖", beef: "🐄", chicken: "🐔", minced: "🍖", mackerel: "🐟", "other-fish": "🐟",
  eggs: "🥚", soups: "🥣", stews: "🍲", salads: "🥗", desserts: "🍮", bread: "🍞",
  pizza: "🍕", sauces: "🫙", cabbage: "🥬", bulgarian: "🇧🇬",
};

export default function RecipeCover({
  category,
  title,
  className,
}: {
  category: MealCategory;
  title?: string;
  className?: string;
}) {
  const monogram = title?.trim()?.[0]?.toUpperCase() ?? "N";
  return (
    <div
      className={`relative flex items-end justify-start overflow-hidden ${className ?? ""}`}
      style={{ background: GRADIENTS[category] ?? GRADIENTS.bulgarian }}
    >
      {/* subtle linen/paper texture */}
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 4px)",
        }}
      />
      {/* soft vignette light */}
      <div
        className="absolute inset-0 opacity-40"
        style={{ backgroundImage: "radial-gradient(circle at 25% 15%, rgba(255,255,255,0.35) 0, transparent 55%)" }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{ backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)" }}
      />
      {/* large typographic monogram — the focal element instead of a photo */}
      <span
        className="absolute -bottom-3 -left-1 font-display select-none pointer-events-none"
        style={{
          fontSize: "5.5rem",
          lineHeight: 1,
          color: "rgba(251,243,231,0.14)",
          fontWeight: 600,
        }}
        aria-hidden="true"
      >
        {monogram}
      </span>
      <span
        className="absolute top-3 right-3 text-xl w-8 h-8 rounded-full flex items-center justify-center"
        style={{ background: "rgba(20,12,6,0.28)", backdropFilter: "blur(2px)" }}
      >
        {ICONS[category]}
      </span>
      <div
        className="absolute inset-x-0 bottom-0 h-px opacity-30"
        style={{ background: "linear-gradient(to right, transparent, rgba(251,243,231,0.6), transparent)" }}
      />
    </div>
  );
}
