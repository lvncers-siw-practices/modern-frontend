import { useState } from "react";
import "./App.css";
import CharacterCard from "./components/CharacterCard";

function App() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("戦士");
  const [personality, setPersonality] = useState("熱血");

  const [characters, setCharacters] = useState([
    { name: "", job: "戦士", personality: "熱血" },
    { name: "", job: "黒魔道士", personality: "冷静" },
    { name: "", job: "白魔道士", personality: "やさしい" },
  ]);

  {characters.map((character, index) => (
    <div className="form-card" key={index}>
      <h2>{index + 1}人目</h2>
      <input
        type="text"
        placeholder="名前"
        value={character.name}
        onChange={(e) => setCharacters(characters.map((c, i) => i === index ? { ...c, name: e.target.value } : c))}
      />
      <select
        value={character.job}
        onChange={(e) => setCharacters(characters.map((c, i) => i === index ? { ...c, job: e.target.value } : c))}
      >
        <option value="戦士">戦士</option>
        <option value="黒魔道士">黒魔道士</option>
        <option value="白魔道士">白魔道士</option>
      </select>
    </div>
  ))}

  function handleChange(
    index: number,
    field: "name" | "job" | "personality",
    value: string
  ) {
    const newCharacters = [...characters];
  
    newCharacters[index] = {
      ...newCharacters[index],
      [field]: value,
    };
  
    setCharacters(newCharacters);
  }

  function getJobStatus(job: string) {
    if (job === "戦士") {
      return { hp: 120, attack: 85, magic: 10, speed: 40 };
    }
  
    if (job === "黒魔道士") {
      return { hp: 70, attack: 25, magic: 100, speed: 45 };
    }
  
    if (job === "白魔道士") {
      return { hp: 80, attack: 30, magic: 90, speed: 50 };
    }
  
    if (job === "シーフ") {
      return { hp: 85, attack: 55, magic: 25, speed: 100 };
    }
  
    if (job === "竜騎士") {
      return { hp: 105, attack: 75, magic: 20, speed: 70 };
    }
  
    return { hp: 90, attack: 50, magic: 50, speed: 50 };
  }

  function getPersonalityBonus(personality: string) {
    if (personality === "熱血") {
      return { hp: 20, attack: 15, magic: -5, speed: 0 };
    }
  
    if (personality === "冷静") {
      return { hp: 0, attack: 0, magic: 15, speed: 5 };
    }
  
    if (personality === "やさしい") {
      return { hp: 10, attack: -5, magic: 20, speed: 0 };
    }
  
    if (personality === "せっかち") {
      return { hp: -5, attack: 5, magic: 0, speed: 20 };
    }
  
    if (personality === "怠け者") {
      return { hp: 30, attack: -10, magic: -10, speed: -15 };
    }
  
    return { hp: 0, attack: 0, magic: 0, speed: 0 };
  }

  function getRandomBonus() {
    return Math.floor(Math.random() * 21) - 10;
  }

  function createStatus(character: CharacterInput): CharacterStatus {
    const jobStatus = getJobStatus(character.job);
    const personalityBonus = getPersonalityBonus(character.personality);
  
    return {
      name: character.name,
      job: character.job,
      personality: character.personality,
      hp: Math.max(0, jobStatus.hp + personalityBonus.hp + getRandomBonus()),
      attack: Math.max(0, jobStatus.attack + personalityBonus.attack + getRandomBonus()),
      magic: Math.max(0, jobStatus.magic + personalityBonus.magic + getRandomBonus()),
      speed: Math.max(0, jobStatus.speed + personalityBonus.speed + getRandomBonus()),
    };
  }

  const [createdCharacters, setCreatedCharacters] = useState<CharacterStatus[]>([]);

  function handleCreate() {
    const newCreatedCharacters = characters.map((character, index) => {
      if (character.name === "") {
        return createStatus({
          ...character,
          name: `${index + 1}人目の名無し`,
        });
      }
  
      return createStatus(character);
    });
  
    setCreatedCharacters(newCreatedCharacters);
  }

  return (

<main className="app">
      <h1>伝説のパーティ作成</h1>
      <p>3人の名前・職業・性格を決めて、冒険に出る前のステータスを作成します。</p>
    {createdCharacters.map((character) => (
      <CharacterCard character={character} key={character.name} />
    ))}
    </main>
  );
}

export default App;
