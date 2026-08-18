import Link from "next/link";
import type { Recipe } from "@/lib/types";
import RecipeCover from "./RecipeCover";
import { METHOD_LABELS } from "@/lib/labels";
import { recipePerServing, isKetoFriendly } from "@/lib/nutrition";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const n = recipePerServing(recipe);
  const method = recipe.methods[0];
  const totalTime = method ? method.prepTime + method.activeTime + method.cookTime : 0;
  // Badge reflects the *actual computed* net carbs, not just the recipe's static dietType label —
  // a recipe tagged "keto" whose vegetables push it over the limit shows LOW-CARB instead.
  const ketoOk = isKetoFriendly(recipe);

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group rounded-2xl overflow-hidden border block nk-fade-in"
      style={{ background: "var(--nk-card-bg)", borderColor: "var(--nk-border)" }}
    >
      <RecipeCover category={recipe.category} title={recipe.title} className="h-36 w-full" />
      <div className="p-4">
        <h3 className="font-display text-lg leading-snug mb-1 group-hover:opacity-80">{recipe.title}</h3>
        <p className="text-xs mb-3 line-clamp-2" style={{ color: "var(--nk-fg-soft)" }}>{recipe.description}</p>
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          {recipe.dietType.includes("keto") && (
            <span className="px-2 py-0.5 rounded-full" style={{ background: "var(--nk-bg-2)", color: "var(--nk-olive)" }}>
              {ketoOk ? "KETO" : "LOW-CARB"}
            </span>
          )}
          {!recipe.dietType.includes("keto") && recipe.dietType.includes("low-carb") && (
            <span className="px-2 py-0.5 rounded-full" style={{ background: "var(--nk-bg-2)", color: "var(--nk-olive)" }}>
              LOW-CARB
            </span>
          )}
          {method && (
            <span className="px-2 py-0.5 rounded-full" style={{ background: "var(--nk-bg-2)" }}>
              {METHOD_LABELS[method.method]} · {totalTime} мин
            </span>
          )}
          <span className="px-2 py-0.5 rounded-full" style={{ background: "var(--nk-bg-2)" }}>
            {n.protein}г протеин
          </span>
        </div>
      </div>
    </Link>
  );
}
