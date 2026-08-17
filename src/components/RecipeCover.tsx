import type { MealCategory } from "@/lib/types";

const GRADIENTS: Record<MealCategory, string> = {
  pork: "linear-gradient(135deg,#B5502D,#7C3A20)",
  beef: "linear-gradient(135deg,#8F3D21,#4C2415)",
  chicken: "linear-gradient(135deg,#D69A3C,#A9701F)",
  minced: "linear-gradient(135deg,#A63B2C,#6B2419)",
  mackerel: "linear-gradient(135deg,#4C5A32,#2E3A1C)",
  "other-fish": "linear-gradient(135deg,#3E5C63,#243A40)",
  eggs: "linear-gradient(135deg,#E3B04B,#B5802B)",
  soups: "linear-gradient(135deg,#6B4A2F,#3D2818)",
  stews: "linear-gradient(135deg,#7A3B22,#4A2313)",
  salads: "linear-gradient(135deg,#5C7A3A,#334420)",
  desserts: "linear-gradient(135deg,#8C6A4A,#5B4128)",
  bread: "linear-gradient(135deg,#C08A4E,#8A5F30)",
  pizza: "linear-gradient(135deg,#B5502D,#8F3D21)",
  sauces: "linear-gradient(135deg,#9B5A2B,#623A1B)",
  cabbage: "linear-gradient(135deg,#6E7F45,#3D4A26)",
  bulgarian: "linear-gradient(135deg,#8F3D21,#B5502D)",
};

const ICONS: Record<MealCategory, string> = {
  pork: "🐖", beef: "🐄", chicken: "🐔", minced: "🍖", mackerel: "🐟", "other-fish": "🐟",
  eggs: "🥚", soups: "🥣", stews: "🍲", salads: "🥗", desserts: "🍮", bread: "🍞",
  pizza: "🍕", sauces: "🫙", cabbage: "🥬", bulgarian: "🇧🇬",
};

export default function RecipeCover({ category, className }: { category: MealCategory; className?: string }) {
  return (
    <div
      className={`relative flex items-end justify-start overflow-hidden ${className ?? ""}`}
      style={{ background: GRADIENTS[category] ?? GRADIENTS.bulgarian }}
    >
      <span className="absolute top-3 right-3 text-2xl opacity-80">{ICONS[category]}</span>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 30% 20%, white 0, transparent 45%)",
      }} />
    </div>
  );
}
