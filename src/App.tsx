import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useCharacters, initialCharacters } from './hooks/useCharacters';
import { drawCharacters } from './utils/drawCharacters';

import { useGameLoop } from './hooks/useGameLoop';
import { decrementGracePeriods } from './gameLogic/gracePeriod';
import { useGameControls } from './hooks/useGameControls';
import backgroundImage from '../assets/Background.png';

const App: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { characters, setCharacters } = useCharacters();
    const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
    const [backgroundImageElement, setBackgroundImageElement] =
        useState<HTMLImageElement | null>(null);

    const resetGame = () => {
        setCharacters(initialCharacters);
        setWinnerIndex(null);
    };

    const update = useCallback(() => {
        decrementGracePeriods(setCharacters);
        const winnerIndex = characters.findIndex((char) => char.hp <= 0);
        if (winnerIndex !== -1) {
            setWinnerIndex(winnerIndex === 0 ? 1 : 0);
        }
    }, [characters, setCharacters]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (backgroundImageElement) {
            const imageAspectRatio =
                backgroundImageElement.width / backgroundImageElement.height;
            const canvasHeight = canvas.width / imageAspectRatio;
            canvas.height = canvasHeight;

            ctx.drawImage(
                backgroundImageElement,
                0,
                0,
                canvas.width,
                canvas.height
            );
        }

        drawCharacters(ctx, characters);
    }, [backgroundImageElement, characters]);

    useEffect(() => {
        const image = new Image();
        image.src = backgroundImage;
        image.onload = () => {
            setBackgroundImageElement(image);
        };
    }, []);

    useGameLoop(update, draw);
    useGameControls(setCharacters);

    return (
        <div className="App">
            <StyledCanvas ref={canvasRef} width={928} height={400} />
            <Instructions>
                <p>Player 1: Move: A/D | Attack: Q</p>
                <p>Player 2: Move: Left/Right Arrows | Attack: P</p>
            </Instructions>
            {winnerIndex !== null && (
                <GameOverOverlay>
                    <p>Player {winnerIndex + 1} Wins!</p>
                    <button onClick={resetGame}>Restart Game</button>
                </GameOverOverlay>
            )}
        </div>
    );
};

export default App;

const StyledCanvas = styled.canvas`
    width: 100%;
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

const GameOverOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;

    p {
        font-size: 24px;
        margin-bottom: 20px;
    }

    button {
        background-color: #fff;
        color: #000;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
    }
`;
