import { useState } from 'react';
import { Character } from '../types';

export const initialCharacters: Character[] = [
    {
        x: 50,
        y: 345,
        width: 70,
        height: 100,
        color: 'red',
        hp: 100,
        attacking: false,
        attackDirection: 'right',
        gracePeriod: 0,
        frame: 0,
    },
    {
        x: 700,
        y: 345,
        width: 70,
        height: 100,
        color: 'blue',
        hp: 100,
        attacking: false,
        attackDirection: 'left',
        gracePeriod: 0,
        frame: 0,
    },
];

export const useCharacters = () => {
    const [characters, setCharacters] =
        useState<Character[]>(initialCharacters);
    return { characters, setCharacters };
};
