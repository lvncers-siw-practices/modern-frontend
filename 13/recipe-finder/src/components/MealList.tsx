import type { Meal } from "../types/meal";
import MealCard from "./MealCard";

type MealListProps = {
  meals: Meal[];
};

export default function MealList({ meals }: MealListProps) {
  return (
    <div className="meal-grid">
      {meals.map((meal) => (
        <MealCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}
