import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useMultiKeyPress } from "./hooks/useMultiKeyPress";
import { useCharacters } from "./hooks/useCharacters";
import { AttackDirection } from "./types";

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

        if (char.attacking) {
          ctx.fillStyle = "yellow";
          const hitboxWidth = 40;
          const hitboxHeight = 10;
          const hitboxX =
            char.attackDirection === "right"
              ? char.x + char.width
              : char.x - hitboxWidth;
          const hitboxY = char.y + char.height / 2 - hitboxHeight / 2;
          ctx.fillRect(hitboxX, hitboxY, hitboxWidth, hitboxHeight);
        }
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

  const checkCollision = (
    attackerIndex: number,
    hitboxX: number,
    hitboxY: number,
    hitboxWidth: number,
    hitboxHeight: number
  ) => {
    const targetIndex = attackerIndex === 0 ? 1 : 0;
    const target = characters[targetIndex];

    if (
      hitboxX < target.x + target.width &&
      hitboxX + hitboxWidth > target.x &&
      hitboxY < target.y + target.height &&
      hitboxY + hitboxHeight > target.y
    ) {
      setCharacters((prevCharacters) => {
        const newCharacters = [...prevCharacters];
        newCharacters[targetIndex].hp -= 10;
        return newCharacters;
      });
    }
  };

  const handleAttack = (index: number, direction: AttackDirection) => {
    setCharacters((prevCharacters) => {
      const newCharacters = [...prevCharacters];
      newCharacters[index].attacking = true;
      newCharacters[index].attackDirection = direction;

      setTimeout(() => {
        newCharacters[index].attacking = false;
      }, 300);

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

      checkCollision(index, hitboxX, hitboxY, hitboxWidth, hitboxHeight);

      return newCharacters;
    });
  };

  useMultiKeyPress(["a", "d", "ArrowLeft", "ArrowRight"], (key: string) => {
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
      default:
        break;
    }
  });

  useMultiKeyPress(["q", "p"], (key) => {
    switch (key) {
      case "q":
        handleAttack(0, "right");
        break;
      case "p":
        handleAttack(1, "left");
        break;
      default:
        break;
    }
  });

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
