import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useMultiKeyPress } from "./hooks/useMultiKeyPress";
import {
  useCharacters,
  moveCharacter,
  handleAttack,
} from "./hooks/useCharacters";
import { drawCharacters } from "./utils/drawCharacters";

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { characters, setCharacters } = useCharacters();
  const attackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCharacters(ctx, characters);
    };

    const gameLoop = setInterval(() => {
      draw();
    }, 1000 / 60);

    return () => {
      clearInterval(gameLoop);
    };
  }, [canvasRef, characters]);

  useMultiKeyPress([
    {
      keys: ["a", "d", "ArrowLeft", "ArrowRight"],
      callback: (key: string) => {
        switch (key) {
          case "a":
            moveCharacter(0, -5, setCharacters);
            break;
          case "d":
            moveCharacter(0, 5, setCharacters);
            break;
          case "ArrowLeft":
            moveCharacter(1, -5, setCharacters);
            break;
          case "ArrowRight":
            moveCharacter(1, 5, setCharacters);
            break;
          default:
            break;
        }
      },
    },
    {
      keys: ["q", "p"],
      callback: (key) => {
        switch (key) {
          case "q":
            handleAttack(0, "right", setCharacters, () => {
              if (attackTimeoutRef.current) {
                clearTimeout(attackTimeoutRef.current);
              }
              attackTimeoutRef.current = setTimeout(() => {
                setCharacters((prevCharacters) => {
                  const newCharacters = [...prevCharacters];
                  newCharacters[0].attacking = false;
                  return newCharacters;
                });
              }, 300);
            });
            break;
          case "p":
            handleAttack(1, "left", setCharacters, () => {
              if (attackTimeoutRef.current) {
                clearTimeout(attackTimeoutRef.current);
              }
              attackTimeoutRef.current = setTimeout(() => {
                setCharacters((prevCharacters) => {
                  const newCharacters = [...prevCharacters];
                  newCharacters[1].attacking = false;
                  return newCharacters;
                });
              }, 300);
            });
            break;
          default:
            break;
        }
      },
    },
  ]);

  return (
    <div className="App">
      <StyledCanvas
        ref={canvasRef}
        width={800}
        height={400}
        style={{ border: "1px solid black" }}
      />
      <Instructions>
        <p>Player 1: Move: A/D | Attack: Q</p>
        <p>Player 2: Move: Left/Right Arrows | Attack: P</p>
      </Instructions>
    </div>
  );
};

export default App;

const StyledCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  background-color: #222;
`;

const Instructions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  color: #000;
`;
