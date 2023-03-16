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

  useMultiKeyPress(["a", "d", "ArrowLeft", "ArrowRight"], (key: string) => {
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
  });

  useMultiKeyPress(["q", "p"], (key) => {
    switch (key) {
      case "q":
        handleAttack(0, "right", setCharacters);
        break;
      case "p":
        handleAttack(1, "left", setCharacters);
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
