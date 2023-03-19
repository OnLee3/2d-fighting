import { GROUND_HEIGHT } from '../constants/dimensions';
import { Character } from '../types';

const applyGravity = (char: Character): Character => {
    const newY = char.y + char.velocityY;

    if (newY >= GROUND_HEIGHT) {
        return {
            ...char,
            y: GROUND_HEIGHT,
            velocityY: 0,
        };
    } else {
        return {
            ...char,
            y: newY,
            velocityY: char.velocityY + 1, // Gravity constant
        };
    }
};

export const updateCharacters = (
    setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
) => {
    setCharacters((prevCharacters) =>
        prevCharacters.map((char) => {
            const updatedChar = { ...char };

            if (char.gracePeriod > 0) {
                updatedChar.gracePeriod = char.gracePeriod - 1;
            }

            if (char.frameCounter % 6 === 0) {
                updatedChar.frame = char.frame + 1;
            }

            updatedChar.frameCounter = char.frameCounter + 1;

            return applyGravity(updatedChar);
        })
    );
};
