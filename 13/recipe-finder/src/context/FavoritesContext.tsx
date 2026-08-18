import { createContext, useContext, useState, type ReactNode } from "react";

import type { Meal } from "../types/meal";

type FavoritesContextType = {
  favorites: Meal[];
  addFavorite: (meal: Meal) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

type FavoritesProviderProps = {
  children: ReactNode;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Meal[]>([]);

  const addFavorite = (meal: Meal) => {
    setFavorites((currentFavorites) => {
      const alreadyExists = currentFavorites.some(
        (favorite) => favorite.idMeal === meal.idMeal,
      );

      if (alreadyExists) return currentFavorites;

      return [...currentFavorites, meal];
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((favorite) => favorite.idMeal !== id),
    );
  };

  const isFavorite = (id: string) => {
    return favorites.some((favorite) => favorite.idMeal === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error("useFavoritesはFavoritesProviderの内側で使用してください。");
  }

  return context;
}
