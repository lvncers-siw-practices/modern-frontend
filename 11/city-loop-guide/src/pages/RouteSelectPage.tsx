import RouteButton from "../components/RouteButton";
import { routes } from "../data/routes";

function RouteSelectPage() {
  return (
    <section className="section section-gray">
      <div className="container">
        <div className="section-heading">
          <h2>路線を選ぶ</h2>
          <p>確認したい路線を選択してください。</p>
        </div>

        <div className="route-grid">
          {routes.map((route) => (
            <RouteButton key={route.id} route={route} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RouteSelectPage;
