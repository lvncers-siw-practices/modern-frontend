import "../App.css";

export default function Hero() {
  return (
    <header className="hero">
      <p className="hero-label">完全新作・未完成ファンタジーRPG</p>
      <h1 className="hero-title">LEGEND OF BUGS</h1>
      <p className="hero-copy">
        バグか、仕様か。
        <br />
        遊ぶもの全てを困惑させる、次世代グダグダファンタジー。
      </p>
      <button className="hero-button">今すぐ予約する</button>
      <p className="hero-note">※予約しても発売日に来るかはわかりません。</p>
    </header>
  );
}
