import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [grade, setGrade] = useState("4年生");
  const [entryType, setEntryType] = useState("一般参加");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <main className="app">
      <h1>イベント参加申込フォーム</h1>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">氏名</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="grade">学年</label>
          <select
            id="grade"
            value={grade}
            onChange={(event) => {
              setGrade(event.target.value);
            }}
          >
            <option value="1年生">1年生</option>
            <option value="2年生">2年生</option>
            <option value="3年生">3年生</option>
            <option value="4年生">4年生</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="entryType">参加区分</label>
          <select
            id="entryType"
            value={entryType}
            onChange={(event) => {
              setEntryType(event.target.value);
            }}
          >
            <option value="一般参加">一般参加</option>
            <option value="スタッフ参加">スタッフ参加</option>
            <option value="見学">見学</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="reason">参加理由</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(event) => {
              setReason(event.target.value);
            }}
          />
        </div>

        <button type="submit">送信する</button>
      </form>

      {isSubmitted && (
        <div className="result-card">
          <h2>送信内容</h2>

          <div className="result-item">
            <strong>氏名：</strong>
            {name}
          </div>

          <div className="result-item">
            <strong>学年：</strong>
            {grade}
          </div>

          <div className="result-item">
            <strong>参加区分：</strong>
            {entryType}
          </div>

          <div className="result-item">
            <strong>参加理由：</strong>
            {reason}
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
