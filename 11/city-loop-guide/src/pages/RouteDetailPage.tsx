import { Link, useParams } from "react-router";
import { routes } from "../data/routes";
import NotFoundPage from "./NotFoundPage";

function RouteDetailPage() {
  const { routeId } = useParams();

  const route = routes.find((item) => item.id === routeId);

  if (!route) {
    return <NotFoundPage />;
  }

  return (
    <section className="page-section">
      <div className="container">
        <Link to="/" className="back-link">
          ← 路線選択へ戻る
        </Link>

        <article className="route-detail">
          <h1>{route.name}</h1>

          <p className="route-detail-endpoints">
            {route.start} → {route.goal}
          </p>

          <p className="route-detail-description">{route.description}</p>

          <section className="route-detail-section">
            <h2>停車駅</h2>

            <ol className="stop-list">
              {route.stops.map((stop) => (
                <li key={stop.name} className="stop-item">
                  <p className="stop-item-name">{stop.name}</p>

                  {stop.transfer && (
                    <p className="stop-item-transfer">乗換：{stop.transfer}</p>
                  )}
                </li>
              ))}
            </ol>
          </section>
        </article>
      </div>
    </section>
  );
}

export default RouteDetailPage;
