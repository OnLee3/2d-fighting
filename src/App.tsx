import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
    useCharacters,
    decrementGracePeriods,
    initialCharacters,
} from './hooks/useCharacters';
import { drawCharacters } from './utils/drawCharacters';
import { useGameControls } from './hooks/gameLogic';

const App: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { characters, setCharacters } = useCharacters();
    const [winnerIndex, setWinnerIndex] = useState<number | null>(null);

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
        drawCharacters(ctx, characters);
    }, [characters]);

    const gameLoop = useCallback(() => {
        update();
        draw();
    }, [update, draw]);

    useEffect(() => {
        const animationId = requestAnimationFrame(gameLoop);
        return () => cancelAnimationFrame(animationId);
    }, [gameLoop]);

    useGameControls(setCharacters);

    return (
        <div className="App">
            <StyledCanvas
                ref={canvasRef}
                width={800}
                height={400}
                style={{ border: '1px solid black' }}
            />
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
