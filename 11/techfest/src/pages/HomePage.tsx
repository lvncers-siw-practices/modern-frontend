import { Link } from "react-router";

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <p className="hero-label">OPEN CAMPUS EVENT</p>

          <h1>
            好きなことを、
            <br />
            テクノロジーで
            <br />
            仕事にする。
          </h1>

          <p className="hero-text">
            Web制作、ゲーム開発、生成AI、アプリ企画。
            <br />
            ITの世界を実際に体験できる特別な1日です。
          </p>

          <div className="hero-info">
            <p>
              <span>開催日</span>
              2026.07.26 SUN
            </p>

            <p>
              <span>時間</span>
              10:00 - 16:30
            </p>
          </div>

          <Link to="/events" className="button button-primary">
            イベント一覧を見る
          </Link>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div className="section-heading">
            <p className="section-label">ABOUT TECH FEST</p>
            <h2>TECH FESTとは</h2>
            <p>
              ITの世界を体験しながら、自分の好きな分野を見つけるイベントです。
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <p className="feature-number">01</p>
              <h3>実際に手を動かす</h3>
              <p>
                パソコンを使いながら、Webページやゲームを作る体験ができます。
              </p>
            </article>

            <article className="feature-card">
              <p className="feature-number">02</p>
              <h3>好きな分野を見つける</h3>
              <p>
                AI、Web、ゲーム、アプリなど、さまざまなIT分野に触れられます。
              </p>
            </article>

            <article className="feature-card">
              <p className="feature-number">03</p>
              <h3>進路のヒントを得る</h3>
              <p>
                在校生や卒業生の話を通して、ITを学んだ先の進路を知ることができます。
              </p>
            </article>
          </div>

          <div className="section-button">
            <Link to="/about" className="button button-outline">
              開催概要を見る
            </Link>
          </div>
        </div>
      </section>

      <section className="callout">
        <div className="container callout-inner">
          <div>
            <p className="section-label">ACCESS</p>
            <h2>参加は無料です</h2>
            <p>
              事前申込なしでも参加できます。
              <br />
              お気軽に会場へお越しください。
            </p>
          </div>

          <Link to="/access" className="button button-light">
            会場へのアクセス
          </Link>
        </div>
      </section>
    </>
  );
}

export default HomePage;
