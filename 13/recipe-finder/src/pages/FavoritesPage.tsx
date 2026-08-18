import MealList from "../components/MealList";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <p className="favorites-page__message">お気に入りの料理はありません。</p>
    );
  }

  return (
    <section className="favorites-page">
      <MealList meals={favorites} onRemove={removeFavorite} />
    </section>
  );
}
