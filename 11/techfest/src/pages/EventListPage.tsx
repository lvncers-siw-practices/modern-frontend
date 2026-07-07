import EventCard from "../components/EventCard";
import { events } from "../data/events";

function EventListPage() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <p className="section-label">EVENTS</p>
          <h1>イベント一覧</h1>
          <p>興味のあるイベントを選択すると、詳しい内容を確認できます。</p>
        </div>

        <div className="event-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default EventListPage;
