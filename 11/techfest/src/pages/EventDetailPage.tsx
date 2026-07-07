import { Link, useParams } from "react-router";
import { events } from "../data/events";
import NotFoundPage from "./NotFoundPage";

function EventDetailPage() {
  const { eventId } = useParams();

  const event = events.find((item) => item.id === eventId);

  if (!event) {
    return <NotFoundPage />;
  }

  return (
    <section className="page-section">
      <div className="container">
        <Link to="/events" className="back-link">
          ← イベント一覧へ戻る
        </Link>

        <article className="event-detail">
          <div className="event-detail-main">
            <p className="event-detail-category">{event.category}</p>

            <div className="event-detail-title">
              <span>{event.icon}</span>

              <div>
                <h1>{event.title}</h1>
                <p>{event.catchCopy}</p>
              </div>
            </div>

            <p className="event-detail-description">{event.description}</p>

            <section className="event-detail-section">
              <h2>体験できること</h2>

              <ul className="content-list">
                {event.contents.map((content) => (
                  <li key={content}>{content}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="event-info-card">
            <h2>開催情報</h2>

            <dl>
              <div>
                <dt>時間</dt>
                <dd>{event.time}</dd>
              </div>

              <div>
                <dt>会場</dt>
                <dd>{event.place}</dd>
              </div>

              <div>
                <dt>対象</dt>
                <dd>{event.target}</dd>
              </div>

              <div>
                <dt>参加費</dt>
                <dd>無料</dd>
              </div>
            </dl>

            <Link to="/access" className="button button-primary">
              会場へのアクセス
            </Link>
          </aside>
        </article>
      </div>
    </section>
  );
}

export default EventDetailPage;
