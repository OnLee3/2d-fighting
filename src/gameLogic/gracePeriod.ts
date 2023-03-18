import { Character } from '../types';

export const decrementGracePeriods = (
    setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
) => {
    setCharacters((prevCharacters) =>
        prevCharacters.map((char) =>
            char.gracePeriod > 0
                ? { ...char, gracePeriod: char.gracePeriod - 1 }
                : char
        )
    );
};
