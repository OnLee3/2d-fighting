import { useState } from "react";
import { Character, AttackDirection } from "../types";

const initialCharacters: Character[] = [
  {
    x: 50,
    y: 200,
    width: 40,
    height: 60,
    color: "red",
    hp: 100,
    attacking: false,
    attackDirection: "right",
  },
  {
    x: 700,
    y: 200,
    width: 40,
    height: 60,
    color: "blue",
    hp: 100,
    attacking: false,
    attackDirection: "left",
  },
];

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  return { characters, setCharacters };
};

export const moveCharacter = (
  index: number,
  deltaX: number,
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
) => {
  setCharacters((prevCharacters) =>
    prevCharacters.map((char, i) =>
      i === index ? { ...char, x: char.x + deltaX } : char
    )
  );
};

export const handleAttack = (
  index: number,
  direction: AttackDirection,
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>,
  onAttackEnd: () => void
) => {
  setCharacters((prevCharacters) => {
    const newCharacters = [...prevCharacters];
    newCharacters[index].attacking = true;
    newCharacters[index].attackDirection = direction;

    const hitboxWidth = 40;
    const hitboxHeight = 10;
    const hitboxX =
      direction === "right"
        ? newCharacters[index].x + newCharacters[index].width
        : newCharacters[index].x - hitboxWidth;
    const hitboxY =
      newCharacters[index].y +
      newCharacters[index].height / 2 -
      hitboxHeight / 2;

    checkCollision(
      index,
      hitboxX,
      hitboxY,
      hitboxWidth,
      hitboxHeight,
      setCharacters
    );

    onAttackEnd();

    return newCharacters;
  });
};
const checkCollision = (
  attackerIndex: number,
  hitboxX: number,
  hitboxY: number,
  hitboxWidth: number,
  hitboxHeight: number,
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
) => {
  const targetIndex = attackerIndex === 0 ? 1 : 0;

  setCharacters((prevCharacters) => {
    const target = prevCharacters[targetIndex];

    if (
      hitboxX < target.x + target.width &&
      hitboxX + hitboxWidth > target.x &&
      hitboxY < target.y + target.height &&
      hitboxY + hitboxHeight > target.y
    ) {
      const newCharacters = [...prevCharacters];
      newCharacters[targetIndex].hp -= 10;
      return newCharacters;
    }

    return prevCharacters;
  });
};
