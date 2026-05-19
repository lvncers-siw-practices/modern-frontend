import Hero from "./components/Hero";
import Footer from "./components/Footer";
import GameFeatureCard from "./components/GameFeatureCard";

function App() {
  return (
    <div className="app">
      <Hero />

      <main className="main">
        <section className="features-section">
          <h2 className="section-title">このゲームの特徴</h2>
          <p className="section-lead">
            伝説になる準備はできていますか？もちろん良い意味とは限りません。
          </p>

          <div className="feature-grid">
            <GameFeatureCard
              icon="⚔️"
              title="ゲームバランス"
              catchCopy="完全無視！"
              description="序盤のスライムがラスボスより強い、常識破壊型RPGです。勝てるかどうかではなく、耐えられるかどうかが問われます。"
              badge="理不尽"
            />

            <GameFeatureCard
              icon="💸"
              title="DLC"
              catchCopy="総額48,000円！"
              description="本編よりDLCの方が長い安心設計です。追加衣装、追加武器、追加エンディング、そして追加の追加料金をお楽しみください。"
              badge="財布特攻"
            />

            <GameFeatureCard
              icon="🧍"
              title="キャラクター"
              catchCopy="魅力、行方不明！"
              description="誰も傷つけないように作られた結果、誰の記憶にも残らないキャラクターたちが大集合します。"
              badge="無難"
            />

            <GameFeatureCard
              icon="🏆"
              title="発売前評価"
              catchCopy="すでに伝説級！"
              description="発売前から不安の声が集まり、逆に注目度だけは最高潮です。期待値の低さが、唯一の安全装置です。"
              badge="話題性MAX"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
