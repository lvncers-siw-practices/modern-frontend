function AccessPage() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <p className="section-label">ACCESS</p>
          <h1>アクセス</h1>
          <p>会場までのアクセス方法をご案内します。</p>
        </div>

        <div className="access-layout">
          <div className="access-map">
            <p>SAITAMA IT & WEB COLLEGE</p>
            <span>会場</span>
          </div>

          <div className="access-info">
            <h2>さいたまIT・WEB専門学校</h2>

            <dl className="overview-list">
              <div>
                <dt>住所</dt>
                <dd>〒330-0000 埼玉県さいたま市〇〇区〇〇 1-2-3</dd>
              </div>

              <div>
                <dt>最寄駅</dt>
                <dd>JRさいたま駅 東口から徒歩5分</dd>
              </div>

              <div>
                <dt>受付</dt>
                <dd>A棟 1階エントランス</dd>
              </div>
            </dl>

            <div className="access-note">
              <h3>ご来場時のお願い</h3>

              <ul>
                <li>受付で「TECH FESTに参加」とお伝えください。</li>
                <li>公共交通機関をご利用ください。</li>
                <li>イベントごとに会場が異なる場合があります。</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccessPage;
