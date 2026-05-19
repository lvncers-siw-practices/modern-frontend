type GameFeatureCardProps = {
  icon: string;
  title: string;
  catchCopy: string;
  description: string;
  badge: string;
};

export default function GameFeatureCard(props: GameFeatureCardProps) {
  const { icon, title, catchCopy, description, badge } = props;

  return (
    <article className="feature-card">
      <div className="feature-icon">{icon}</div>
      <p className="feature-badge">{badge}</p>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-catch">{catchCopy}</p>
      <p className="feature-description">{description}</p>
    </article>
  );
}
