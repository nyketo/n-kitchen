import type { MealCategory } from "@/lib/types";

// Full-size hand-drawn-feeling sketch illustrations, one per category — these ARE the cover,
// not a small badge sitting on top of one. Each drawing fills the frame directly on the
// category gradient (a soft grounding shadow keeps the subject from floating), and a shared
// SVG filter gives the linework a light hand-sketched wobble.

function Sketch({ children, viewBox = "0 0 120 120" }: { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg viewBox={viewBox} className="w-full h-full" aria-hidden="true">
      <defs>
        <filter id="sketchy" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" />
        </filter>
      </defs>
      <ellipse cx="60" cy="103" rx="36" ry="7" fill="rgba(20,12,6,0.16)" />
      <g filter="url(#sketchy)" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

const Pig = () => (
  <Sketch>
    <ellipse cx="60" cy="70" rx="33" ry="24" fill="#F0B79B" stroke="#7A3B23" strokeWidth="3" />
    <path d="M32 56 Q26 42 42 46 Q40 54 32 56 Z" fill="#F0B79B" stroke="#7A3B23" strokeWidth="3" />
    <ellipse cx="60" cy="72" rx="12" ry="9" fill="#E4906C" stroke="#7A3B23" strokeWidth="2.5" />
    <circle cx="55" cy="72" r="1.8" fill="#7A3B23" />
    <circle cx="65" cy="72" r="1.8" fill="#7A3B23" />
    <circle cx="46" cy="62" r="2.2" fill="#3E1D0F" />
    <path d="M88 56 Q96 50 92 42 Q86 44 86 52" fill="none" stroke="#7A3B23" strokeWidth="3" />
    <path d="M32 88 L32 96 M46 92 L46 100 M74 92 L74 100 M88 88 L88 96" stroke="#7A3B23" strokeWidth="3" />
  </Sketch>
);

const Cow = () => (
  <Sketch>
    <ellipse cx="60" cy="68" rx="30" ry="25" fill="#E8D9C2" stroke="#5A3A22" strokeWidth="3" />
    <path d="M40 46 Q34 32 44 30 Q48 40 44 48" fill="none" stroke="#5A3A22" strokeWidth="3.5" />
    <path d="M80 46 Q86 32 76 30 Q72 40 76 48" fill="none" stroke="#5A3A22" strokeWidth="3.5" />
    <path d="M30 60 Q22 62 24 72 Q30 74 34 66 Z" fill="#E8D9C2" stroke="#5A3A22" strokeWidth="2.5" />
    <path d="M90 60 Q98 62 96 72 Q90 74 86 66 Z" fill="#E8D9C2" stroke="#5A3A22" strokeWidth="2.5" />
    <ellipse cx="60" cy="82" rx="14" ry="10" fill="#F5EFE3" stroke="#5A3A22" strokeWidth="2.5" />
    <circle cx="55" cy="82" r="1.8" fill="#3E1D0F" />
    <circle cx="65" cy="82" r="1.8" fill="#3E1D0F" />
    <path d="M42 54 Q48 48 54 56 Q48 60 42 54 Z" fill="#8A6440" opacity="0.75" />
    <path d="M72 66 Q80 62 82 70 Q76 74 72 66 Z" fill="#8A6440" opacity="0.75" />
    <circle cx="48" cy="60" r="2.4" fill="#3E1D0F" />
    <circle cx="72" cy="60" r="2.4" fill="#3E1D0F" />
  </Sketch>
);

const Chicken = () => (
  <Sketch>
    <ellipse cx="62" cy="74" rx="26" ry="21" fill="#F6E6C8" stroke="#8C5D1E" strokeWidth="3" />
    <circle cx="42" cy="52" r="13" fill="#F6E6C8" stroke="#8C5D1E" strokeWidth="3" />
    <path d="M34 40 Q36 32 42 38 Q40 42 34 40 Z M40 36 Q44 28 48 36 Q46 40 40 36 Z M46 38 Q52 32 52 40 Q48 42 46 38 Z" fill="#C1442E" />
    <path d="M32 58 Q26 62 32 66 Q36 62 32 58 Z" fill="#C1442E" />
    <path d="M28 50 L18 53 L28 56 Z" fill="#E3A63E" stroke="#8C5D1E" strokeWidth="1.5" />
    <circle cx="45" cy="49" r="2" fill="#3E1D0F" />
    <path d="M60 58 Q72 54 70 68 Q60 70 58 62 Z" fill="none" stroke="#8C5D1E" strokeWidth="2.5" />
    <path d="M84 56 Q96 50 94 60 Q88 62 84 56 Z M84 62 Q98 60 94 70 Q86 70 84 62 Z M82 68 Q94 70 88 78 Q82 76 82 68 Z" fill="none" stroke="#C1442E" strokeWidth="2.5" />
  </Sketch>
);

const MincedMeat = () => (
  <Sketch>
    <path d="M32 82 Q28 62 46 56 Q56 48 72 54 Q92 58 88 78 Q86 92 60 92 Q36 92 32 82 Z"
      fill="#B8462F" stroke="#6B2415" strokeWidth="3" />
    <path d="M42 68 Q46 72 42 78 M54 62 Q58 68 52 74 M66 64 Q72 68 66 76 M76 70 Q80 76 74 80"
      fill="none" stroke="#6B2415" strokeWidth="2" opacity="0.7" />
    <path d="M80 44 Q78 36 84 32 Q88 38 86 46 Q90 40 94 42 Q92 50 84 50 Q86 44 80 44 Z" fill="#6E8C4A" stroke="#3E4A26" strokeWidth="2" />
  </Sketch>
);

const Mackerel = () => (
  <Sketch>
    <path d="M22 62 Q40 40 70 46 Q92 50 98 62 Q92 74 70 78 Q40 84 22 62 Z" fill="#8FA6A0" stroke="#33484E" strokeWidth="3" />
    <path d="M98 62 L112 52 L108 62 L112 72 Z" fill="#8FA6A0" stroke="#33484E" strokeWidth="2.5" />
    <path d="M56 48 Q60 40 68 44 M64 50 Q70 42 78 46 M46 52 Q50 44 58 48" fill="none" stroke="#3F4B27" strokeWidth="2" />
    <path d="M40 52 Q46 60 40 68" fill="none" stroke="#33484E" strokeWidth="2" />
    <circle cx="34" cy="60" r="2.4" fill="#1C2A2E" />
  </Sketch>
);

const OtherFish = () => (
  <Sketch>
    <path d="M24 64 Q44 44 72 50 Q94 54 100 64 Q94 76 72 80 Q44 88 24 64 Z" fill="#6F98A0" stroke="#1C2A2E" strokeWidth="3" />
    <path d="M100 64 L114 54 L110 64 L114 74 Z" fill="#6F98A0" stroke="#1C2A2E" strokeWidth="2.5" />
    <circle cx="36" cy="62" r="2.4" fill="#0E1A1C" />
    <path d="M60 48 L64 40" fill="none" stroke="#1C2A2E" strokeWidth="2.5" />
    <circle cx="18" cy="40" r="2.5" fill="#B7D4D6" opacity="0.8" />
    <circle cx="12" cy="32" r="1.6" fill="#B7D4D6" opacity="0.8" />
  </Sketch>
);

const Eggs = () => (
  <Sketch>
    <ellipse cx="44" cy="70" rx="16" ry="21" fill="#F6EFE0" stroke="#C1872F" strokeWidth="3" />
    <path d="M74 52 Q90 56 92 74 Q90 92 74 90 Q58 88 60 70 Q62 54 74 52 Z" fill="#FBF6EC" stroke="#C1872F" strokeWidth="3" />
    <path d="M64 58 L72 66 L66 70 L76 78" fill="none" stroke="#C1872F" strokeWidth="2.5" />
    <circle cx="78" cy="76" r="9" fill="#E8A93C" stroke="#93691F" strokeWidth="2" />
  </Sketch>
);

const Soup = () => (
  <Sketch>
    <path d="M28 66 Q28 90 60 92 Q92 90 92 66 Z" fill="#C98A55" stroke="#573A21" strokeWidth="3" />
    <ellipse cx="60" cy="66" rx="32" ry="9" fill="#EAD9B8" stroke="#573A21" strokeWidth="3" />
    <path d="M96 68 Q106 68 104 76 Q98 80 92 74" fill="none" stroke="#573A21" strokeWidth="3" />
    <path d="M46 46 Q42 38 48 32 M60 44 Q56 34 62 26 M74 46 Q70 38 76 32" fill="none" stroke="#8C6A46" strokeWidth="2.5" opacity="0.65" />
  </Sketch>
);

const Stew = () => (
  <Sketch>
    <path d="M30 58 L90 58 L86 88 Q60 96 34 88 Z" fill="#8C4A2A" stroke="#33190D" strokeWidth="3" />
    <ellipse cx="60" cy="58" rx="30" ry="7" fill="#B8613A" stroke="#33190D" strokeWidth="3" />
    <path d="M24 56 Q14 56 16 66 Q24 70 30 62" fill="none" stroke="#33190D" strokeWidth="3" />
    <path d="M96 56 Q106 56 104 66 Q96 70 90 62" fill="none" stroke="#33190D" strokeWidth="3" />
    <path d="M48 40 Q44 32 50 26 M60 38 Q56 28 62 22 M72 40 Q68 32 74 26" fill="none" stroke="#8C6A46" strokeWidth="2.5" opacity="0.65" />
  </Sketch>
);

const Salad = () => (
  <Sketch>
    <path d="M26 62 Q28 90 60 92 Q92 90 94 62 Z" fill="#EAD9B8" stroke="#4B6030" strokeWidth="3" />
    <ellipse cx="60" cy="62" rx="34" ry="8" fill="#F3E7CC" stroke="#4B6030" strokeWidth="2.5" />
    <path d="M40 56 Q34 42 46 38 Q50 50 44 58 Z" fill="#6E8C4A" stroke="#3A4A24" strokeWidth="2" />
    <path d="M60 52 Q56 36 70 34 Q72 48 64 56 Z" fill="#7C9152" stroke="#3A4A24" strokeWidth="2" />
    <path d="M78 58 Q76 44 88 42 Q90 54 82 60 Z" fill="#6E8C4A" stroke="#3A4A24" strokeWidth="2" />
    <circle cx="60" cy="70" r="6" fill="#B5502D" stroke="#6B2415" strokeWidth="1.5" />
  </Sketch>
);

const Dessert = () => (
  <Sketch>
    <path d="M38 88 L60 34 L82 88 Z" fill="#D9B68A" stroke="#75563A" strokeWidth="3" />
    <path d="M44 74 L76 74 M48 60 L72 60" stroke="#75563A" strokeWidth="2.5" />
    <path d="M46 46 Q60 34 74 46 Q60 40 46 46 Z" fill="#F3DFC0" stroke="#75563A" strokeWidth="2" />
    <circle cx="60" cy="34" r="5" fill="#B5502D" stroke="#6B2415" strokeWidth="1.5" />
  </Sketch>
);

const Bread = () => (
  <Sketch>
    <path d="M26 78 Q22 48 60 44 Q98 48 94 78 Q94 92 60 92 Q26 92 26 78 Z" fill="#D19E5D" stroke="#734E24" strokeWidth="3" />
    <path d="M40 54 L56 74 M56 50 L72 72 M72 52 L86 74" stroke="#A9753A" strokeWidth="2.5" />
  </Sketch>
);

const Pizza = () => (
  <Sketch>
    <path d="M60 30 L94 90 Q60 102 26 90 Z" fill="#EFC066" stroke="#9C4A28" strokeWidth="3" />
    <path d="M28 88 Q60 98 92 88 Q92 82 88 80 Q60 90 32 80 Q28 82 28 88 Z" fill="#E3A63E" stroke="#9C4A28" strokeWidth="2.5" />
    <circle cx="56" cy="56" r="6" fill="#B5502D" stroke="#6B2415" strokeWidth="1.5" />
    <circle cx="72" cy="68" r="6" fill="#B5502D" stroke="#6B2415" strokeWidth="1.5" />
    <circle cx="52" cy="76" r="5" fill="#B5502D" stroke="#6B2415" strokeWidth="1.5" />
    <path d="M74 46 Q68 40 74 34 Q80 40 74 46 Z" fill="#4C5A32" stroke="#2E3A1B" strokeWidth="1.5" />
  </Sketch>
);

const Sauce = () => (
  <Sketch>
    <path d="M42 50 L78 50 L82 90 Q60 96 38 90 Z" fill="#EAD9B8" stroke="#472A13" strokeWidth="3" />
    <path d="M46 50 L46 38 L74 38 L74 50" fill="none" stroke="#472A13" strokeWidth="3" />
    <rect x="44" y="30" width="32" height="10" rx="3" fill="#AD6A34" stroke="#472A13" strokeWidth="2.5" />
    <path d="M52 64 Q60 60 68 64 Q66 76 60 78 Q54 76 52 64 Z" fill="#B5502D" opacity="0.85" />
    <path d="M88 66 Q96 68 92 78 Q86 78 86 70 Z" fill="#AD6A34" stroke="#472A13" strokeWidth="2" />
  </Sketch>
);

const Cabbage = () => (
  <Sketch>
    <path d="M60 26 Q94 30 96 62 Q94 94 60 96 Q26 94 24 62 Q26 30 60 26 Z" fill="#9BB56E" stroke="#3A4A22" strokeWidth="3" />
    <path d="M60 38 Q82 42 84 62 Q82 82 60 86 Q38 82 36 62 Q38 42 60 38 Z" fill="#7C9152" stroke="#3A4A22" strokeWidth="2.5" />
    <path d="M60 50 Q72 52 72 62 Q72 72 60 74 Q48 72 48 62 Q48 52 60 50 Z" fill="#556334" stroke="#2A331A" strokeWidth="2" />
  </Sketch>
);

const BulgarianFlag = () => (
  <Sketch>
    <line x1="30" y1="20" x2="30" y2="100" stroke="#5A4A38" strokeWidth="4" />
    <circle cx="30" cy="18" r="3.5" fill="#D69A3C" stroke="#5A4A38" strokeWidth="1.5" />
    <path d="M30 26 Q60 22 92 28 Q84 36 92 44 Q60 40 30 46 Z" fill="#FBF6EC" stroke="#3A2E20" strokeWidth="2.5" />
    <path d="M30 46 Q60 42 92 44 Q84 52 92 60 Q60 58 30 64 Z" fill="#4C5A32" stroke="#2E3A1B" strokeWidth="2.5" />
    <path d="M30 64 Q60 60 92 60 Q86 68 92 76 Q58 76 30 80 Z" fill="#B5502D" stroke="#6B2415" strokeWidth="2.5" />
  </Sketch>
);

export const CATEGORY_ART: Record<MealCategory, () => React.ReactNode> = {
  pork: Pig,
  beef: Cow,
  chicken: Chicken,
  minced: MincedMeat,
  mackerel: Mackerel,
  "other-fish": OtherFish,
  eggs: Eggs,
  soups: Soup,
  stews: Stew,
  salads: Salad,
  desserts: Dessert,
  bread: Bread,
  pizza: Pizza,
  sauces: Sauce,
  cabbage: Cabbage,
  bulgarian: BulgarianFlag,
};

export function CategoryArt({ category }: { category: MealCategory }) {
  const Art = CATEGORY_ART[category] ?? BulgarianFlag;
  return <Art />;
}

export function BulgarianFlagBadge({ className }: { className?: string }) {
  return (
    <div className={className}>
      <BulgarianFlag />
    </div>
  );
}
