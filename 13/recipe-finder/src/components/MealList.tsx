import type { MealSummary } from "../types/meal";
import MealCard from "./MealCard";

type MealListProps = {
  meals: MealSummary[];
  onRemove?: (id: string) => void;
};

export default function MealList({ meals, onRemove }: MealListProps) {
  return (
    <div className="meal-grid">
      {meals.map((meal) => (
        <MealCard key={meal.idMeal} meal={meal} onRemove={onRemove} />
      ))}
    </div>
  );
}
