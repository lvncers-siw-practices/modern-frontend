import { NavLink } from "react-router";

function getLinkClassName({ isActive }: { isActive: boolean }) {
  return isActive ? "nav__link nav__link--active" : "nav__link";
}

export default function Navigation() {
  return (
    <nav className="nav">
      <NavLink to="/" end className={getLinkClassName}>
        検索
      </NavLink>
      <NavLink to="/favorites" className={getLinkClassName}>
        お気に入り
      </NavLink>
    </nav>
  );
}
