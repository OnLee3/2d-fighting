import { SetStateAction, Dispatch, useRef, useCallback, useMemo } from 'react';
import { GROUND_HEIGHT } from '../constants/dimensions';
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
    const attackCooldowns = useRef(new Set<number>());
    const attackTimeoutRef1 = useRef<ReturnType<typeof setTimeout> | null>(
        null
    );
    const attackTimeoutRef2 = useRef<ReturnType<typeof setTimeout> | null>(
        null
    );

    const handleMove = useCallback(
        (key: string) => {
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
        [setCharacters]
    );

    const handleMoveEnd = useCallback(
        (key: string) => {
            const playerIndex = key === 'a' || key === 'd' ? 0 : 1;
            moveEndCharacter(playerIndex, setCharacters);
        },
        [setCharacters]
    );

    const handleAttackKeyPress = useCallback(
        (key: string) => {
            switch (key) {
                case 'f':
                    if (!attackCooldowns.current.has(0)) {
                        attackCooldowns.current.add(0);
                        handleAttack(0, 'right', setCharacters, () => {
                            if (attackTimeoutRef1.current) {
                                clearTimeout(attackTimeoutRef1.current);
                            }
                            attackTimeoutRef1.current = setTimeout(() => {
                                handleAttackEnd(0, setCharacters);
                                attackCooldowns.current.delete(0);
                            }, 500);
                        });
                    }
                    break;
                case 'm':
                    if (!attackCooldowns.current.has(1)) {
                        attackCooldowns.current.add(1);
                        handleAttack(1, 'left', setCharacters, () => {
                            if (attackTimeoutRef2.current) {
                                clearTimeout(attackTimeoutRef2.current);
                            }
                            attackTimeoutRef2.current = setTimeout(() => {
                                handleAttackEnd(1, setCharacters);
                                attackCooldowns.current.delete(1);
                            }, 500);
                        });
                    }
                    break;
                default:
                    break;
            }
        },
        [setCharacters]
    );

    const handleJump = useCallback(
        (index: number) => {
            setCharacters((prevCharacters) => {
                if (prevCharacters[index].attacking) {
                    return prevCharacters;
                }

                if (prevCharacters[index].gracePeriod >= 30) {
                    return prevCharacters;
                }

                if (prevCharacters[index].y >= GROUND_HEIGHT) {
                    return prevCharacters.map((char, i) =>
                        i === index
                            ? {
                                  ...char,
                                  velocityY: -12, // Jump strength
                                  //   sprite: i === 0 ? jumpAnimation : jumpAnimation2,
                              }
                            : char
                    );
                }
                return prevCharacters;
            });
        },
        [setCharacters]
    );

    const keyBindings = useMemo(
        () => [
            {
                keys: ['w', 'ArrowUp'],
                keyDownCallback: (key: string) => {
                    const playerIndex = key === 'w' ? 0 : 1;
                    handleJump(playerIndex);
                },
            },
            {
                keys: ['a', 'd', 'ArrowLeft', 'ArrowRight'],
                keyDownCallback: handleMove,
                keyUpCallback: handleMoveEnd,
            },
            {
                keys: ['f', 'm'],
                keyDownCallback: handleAttackKeyPress,
            },
        ],
        [handleAttackKeyPress, handleJump, handleMove, handleMoveEnd]
    );

    return useMultiKeyPress(keyBindings);
};
