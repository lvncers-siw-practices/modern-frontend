import { useRef, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";
import CategoryFilter from "./components/CategoryFilter";

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

      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="product-list">
        {filteredProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}

export default App;
