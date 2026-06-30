import { useRef, useState } from "react";
import "./App.css";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  isRecommended: boolean;
};

const products: Product[] = [
  {
    id: 1,
    name: "ノートPC",
    price: 120000,
    category: "PC",
    description: "持ち運びしやすい軽量ノートパソコンです。",
    isRecommended: true,
  },
  {
    id: 2,
    name: "ゲーミングPC",
    price: 198000,
    category: "PC",
    description: "高性能なグラフィックボードを搭載しています。",
    isRecommended: false,
  },
  {
    id: 3,
    name: "スマートフォン",
    price: 98000,
    category: "スマホ",
    description: "高性能カメラを搭載した人気モデルです。",
    isRecommended: true,
  },
  {
    id: 4,
    name: "ワイヤレスイヤホン",
    price: 14800,
    category: "周辺機器",
    description: "ノイズキャンセリング機能付きのイヤホンです。",
    isRecommended: false,
  },
  {
    id: 5,
    name: "液晶モニター",
    price: 32800,
    category: "周辺機器",
    description: "作業しやすい27インチのモニターです。",
    isRecommended: true,
  },
];

function App() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.includes(searchText);
    const matchesCategory =
      selectedCategory === "すべて" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  function handleFocusClick() {
    searchInputRef.current?.focus();
  }

  return (
    <div className="container">
      <header className="header">
        <h1>商品一覧アプリ</h1>
        <p>商品を検索し、カテゴリごとに絞り込みできます。</p>
      </header>

      <div className="search-area">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="商品名を入力"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <button onClick={handleFocusClick}>検索欄へ移動</button>
      </div>

      <div className="category-area">
        <p>カテゴリー</p>
        <div className="category-buttons">
          <button onClick={() => setSelectedCategory("すべて")}>すべて</button>
          <button onClick={() => setSelectedCategory("PC")}>PC</button>
          <button onClick={() => setSelectedCategory("スマホ")}>スマホ</button>
          <button onClick={() => setSelectedCategory("周辺機器")}>
            周辺機器
          </button>
        </div>
      </div>

      <div className="product-list">
        {filteredProducts.map((product) => {
          return (
            <div className="product-card" key={product.id}>
              <h2>{product.name}</h2>
              <p>価格：{product.price}円</p>
              <p>カテゴリー：{product.category}</p>
              <p>{product.description}</p>
              {product.isRecommended && (
                <p className="recommended">★おすすめ</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
