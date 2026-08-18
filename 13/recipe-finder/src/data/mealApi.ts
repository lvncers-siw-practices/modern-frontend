import type {
  Meal,
  MealLookupResponse,
  MealSearchResponse,
} from "../types/meal";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

export async function searchMeals(query: string): Promise<Meal[]> {
  const response = await fetch(
    `${API_BASE}/search.php?s=${encodeURIComponent(query)}`,
  );
  const data: MealSearchResponse = await response.json();
  return data.meals ?? [];
}

export async function getMealById(id: string): Promise<Meal | null> {
  const response = await fetch(
    `${API_BASE}/lookup.php?i=${encodeURIComponent(id)}`,
  );
  const data: MealLookupResponse = await response.json();
  return data.meals?.[0] ?? null;
}
