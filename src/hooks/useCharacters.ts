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
    gracePeriod: 0,
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
    gracePeriod: 0,
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
  setCharacters((prevCharacters) => {
    const newCharacters = prevCharacters.map((char, i) =>
      i === index ? { ...char, x: char.x + deltaX } : char
    );

    const character1 = newCharacters[0];
    const character2 = newCharacters[1];

    if (
      character1.x < character2.x + character2.width &&
      character1.x + character1.width > character2.x &&
      character1.y < character2.y + character2.height &&
      character1.y + character1.height > character2.y
    ) {
      // If the characters are colliding, revert the position of the character that moved
      return prevCharacters;
    }

    return newCharacters;
  });
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
      if (prevCharacters[targetIndex].gracePeriod === 0) {
        const newCharacters = [...prevCharacters];
        newCharacters[targetIndex].hp -= 10;
        newCharacters[targetIndex].gracePeriod = 60; // Set the grace period to 60 frames (1 second)
        return newCharacters;
      }
    }

    return prevCharacters;
  });
};

export const decrementGracePeriods = (
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
) => {
  setCharacters((prevCharacters) =>
    prevCharacters.map((char) =>
      char.gracePeriod > 0
        ? { ...char, gracePeriod: char.gracePeriod - 1 }
        : char
    )
  );
};
