import { useEffect, useState } from "react";
import "./App.css";

type Pokemon = {
  name: string;
  url: string;
};

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const requests = data.results.map((pokemon: { url: string }) => {
          return fetch(pokemon.url)
            .then((response) => {
              return response.json();
            })
            .then((detailData) => {
              return {
                id: detailData.id,
                name: detailData.name,
                image: detailData.sprites.front_default,
              };
            });
        });

        console.log(requests);
      });
  }, []);

  return (
    <div className="app">
      <header className="hero">
        <h1>ポケモン図鑑</h1>

        <p>PokeAPIから取得したデータを表示しています。</p>
      </header>

      <main className="container">
        <input
          className="search-input"
          type="text"
          placeholder="ポケモン名で検索"
        />
      </main>
    </div>
  );
}

export default App;
