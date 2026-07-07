function AboutPage() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <p className="section-label">ABOUT</p>
          <h1>開催概要</h1>
          <p>
            TECH FEST
            2026は、ITの仕事や学びを身近に感じられる体験型イベントです。
          </p>
        </div>

        <div className="about-lead">
          <p>
            ITの世界には、Webサイトを作る人、ゲームを作る人、AIを活用する人、
            アプリを企画する人など、多くの仕事があります。
          </p>

          <p>
            TECH FESTでは、さまざまな分野を実際に体験しながら、
            自分の「好き」や「得意」を見つけるきっかけを提供します。
          </p>
        </div>

        <section className="about-section">
          <h2>イベント情報</h2>

          <dl className="overview-list">
            <div>
              <dt>イベント名</dt>
              <dd>TECH FEST 2026</dd>
            </div>

            <div>
              <dt>開催日</dt>
              <dd>2026年7月26日（日）</dd>
            </div>

            <div>
              <dt>開催時間</dt>
              <dd>10:00〜16:30</dd>
            </div>

            <div>
              <dt>会場</dt>
              <dd>さいたまIT・WEB専門学校</dd>
            </div>

            <div>
              <dt>参加費</dt>
              <dd>無料</dd>
            </div>
          </dl>
        </section>

        <section className="about-section">
          <h2>当日のスケジュール</h2>

          <div className="schedule-list">
            <div className="schedule-item">
              <time>10:00</time>
              <p>生成AI体験ワークショップ</p>
            </div>

            <div className="schedule-item">
              <time>11:20</time>
              <p>Webサイト制作体験</p>
            </div>

            <div className="schedule-item">
              <time>13:00</time>
              <p>ゲーム開発体験</p>
            </div>

            <div className="schedule-item">
              <time>14:20</time>
              <p>スマホアプリ企画体験</p>
            </div>

            <div className="schedule-item">
              <time>15:40</time>
              <p>卒業生キャリアトーク</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default AboutPage;
