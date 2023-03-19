import { useState } from 'react';
import { Character } from '../types';
import { idleAnimation, idleAnimation2 } from '../utils/Sprite';

export const initialCharacters: Character[] = [
    {
        x: 50,
        y: 345,
        velocityY: 0,
        width: 25,
        height: 40,
        hp: 100,
        attacking: false,
        attackDirection: 'right',
        gracePeriod: 0,
        frame: 0,
        frameCounter: 0,
        moving: false,
        sprite: idleAnimation,
    },
    {
        x: 700,
        y: 345,
        velocityY: 0,
        width: 25,
        height: 40,
        hp: 100,
        attacking: false,
        attackDirection: 'left',
        gracePeriod: 0,
        frame: 0,
        frameCounter: 0,
        moving: false,
        sprite: idleAnimation2,
    },
];

export const useCharacters = () => {
    const [characters, setCharacters] =
        useState<Character[]>(initialCharacters);
    return { characters, setCharacters };
};
