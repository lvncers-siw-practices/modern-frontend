import { Route, Routes } from "react-router";
import RouteSelectPage from "./pages/RouteSelectPage";
import RouteDetailPage from "./pages/RouteDetailPage";
import GuidePage from "./pages/GuidePage";
import NotFoundPage from "./pages/NotFoundPage";
import AppHeader from "./components/AppHeader";

function App() {
  return (
    <div className="app">
      <AppHeader />

      <main>
        <Routes>
          <Route path="/" element={<RouteSelectPage />} />
          <Route path="/route/:routeId" element={<RouteDetailPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
