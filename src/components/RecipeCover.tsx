import type { MealCategory } from "@/lib/types";
import { CategoryArt } from "./CategoryArt";

// Fresh, cheerful, sun-bright gradients — no dark/muddy endpoints. Each still reads as its
// own category, just via bright hue instead of murky shade.
const GRADIENTS: Record<MealCategory, string> = {
  pork: "linear-gradient(155deg,#FFCBA6 0%,#FFA36C 55%,#FF8A50 100%)",
  beef: "linear-gradient(155deg,#FFB199 0%,#FF8A65 55%,#F4694A 100%)",
  chicken: "linear-gradient(155deg,#FFEBA0 0%,#FFD666 55%,#FFC13D 100%)",
  minced: "linear-gradient(155deg,#FFB199 0%,#FF7E67 55%,#F4573B 100%)",
  mackerel: "linear-gradient(155deg,#BEEBE0 0%,#7CD6C4 55%,#4CBFAE 100%)",
  "other-fish": "linear-gradient(155deg,#B3E5FC 0%,#7BCDF4 55%,#4FB6EC 100%)",
  eggs: "linear-gradient(155deg,#FFF3B0 0%,#FFE066 55%,#FFCB3D 100%)",
  soups: "linear-gradient(155deg,#FFE0A8 0%,#FFC169 55%,#FFA53E 100%)",
  stews: "linear-gradient(155deg,#FFCBA6 0%,#FFA06B 55%,#F5813E 100%)",
  salads: "linear-gradient(155deg,#E4F3B0 0%,#C4E27E 55%,#9FCB52 100%)",
  desserts: "linear-gradient(155deg,#FBD3E6 0%,#F5A9CE 55%,#EF80B5 100%)",
  bread: "linear-gradient(155deg,#FFE9A6 0%,#FFD066 55%,#FFB94A 100%)",
  pizza: "linear-gradient(155deg,#FFC79E 0%,#FF9B63 55%,#FF7A4A 100%)",
  sauces: "linear-gradient(155deg,#FFE2A6 0%,#FFC066 55%,#FFA23E 100%)",
  cabbage: "linear-gradient(155deg,#D6EFA8 0%,#B6DE78 55%,#93CB4E 100%)",
  bulgarian: "linear-gradient(155deg,#FFE0B3 0%,#FFB877 55%,#FF9856 100%)",
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
        className="absolute inset-x-0 bottom-0 h-10 opacity-60"
        style={{ backgroundImage: "linear-gradient(to top, rgba(120,60,20,0.22) 0%, transparent 100%)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px opacity-30"
        style={{ background: "linear-gradient(to right, transparent, rgba(251,243,231,0.6), transparent)" }}
      />
    </div>
  );
}
