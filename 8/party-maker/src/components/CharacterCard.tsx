import React from "react";
import "../App.css";

type CharacterStatus = {
  name: string;
  job: string;
  personality: string;
  hp: number;
  attack: number;
  magic: number;
  speed: number;
};

type CharacterCardProps = {
  character: CharacterStatus;
};

function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className="character-card">
      <h2>{character.name}</h2>
      <p>職業：{character.job}</p>
      <p>性格：{character.personality}</p>

      <div className="status-list">
        <p>HP：{character.hp}</p>
        <p>攻撃：{character.attack}</p>
        <p>魔力：{character.magic}</p>
        <p>素早さ：{character.speed}</p>
      </div>
    </div>
  );
}

export default CharacterCard;
