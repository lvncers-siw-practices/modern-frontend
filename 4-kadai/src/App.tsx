import ProfileCard from "./components/ProfileCard";
import "./style.css";

function App() {
  return (
    <div className="app">
      <main className="container">
        <h1>開発チーム紹介</h1>

        <ProfileCard
          name="野中"
          job="リーダー"
          message="仕様変更にも負けません。"
        />
        <ProfileCard
          name="ネオ・野中"
          job="デザイナー"
          message="余白にこだわります。"
        />
        <ProfileCard
          name="真・野中"
          job="エンジニア"
          message="エラー文と友達です。"
        />
      </main>
    </div>
  );
}

export default App;
