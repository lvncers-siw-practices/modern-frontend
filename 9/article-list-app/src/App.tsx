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

  const userIds = [...new Set(articleList.map((article) => article.userId))].sort(
    (a, b) => a - b,
  );

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
    .slice(0, DISPLAY_LIMIT);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
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
      });
  }, []);

  return (
    <div className="app">
      <header className="hero">
        <h1>記事一覧</h1>

        <p>JSONPlaceholderから取得したデータを表示しています。</p>
      </header>

      <main className="container">
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
      </main>
    </div>
  );
}

export default App;
