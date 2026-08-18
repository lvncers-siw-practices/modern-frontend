import type {
  AreaListResponse,
  CategoryListResponse,
  Meal,
  MealFilterResponse,
  MealLookupResponse,
  MealSearchResponse,
  MealSummary,
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

export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE}/list.php?c=list`);
  const data: CategoryListResponse = await response.json();
  return (data.meals ?? []).map((item) => item.strCategory);
}

export async function getAreas(): Promise<string[]> {
  const response = await fetch(`${API_BASE}/list.php?a=list`);
  const data: AreaListResponse = await response.json();
  return (data.meals ?? []).map((item) => item.strArea);
}

export async function filterMealsByCategory(
  category: string,
): Promise<MealSummary[]> {
  const response = await fetch(
    `${API_BASE}/filter.php?c=${encodeURIComponent(category)}`,
  );
  const data: MealFilterResponse = await response.json();
  return data.meals ?? [];
}

export async function filterMealsByArea(area: string): Promise<MealSummary[]> {
  const response = await fetch(
    `${API_BASE}/filter.php?a=${encodeURIComponent(area)}`,
  );
  const data: MealFilterResponse = await response.json();
  return data.meals ?? [];
}

async function getRandomMeal(): Promise<Meal | null> {
  const response = await fetch(`${API_BASE}/random.php`);
  const data: MealLookupResponse = await response.json();
  return data.meals?.[0] ?? null;
}

export async function getRandomMeals(count: number): Promise<Meal[]> {
  const results = await Promise.all(
    Array.from({ length: count }, () => getRandomMeal()),
  );

  const uniqueMeals: Meal[] = [];
  for (const meal of results) {
    if (meal === null) continue;
    if (uniqueMeals.some((existing) => existing.idMeal === meal.idMeal)) {
      continue;
    }
    uniqueMeals.push(meal);
  }

  return uniqueMeals;
}
