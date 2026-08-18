import { useEffect, useState } from "react";
import { getRandomMeals } from "../data/mealApi";
import type { Meal } from "../types/meal";
import MealList from "./MealList";

type TodaysPicksStatus = "loading" | "success" | "error";

export default function TodaysPicks() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [status, setStatus] = useState<TodaysPicksStatus>("loading");

  useEffect(() => {
    let cancelled = false;

    getRandomMeals(3)
      .then((result) => {
        if (cancelled) return;
        setMeals(result);
        setStatus("success");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "error") return null;

  return (
    <section className="todays-picks">
      <h3 className="todays-picks__heading">今日の一品</h3>
      {status === "loading" && (
        <p className="search-page__message">準備中...</p>
      )}
      {status === "success" && <MealList meals={meals} />}
    </section>
  );
}
