// src/hooks/useCharacters.ts
import { useState } from "react";

export interface Character {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  hp: number;
}

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([
    { x: 50, y: 200, width: 50, height: 100, color: "blue", hp: 100 },
    { x: 250, y: 200, width: 50, height: 100, color: "red", hp: 100 },
  ]);

  return { characters, setCharacters };
};
