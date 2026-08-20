import type { MealCategory } from "@/lib/types";
import { CategoryArt } from "./CategoryArt";

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

export default function RecipeCover({
  category,
  title,
  className,
}: {
  category: MealCategory;
  title?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className ?? ""}`}
      style={{ background: GRADIENTS[category] ?? GRADIENTS.bulgarian }}
      title={title}
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
      {/* themed hand-drawn sketch — this IS the cover art now, filling the box in place of the
          old flat solid-color field (not a small corner badge). Replaces both the old giant
          monogram letter and the emoji badge (whose flag glyph silently rendered as literal
          "BG" text on Windows Chrome). */}
      <div className="absolute inset-0 p-3 md:p-4 drop-shadow-sm">
        <CategoryArt category={category} />
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-10 opacity-70"
        style={{ backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px opacity-30"
        style={{ background: "linear-gradient(to right, transparent, rgba(251,243,231,0.6), transparent)" }}
      />
    </div>
  );
}
