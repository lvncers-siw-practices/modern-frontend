import { Link } from "react-router";
import type { Meal } from "../types/meal";

type MealCardProps = {
  meal: Meal;
};

export default function MealCard({ meal }: MealCardProps) {
  return (
    <Link to={`/meals/${meal.idMeal}`} className="meal-card">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="meal-card__image"
      />
      <p className="meal-card__name">{meal.strMeal}</p>
    </Link>
  );
}
