// src/hooks/useCharacters.ts
import { useState } from "react";
import { Character } from "../types";

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([
    {
      x: 50,
      y: 200,
      width: 50,
      height: 100,
      color: "blue",
      hp: 100,
      attacking: false,
      attackDirection: "right",
    },
    {
      x: 250,
      y: 200,
      width: 50,
      height: 100,
      color: "red",
      hp: 100,
      attacking: false,
      attackDirection: "left",
    },
  ]);

  return { characters, setCharacters };
};
