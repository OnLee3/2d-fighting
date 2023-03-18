import { SetStateAction, Dispatch, useRef } from 'react';
import {
    handleAttack,
    moveEndCharacter,
    moveCharacter,
    handleAttackEnd,
} from '../gameLogic/charactersActions';
import { Character } from '../types';
import { useMultiKeyPress } from './useMultiKeyPress';

export const useGameControls = (
    setCharacters: Dispatch<SetStateAction<Character[]>>
) => {
    const attackTimeoutRef1 = useRef<ReturnType<typeof setTimeout> | null>(
        null
    );
    const attackTimeoutRef2 = useRef<ReturnType<typeof setTimeout> | null>(
        null
    );

    const handleMove = (key: string) => {
        switch (key) {
            case 'a':
                moveCharacter(0, -5, setCharacters);
                break;
            case 'd':
                moveCharacter(0, 5, setCharacters);
                break;
            case 'ArrowLeft':
                moveCharacter(1, -5, setCharacters);
                break;
            case 'ArrowRight':
                moveCharacter(1, 5, setCharacters);
                break;
            default:
                break;
        }
    };

    const handleMoveEnd = (key: string) => {
        const playerIndex = key === 'a' || key === 'd' ? 0 : 1;
        moveEndCharacter(playerIndex, setCharacters);
    };

    const handleAttackKeyPress = (key: string) => {
        switch (key) {
            case 'q':
                handleAttack(0, 'right', setCharacters, () => {
                    if (attackTimeoutRef1.current) {
                        clearTimeout(attackTimeoutRef1.current);
                    }
                    attackTimeoutRef1.current = setTimeout(() => {
                        handleAttackEnd(0, setCharacters);
                    }, 300);
                });
                break;
            case 'p':
                handleAttack(1, 'left', setCharacters, () => {
                    if (attackTimeoutRef2.current) {
                        clearTimeout(attackTimeoutRef2.current);
                    }
                    attackTimeoutRef2.current = setTimeout(() => {
                        handleAttackEnd(1, setCharacters);
                    }, 300);
                });
                break;
            default:
                break;
        }
    };

    useMultiKeyPress([
        {
            keys: ['a', 'd', 'ArrowLeft', 'ArrowRight'],
            keyDownCallback: handleMove,
            keyUpCallback: handleMoveEnd,
        },
        {
            keys: ['q', 'p'],
            keyDownCallback: handleAttackKeyPress,
        },
    ]);
};
