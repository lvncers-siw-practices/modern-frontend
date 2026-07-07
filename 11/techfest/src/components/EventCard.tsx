import { Link } from "react-router";
import type { TechEvent } from "../data/events";

type EventCardProps = {
  event: TechEvent;
};

function EventCard({ event }: EventCardProps) {
  return (
    <Link to={`/events/${event.id}`} className="event-card">
      <div className="event-card-icon">{event.icon}</div>

      <div className="event-card-body">
        <p className="event-card-category">{event.category}</p>

        <h3>{event.title}</h3>

        <p className="event-card-copy">{event.catchCopy}</p>

        <div className="event-card-meta">
          <span>{event.time}</span>
          <span>{event.place}</span>
        </div>

        <span className="event-card-link">詳細を見る →</span>
      </div>
    </Link>
  );
}

export default EventCard;
