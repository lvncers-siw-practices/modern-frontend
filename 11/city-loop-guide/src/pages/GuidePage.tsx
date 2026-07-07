function GuidePage() {
  return (
    <section className="page-section">
      <div className="container">
        <section className="about-section">
          <h2>路線案内サイトの使い方</h2>

          <div className="flow-list">
            <div className="flow-item">
              <p className="flow-number">01</p>
              <h3>路線を選ぶと、停車駅を確認できます。</h3>
            </div>

            <div className="flow-item">
              <p className="flow-number">02</p>
              <h3>乗換情報がある駅では、他の路線へ移動できます。</h3>
            </div>

            <div className="flow-item">
              <p className="flow-number">03</p>
              <h3>運行状況は実際の情報ではありません。</h3>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default GuidePage;
