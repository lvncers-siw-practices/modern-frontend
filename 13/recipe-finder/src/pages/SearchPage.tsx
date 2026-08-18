import { useState } from "react";
import CategoryAreaFilter from "../components/CategoryAreaFilter";
import MealList from "../components/MealList";
import SearchForm from "../components/SearchForm";
import TodaysPicks from "../components/TodaysPicks";
import {
  filterMealsByArea,
  filterMealsByCategory,
  searchMeals,
} from "../data/mealApi";
import type { MealSummary } from "../types/meal";

type SearchStatus = "idle" | "loading" | "success" | "error";

export default function SearchPage() {
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [status, setStatus] = useState<SearchStatus>("idle");

  async function runSearch(fetcher: () => Promise<MealSummary[]>) {
    setStatus("loading");
    try {
      const result = await fetcher();
      setMeals(result);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function handleSearch(query: string) {
    runSearch(() => searchMeals(query));
  }

  function handleSelectCategory(category: string) {
    runSearch(() => filterMealsByCategory(category));
  }

  function handleSelectArea(area: string) {
    runSearch(() => filterMealsByArea(area));
  }

  return (
    <section className="search-page">
      <TodaysPicks />

      <SearchForm onSearch={handleSearch} />
      <CategoryAreaFilter
        onSelectCategory={handleSelectCategory}
        onSelectArea={handleSelectArea}
      />

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
