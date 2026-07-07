import { Link } from "react-router";

function AppHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="site-logo">
          <span className="site-logo-mark">C</span>

          <span>
            <span className="site-logo-main">CITY LOOP</span>
            <span className="site-logo-sub">GUIDE</span>
          </span>
        </Link>

        <nav aria-label="メインメニュー">
          <ul className="global-nav">
            <li>
              <Link to="/">路線を選ぶ</Link>
            </li>
            <li>
              <Link to="/guide">利用案内</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
