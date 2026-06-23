import { useEffect, useState } from "react";
import "./App.css";

type Article = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const DISPLAY_LIMIT = 10;
const ALL_USERS = "all";

function App() {
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(ALL_USERS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // ユーザーID絞り込み
  // ユーザーIDを配列に変換して、重複を削除して、ソートする
  const userIds = [
    ...new Set(articleList.map((article) => article.userId)),
  ].sort((a, b) => a - b);

  // 検索ワード絞り込み
  // タイトルに検索ワードが含まれている記事を抽出
  const filteredArticleList = articleList
    .filter((article) => {
      return article.title.toLowerCase().includes(searchText.toLowerCase());
    })
    .filter((article) => {
      if (selectedUserId === ALL_USERS) {
        return true;
      }

      return article.userId === Number(selectedUserId);
    })
    // 10件制限
    .slice(0, DISPLAY_LIMIT);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("データの取得に失敗しました");
        }

        return response.json();
      })
      .then((data) => {
        const requests = data.map((article: Article) => {
          return article;
        });
        return Promise.all(requests);
      })
      .then((articleData) => {
        setArticleList(articleData);
        setIsLoading(false);
      })
      .catch(() => {
        setError("データの取得に失敗しました");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <header className="hero">
        <h1>記事一覧</h1>

        <p>JSONPlaceholderから取得したデータを表示しています。</p>
      </header>

      <main className="container">
        {isLoading && <p className="message">読み込み中...</p>}
        {error && <p className="error">{error}</p>}

        {!isLoading && !error && (
          <>
            <div className="controls">
              <input
                className="search-input"
                type="text"
                placeholder="タイトルで検索"
                value={searchText}
                onChange={(event) => {
                  setSearchText(event.target.value);
                }}
              />

              <select
                className="user-filter"
                value={selectedUserId}
                onChange={(event) => {
                  setSelectedUserId(event.target.value);
                }}
              >
                <option value={ALL_USERS}>すべてのユーザー</option>
                {userIds.map((userId) => (
                  <option key={userId} value={userId}>
                    ユーザー ID: {userId}
                  </option>
                ))}
              </select>
            </div>

            <p className="result-count">
              表示件数: {filteredArticleList.length} / {DISPLAY_LIMIT} 件
            </p>

            <div className="article-grid">
              {filteredArticleList.map((article) => (
                <article className="article-card" key={article.id}>
                  <p className="article-number">No.{article.id}</p>
                  <p className="article-user-id">User ID: {article.userId}</p>

                  <h2>{article.title}</h2>
                  <p className="article-body">{article.body}</p>
                </article>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
