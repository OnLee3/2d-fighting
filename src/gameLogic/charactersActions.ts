import { AttackDirection, Character } from '../types';
import {
    attackAnimation,
    attackAnimation2,
    idleAnimation,
    idleAnimation2,
    runAnimation,
    runAnimation2,
} from '../utils/Sprite';

export const moveCharacter = (
    index: number,
    deltaX: number,
    setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
) => {
    setCharacters((prevCharacters) => {
        if (prevCharacters[index].attacking) {
            return prevCharacters;
        }

        const newCharacters = prevCharacters.map((char, i) =>
            i === index
                ? {
                      ...char,
                      x: Math.max(
                          0,
                          Math.min(char.x + deltaX, 928 - char.width)
                      ),
                      moving: true,
                      sprite: i === 0 ? runAnimation : runAnimation2,
                  }
                : char
        );

        const character1 = newCharacters[0];
        const character2 = newCharacters[1];

        if (
            character1.x < character2.x + character2.width &&
            character1.x + character1.width > character2.x &&
            character1.y < character2.y + character2.height &&
            character1.y + character1.height > character2.y
        ) {
            // If the characters are colliding, revert the position of the character that moved
            return prevCharacters;
        }

        return newCharacters;
    });
};

export const moveEndCharacter = (
    index: number,
    setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
) => {
    setCharacters((prevCharacters) => {
        if (prevCharacters[index].attacking) {
            return prevCharacters;
        }
        return prevCharacters.map((char, i) =>
            i === index
                ? {
                      ...char,
                      moving: false,
                      sprite: i === 0 ? idleAnimation : idleAnimation2,
                  }
                : {
                      ...char,
                      sprite: i === 0 ? idleAnimation : idleAnimation2,
                  }
        );
    });
};

export const handleAttack = (
    index: number,
    direction: AttackDirection,
    setCharacters: React.Dispatch<React.SetStateAction<Character[]>>,
    onAttackEnd: () => void
) => {
    setCharacters((prevCharacters) => {
        const newCharacters = [...prevCharacters];
        newCharacters[index].attacking = true;
        newCharacters[index].attackDirection = direction;
        newCharacters[index].frame = 0;
        newCharacters[index].sprite =
            index === 0 ? attackAnimation : attackAnimation2;

        const hitboxWidth = 120;
        const hitboxHeight = 10;
        const hitboxX =
            direction === 'right'
                ? newCharacters[index].x + newCharacters[index].width
                : newCharacters[index].x - hitboxWidth;
        const hitboxY =
            newCharacters[index].y +
            newCharacters[index].height / 2 -
            hitboxHeight / 2;

        checkCollision(
            index,
            hitboxX,
            hitboxY,
            hitboxWidth,
            hitboxHeight,
            setCharacters
        );

        onAttackEnd();

        return newCharacters;
    });
};

export const handleAttackEnd = (
    index: number,
    setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
) => {
    setCharacters((prevCharacters) => {
        const newCharacters = [...prevCharacters];
        newCharacters[index].attacking = false;
        newCharacters[index].sprite =
            index === 0 ? idleAnimation : idleAnimation2;
        return newCharacters;
    });
};

const checkCollision = (
    attackerIndex: number,
    hitboxX: number,
    hitboxY: number,
    hitboxWidth: number,
    hitboxHeight: number,
    setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
) => {
    const targetIndex = attackerIndex === 0 ? 1 : 0;

    setCharacters((prevCharacters) => {
        const target = prevCharacters[targetIndex];

        if (
            hitboxX < target.x + target.width &&
            hitboxX + hitboxWidth > target.x &&
            hitboxY < target.y + target.height &&
            hitboxY + hitboxHeight > target.y
        ) {
            if (prevCharacters[targetIndex].gracePeriod === 0) {
                const newCharacters = [...prevCharacters];
                newCharacters[targetIndex].hp -= 20;
                newCharacters[targetIndex].gracePeriod = 60; // Set the grace period to 60 frames (1 second)
                return newCharacters;
            }
        }

        return prevCharacters;
    });
};
