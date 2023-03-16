import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useMultiKeyPress } from "./hooks/useMultiKeyPress";
import { useCharacters, Character } from "./hooks/useCharacters";

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { characters, setCharacters } = useCharacters();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      characters.forEach((char, i) => {
        ctx.fillStyle = char.color;
        ctx.fillRect(char.x, char.y, char.width, char.height);
        ctx.fillStyle = "white";
        ctx.fillText(`HP: ${char.hp}`, char.x, char.y - 10);
      });
    };

    const gameLoop = setInterval(() => {
      draw();
    }, 1000 / 60);

    return () => {
      clearInterval(gameLoop);
    };
  }, [canvasRef, characters]);

  const moveCharacter = (index: number, deltaX: number) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((char, i) =>
        i === index ? { ...char, x: char.x + deltaX } : char
      )
    );
  };

  const attack = (attackerIndex: number, damage: number) => {
    const attacker = characters[attackerIndex];
    const targetIndex = attackerIndex === 0 ? 1 : 0;
    const target = characters[targetIndex];

    const isInRange = Math.abs(attacker.x + attacker.width - target.x) <= 10;

    if (isInRange) {
      setCharacters((prevCharacters) =>
        prevCharacters.map((char, i) =>
          i === targetIndex
            ? { ...char, hp: Math.max(0, char.hp - damage) }
            : char
        )
      );
    }
  };

  useMultiKeyPress(
    ["a", "d", "ArrowLeft", "ArrowRight", "q", "p"],
    (key: string) => {
      switch (key) {
        case "a":
          moveCharacter(0, -5);
          break;
        case "d":
          moveCharacter(0, 5);
          break;
        case "ArrowLeft":
          moveCharacter(1, -5);
          break;
        case "ArrowRight":
          moveCharacter(1, 5);
          break;
        case "q":
          attack(0, 10);
          break;
        case "p":
          attack(1, 10);
          break;
        default:
          break;
      }
    }
  );

  return (
    <div className="App">
      <StyledCanvas
        ref={canvasRef}
        width={800}
        height={400}
        style={{ border: "1px solid black" }}
      />
    </div>
  );
};

export default App;

const StyledCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  background-color: #222;
`;
