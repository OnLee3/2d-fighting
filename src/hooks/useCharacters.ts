import { useState } from 'react';
import { Character } from '../types';
import { IDLE_SPRITE_WIDTH, IDLE_SPRIT_HEIGHT } from '../utils/Sprite';

export const initialCharacters: Character[] = [
    {
        x: 50,
        y: 345,
        width: IDLE_SPRITE_WIDTH,
        height: IDLE_SPRIT_HEIGHT,
        color: 'red',
        hp: 100,
        attacking: false,
        attackDirection: 'right',
        gracePeriod: 0,
        frame: 0,
        frameCounter: 0,
    },
    {
        x: 700,
        y: 345,
        width: IDLE_SPRITE_WIDTH,
        height: IDLE_SPRIT_HEIGHT,
        color: 'blue',
        hp: 100,
        attacking: false,
        attackDirection: 'left',
        gracePeriod: 0,
        frame: 0,
        frameCounter: 0,
    },
];

export const useCharacters = () => {
    const [characters, setCharacters] =
        useState<Character[]>(initialCharacters);
    return { characters, setCharacters };
};
