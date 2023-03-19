import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { useCharacters, initialCharacters } from './hooks/useCharacters';
import { drawCharacters } from './utils/drawCharacters';
import { useGameLoop } from './hooks/useGameLoop';
import { useGameControls } from './hooks/useGameControls';
import { updateCharacters } from './gameLogic/updateCharacters';
import { backgroundSprite } from './utils/Sprite';
import { BACKGROUND_HEIGHT, BACKGROUND_WIDTH } from './constants/dimensions';
import { findWinner } from './gameLogic/findWinner';

const App: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { characters, setCharacters } = useCharacters();
    const [winnerIndex, setWinnerIndex] = useState<number | null>(null);

    const resetGame = () => {
        setCharacters(initialCharacters);
        setWinnerIndex(null);
    };

    const { triggerEvents } = useGameControls(setCharacters);

    const update = useCallback(() => {
        const winnerIndex = findWinner(characters);
        if (winnerIndex !== null) {
            setWinnerIndex(winnerIndex);
        }
        if (winnerIndex === null) {
            triggerEvents();
        }
        updateCharacters(setCharacters);
    }, [characters, setCharacters, triggerEvents]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        backgroundSprite.draw(ctx, 0, 0);
        drawCharacters(ctx, characters);
    }, [characters]);

    useGameLoop(update, draw);

    return (
        <div className="App">
            <StyledCanvas
                ref={canvasRef}
                width={BACKGROUND_WIDTH}
                height={BACKGROUND_HEIGHT}
            />
            <Instructions>
                <p>Player 1: Move: A/D | Attack: F</p>
                <p>Player 2: Move: Left/Right Arrows | Attack: M</p>
            </Instructions>
            {winnerIndex !== null && (
                <GameOverOverlay>
                    {winnerIndex === -1 ? (
                        <p>It's a draw!</p>
                    ) : (
                        <p>Player {winnerIndex + 1} Wins!</p>
                    )}
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
