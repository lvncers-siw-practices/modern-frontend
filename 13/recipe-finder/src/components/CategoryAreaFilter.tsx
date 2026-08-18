import { useEffect, useState } from "react";
import { getAreas, getCategories } from "../data/mealApi";

type CategoryAreaFilterProps = {
  onSelectCategory: (category: string) => void;
  onSelectArea: (area: string) => void;
};

export default function CategoryAreaFilter({
  onSelectCategory,
  onSelectArea,
}: CategoryAreaFilterProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");

  useEffect(() => {
    getCategories().then(setCategories);
    getAreas().then(setAreas);
  }, []);

  function handleCategoryChange(value: string) {
    setCategory(value);
    setArea("");
    if (value !== "") onSelectCategory(value);
  }

  function handleAreaChange(value: string) {
    setArea(value);
    setCategory("");
    if (value !== "") onSelectArea(value);
  }

  return (
    <div className="filter-search">
      <label className="filter-search__field">
        <span className="filter-search__label">カテゴリで探す</span>
        <select
          className="filter-search__select"
          value={category}
          onChange={(event) => handleCategoryChange(event.target.value)}
        >
          <option value="">選択してください</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="filter-search__field">
        <span className="filter-search__label">地域で探す</span>
        <select
          className="filter-search__select"
          value={area}
          onChange={(event) => handleAreaChange(event.target.value)}
        >
          <option value="">選択してください</option>
          {areas.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
