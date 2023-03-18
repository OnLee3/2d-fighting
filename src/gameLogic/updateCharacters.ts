import { Character } from '../types';

export const updateCharacters = (
    setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
) => {
    setCharacters((prevCharacters) =>
        prevCharacters.map((char) => {
            const updatedChar = { ...char, frame: char.frame + 1 };

            if (char.gracePeriod > 0) {
                updatedChar.gracePeriod = char.gracePeriod - 1;
            }

            return updatedChar;
        })
    );
};
