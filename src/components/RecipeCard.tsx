import Link from "next/link";
import type { Recipe } from "@/lib/types";
import RecipeCover from "./RecipeCover";
import { METHOD_LABELS } from "@/lib/labels";
import { recipePerServing } from "@/lib/nutrition";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const n = recipePerServing(recipe);
  const method = recipe.methods[0];
  const totalTime = method ? method.prepTime + method.activeTime + method.cookTime : 0;

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group rounded-2xl overflow-hidden border block nk-fade-in"
      style={{ background: "var(--nk-card-bg)", borderColor: "var(--nk-border)" }}
    >
      <RecipeCover category={recipe.category} className="h-36 w-full" />
      <div className="p-4">
        <h3 className="font-display text-lg leading-snug mb-1 group-hover:opacity-80">{recipe.title}</h3>
        <p className="text-xs mb-3 line-clamp-2" style={{ color: "var(--nk-fg-soft)" }}>{recipe.description}</p>
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          {recipe.dietType.map((d) => (
            <span key={d} className="px-2 py-0.5 rounded-full" style={{ background: "var(--nk-bg-2)", color: "var(--nk-olive)" }}>
              {d === "keto" ? "KETO" : "LOW-CARB"}
            </span>
          ))}
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
