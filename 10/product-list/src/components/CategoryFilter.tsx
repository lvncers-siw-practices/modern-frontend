type CategoryFilterProps = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="category-area">
      <p>カテゴリー</p>
      <div className="category-buttons">
        <button onClick={() => onSelectCategory("すべて")}>すべて</button>
        <button onClick={() => onSelectCategory("PC")}>PC</button>
        <button onClick={() => onSelectCategory("スマホ")}>スマホ</button>
        <button onClick={() => onSelectCategory("周辺機器")}>周辺機器</button>
      </div>
      <p>選択中：{selectedCategory}</p>
    </div>
  );
}

export default CategoryFilter;
