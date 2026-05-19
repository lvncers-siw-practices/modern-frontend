import "../style.css";

type ProfileCardProps = {
  name: string;
  job: string;
  message: string;
};

export default function ProfileCard(props: ProfileCardProps) {
  const { name, job, message } = props;

  return (
    <section className="card">
      <h2 className="cardh2">{name}</h2>
      <p className="cardp">{job}</p>
      <p className="cardp">{message}</p>
    </section>
  );
}
