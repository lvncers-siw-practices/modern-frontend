import { Link } from "react-router";
import type { RouteInfo } from "../data/routes";

type RouteButtonProps = {
  route: RouteInfo;
};

function RouteButton({ route }: RouteButtonProps) {
  return (
    <Link to={`/route/${route.id}`} className="route-card">
      <h3>{route.name}</h3>

      <p className="route-card-endpoints">
        {route.start} → {route.goal}
      </p>
    </Link>
  );
}

export default RouteButton;
