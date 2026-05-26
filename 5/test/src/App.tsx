import { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <main>
      <h1>授業情報</h1>

      <div>
        <button onClick={() => setActiveTab("overview")}>概要</button>
        <button onClick={() => setActiveTab("content")}>学習内容</button>
        <button onClick={() => setActiveTab("notice")}>注意事項</button>
      </div>

      {activeTab === "overview" && (
        <section>
          <h2>概要</h2>
          <p>この授業ではReactとTypeScriptの基礎を学習します。</p>
        </section>
      )}

      {activeTab === "content" && (
        <section>
          <h2>学習内容</h2>
          <p>コンポーネント、props、state、イベント処理を扱います。</p>
        </section>
      )}

      {activeTab === "notice" && (
        <section>
          <h2>注意事項</h2>
          <p>コードは実際に動かしながら確認してください。</p>
        </section>
      )}
    </main>
  );
}

export default App;
