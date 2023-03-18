// updateCharacters.ts
import { Character } from '../types';

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

            return updatedChar;
        })
    );
};
