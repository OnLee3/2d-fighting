// gameLogic.ts
import { SetStateAction, Dispatch, useRef } from 'react';
import { Character } from '../types';
import { handleAttack, moveCharacter } from './useCharacters';
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

    useMultiKeyPress([
        {
            keys: ['a', 'd', 'ArrowLeft', 'ArrowRight'],
            callback: (key: string) => {
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
            },
        },
        {
            keys: ['q', 'p'],
            callback: (key) => {
                switch (key) {
                    case 'q':
                        handleAttack(0, 'right', setCharacters, () => {
                            if (attackTimeoutRef1.current) {
                                clearTimeout(attackTimeoutRef1.current);
                            }
                            attackTimeoutRef1.current = setTimeout(() => {
                                setCharacters((prevCharacters) => {
                                    const newCharacters = [...prevCharacters];
                                    newCharacters[0].attacking = false;
                                    return newCharacters;
                                });
                            }, 300);
                        });
                        break;
                    case 'p':
                        handleAttack(1, 'left', setCharacters, () => {
                            if (attackTimeoutRef2.current) {
                                clearTimeout(attackTimeoutRef2.current);
                            }
                            attackTimeoutRef2.current = setTimeout(() => {
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
};
