import { Link } from "react-router";

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="site-logo">
          <span className="site-logo-mark">T</span>

          <span>
            <span className="site-logo-main">TECH FEST</span>
            <span className="site-logo-sub">2026</span>
          </span>
        </Link>

        <nav aria-label="メインメニュー">
          <ul className="global-nav">
            <li>
              <Link to="/">トップ</Link>
            </li>
            <li>
              <Link to="/events">イベント</Link>
            </li>
            <li>
              <Link to="/about">開催概要</Link>
            </li>
            <li>
              <Link to="/access">アクセス</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
