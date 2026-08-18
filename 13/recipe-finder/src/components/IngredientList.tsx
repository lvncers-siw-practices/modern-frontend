import type { Ingredient, Meal } from "../types/meal";

type IngredientListProps = {
  meal: Meal;
};

function getIngredients(meal: Meal): Ingredient[] {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}` as keyof Meal] as string | null;
    const measure = meal[`strMeasure${i}` as keyof Meal] as string | null;
    const trimmedName = name?.trim() ?? "";
    const trimmedMeasure = measure?.trim() ?? "";

    if (trimmedName === "") continue;
    ingredients.push({ name: trimmedName, measure: trimmedMeasure });
  }

  return ingredients;
}

export default function IngredientList({ meal }: IngredientListProps) {
  const ingredients = getIngredients(meal);

  return (
    <ul className="ingredient-list">
      {ingredients.map((ingredient) => (
        <li key={ingredient.name} className="ingredient-list__item">
          <span className="ingredient-list__name">{ingredient.name}</span>
          {ingredient.measure !== "" && (
            <span className="ingredient-list__measure">
              {ingredient.measure}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
