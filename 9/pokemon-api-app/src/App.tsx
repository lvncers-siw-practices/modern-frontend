import { useEffect, useState } from "react";
import "./App.css";

type Pokemon = {
  id: number;
  name: string;
  image: string;
};

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchText, setSearchText] = useState("");

  const filteredPokemonList = pokemonList.filter((pokemon) => {
    return pokemon.name.includes(searchText.toLowerCase());
  });

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

        return Promise.all(requests);
      })
      .then((pokemonData) => {
        setPokemonList(pokemonData);
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
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
        />

        <div className="pokemon-grid">
          {filteredPokemonList.map((pokemon) => (
            <div className="pokemon-card" key={pokemon.id}>
              <p className="pokemon-number">No.{pokemon.id}</p>

              <img src={pokemon.image} alt={pokemon.name} />

              <h2>{pokemon.name}</h2>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
