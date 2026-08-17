import type { CookingMethod, MealCategory } from "./types";

export const CATEGORY_LABELS: Record<MealCategory, string> = {
  pork: "Свинско", beef: "Телешко", chicken: "Пилешко", minced: "Кайма",
  mackerel: "Скумрия", "other-fish": "Други риби", eggs: "Яйца", soups: "Супи",
  stews: "Яхнии", salads: "Салати", desserts: "Десерти", bread: "Хляб и тесто",
  pizza: "Пица", sauces: "Сосове и марината", cabbage: "Месо със зеле", bulgarian: "Българска кухня",
};

export const METHOD_LABELS: Record<CookingMethod, string> = {
  cook4me: "Cook4me", stovetop: "Котлон", oven: "Фурна", airfryer: "Air Fryer", grill: "Грил",
};

export const METHOD_ICONS: Record<CookingMethod, string> = {
  cook4me: "◍", stovetop: "◐", oven: "▭", airfryer: "◉", grill: "▲",
};
