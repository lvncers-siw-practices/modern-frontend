import { Link } from "react-router";
import type { Meal } from "../types/meal";

type MealCardProps = {
  meal: Meal;
  onRemove?: (id: string) => void;
};

export default function MealCard({ meal, onRemove }: MealCardProps) {
  return (
    <div className="meal-card">
      <Link to={`/meals/${meal.idMeal}`} className="meal-card__link">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="meal-card__image"
        />
        <p className="meal-card__name">{meal.strMeal}</p>
      </Link>
      {onRemove && (
        <button
          type="button"
          className="meal-card__remove"
          onClick={() => onRemove(meal.idMeal)}
        >
          お気に入り解除
        </button>
      )}
    </div>
  );
}
