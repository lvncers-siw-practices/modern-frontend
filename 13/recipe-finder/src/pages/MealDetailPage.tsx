import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import IngredientList from "../components/IngredientList";
import { useFavorites } from "../context/FavoritesContext";
import { getMealById } from "../data/mealApi";
import type { Meal } from "../types/meal";

export default function MealDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [error, setError] = useState(false);
  const [loadedId, setLoadedId] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    getMealById(id)
      .then((result) => {
        if (cancelled) return;
        setMeal(result);
        setError(false);
        setLoadedId(id);
      })
      .catch(() => {
        if (cancelled) return;
        setError(true);
        setLoadedId(id);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loadedId !== id) {
    return <p className="detail-page__message">読み込み中...</p>;
  }

  if (error) {
    return (
      <p className="detail-page__message">
        料理情報の取得に失敗しました。もう一度お試しください。
      </p>
    );
  }

  if (meal === null) {
    return <p className="detail-page__message">料理が見つかりませんでした。</p>;
  }

  const favorited = isFavorite(meal.idMeal);

  return (
    <section className="detail-page">
      <Link to="/" className="detail-page__back">
        検索に戻る
      </Link>

      <div className="detail-page__heading">
        <h2 className="detail-page__name">{meal.strMeal}</h2>
        <button
          type="button"
          className={
            favorited
              ? "favorite-button favorite-button--active"
              : "favorite-button"
          }
          onClick={() =>
            favorited ? removeFavorite(meal.idMeal) : addFavorite(meal)
          }
        >
          {favorited ? "お気に入り解除" : "お気に入りに追加"}
        </button>
      </div>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="detail-page__image"
      />

      <dl className="detail-page__info">
        {meal.strCategory && (
          <>
            <dt>カテゴリ</dt>
            <dd>{meal.strCategory}</dd>
          </>
        )}
        {meal.strArea && (
          <>
            <dt>地域</dt>
            <dd>{meal.strArea}</dd>
          </>
        )}
      </dl>

      <h3 className="detail-page__subheading">材料</h3>
      <IngredientList meal={meal} />

      {meal.strInstructions && (
        <>
          <h3 className="detail-page__subheading">作り方</h3>
          <p className="detail-page__instructions">{meal.strInstructions}</p>
        </>
      )}
    </section>
  );
}
