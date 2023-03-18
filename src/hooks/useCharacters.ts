import { useState } from 'react';
import { Character } from '../types';

export const initialCharacters: Character[] = [
    {
        x: 50,
        y: 200,
        width: 40,
        height: 60,
        color: 'red',
        hp: 100,
        attacking: false,
        attackDirection: 'right',
        gracePeriod: 0,
    },
    {
        x: 700,
        y: 200,
        width: 40,
        height: 60,
        color: 'blue',
        hp: 100,
        attacking: false,
        attackDirection: 'left',
        gracePeriod: 0,
    },
];

export const useCharacters = () => {
    const [characters, setCharacters] =
        useState<Character[]>(initialCharacters);
    return { characters, setCharacters };
};
