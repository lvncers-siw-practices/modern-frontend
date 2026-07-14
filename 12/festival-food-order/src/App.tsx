function App() {
  return (
    <div className="app">
      <header className="app-header">
        <p className="app-header__label">SCHOOL FESTIVAL 2026</p>
        <h1>学園祭フード注文</h1>
        <p>食べたいメニューを選択し、現在の注文内容を確認できます。</p>
      </header>

      <main className="app-main">
        <section className="menu-section">
          <div className="section-heading">
            <div>
              <p className="section-heading__label">MENU</p>
              <h2>フードメニュー</h2>
            </div>
          </div>

          <p className="preparation-message">商品一覧は次の章で作成します。</p>
        </section>

        <aside className="cart-panel">
          <div className="cart-panel__header">
            <div>
              <p className="section-heading__label">ORDER</p>
              <h2>注文内容</h2>
            </div>

            <span className="cart-count">0点</span>
          </div>

          <p className="empty-cart">商品が追加されていません。</p>
        </aside>
      </main>
    </div>
  );
}

export default App;
