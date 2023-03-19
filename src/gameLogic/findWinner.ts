import { Character } from '../types';

export const findWinner = (characters: Character[]) => {
    if (characters[0].hp <= 0 && characters[1].hp <= 0) {
        return -1;
    } else {
        const winnerIndex = characters.findIndex((char) => char.hp <= 0);
        if (winnerIndex !== -1) {
            return winnerIndex === 0 ? 1 : 0;
        }
    }
    return null;
};
