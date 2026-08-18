import { Route, Routes } from "react-router";
import Navigation from "./components/Navigation";
import FavoritesPage from "./pages/FavoritesPage";
import MealDetailPage from "./pages/MealDetailPage";
import SearchPage from "./pages/SearchPage";

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <p className="app-header__label">RECIPE FINDER</p>
        <h1>料理を検索しよう</h1>
        <Navigation />
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/meals/:id" element={<MealDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </div>
  );
}
