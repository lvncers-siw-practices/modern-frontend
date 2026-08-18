import { useState } from "react";
import MealList from "../components/MealList";
import SearchForm from "../components/SearchForm";
import { searchMeals } from "../data/mealApi";
import type { Meal } from "../types/meal";

type SearchStatus = "idle" | "loading" | "success" | "error";

export default function SearchPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [status, setStatus] = useState<SearchStatus>("idle");

  async function handleSearch(query: string) {
    setStatus("loading");
    try {
      const result = await searchMeals(query);
      setMeals(result);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="search-page">
      <SearchForm onSearch={handleSearch} />

      {status === "loading" && (
        <p className="search-page__message">検索中...</p>
      )}
      {status === "error" && (
        <p className="search-page__message">
          検索中にエラーが発生しました。もう一度お試しください。
        </p>
      )}
      {status === "success" && meals.length === 0 && (
        <p className="search-page__message">料理が見つかりませんでした。</p>
      )}
      {status === "success" && meals.length > 0 && <MealList meals={meals} />}
    </section>
  );
}
