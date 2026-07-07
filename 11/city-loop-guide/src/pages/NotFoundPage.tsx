import { Link } from "react-router";

function NotFoundPage() {
  return (
    <section className="not-found">
      <div className="container">
        <p className="not-found-code">404</p>

        <h1>ページが見つかりません</h1>

        <p>
          指定された路線または駅は存在しないか、
          <br />
          移動または削除された可能性があります。
        </p>

        <Link to="/" className="button button-primary">
          路線選択へ戻る
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
