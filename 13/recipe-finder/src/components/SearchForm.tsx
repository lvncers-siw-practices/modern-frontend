import { useState } from "react";
import type { FormEvent } from "react";

type SearchFormProps = {
  onSearch: (query: string) => void;
};

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed === "") return;
    onSearch(trimmed);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-form__input"
        placeholder="料理名を入力（例: chicken）"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="料理名"
      />
      <button type="submit" className="search-form__button">
        検索
      </button>
    </form>
  );
}
