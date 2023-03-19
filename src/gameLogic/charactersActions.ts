import {
    BACKGROUND_WIDTH,
    HITBOX_HEIGHT,
    HITBOX_WIDTH,
} from '../constants/dimensions';
import { AttackDirection, Character } from '../types';
import {
    attackAnimation,
    attackAnimation2,
    hitAnimation,
    hitAnimation2,
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

        if (prevCharacters[index].gracePeriod >= 30) {
            return prevCharacters;
        }

        const newCharacters = prevCharacters.map((char, i) =>
            i === index
                ? {
                      ...char,
                      x: Math.max(
                          0,
                          Math.min(
                              char.x + deltaX,
                              BACKGROUND_WIDTH - char.width
                          )
                      ),
                      moving: true,
                      sprite: i === 0 ? runAnimation : runAnimation2,
                  }
                : char
        );

        const character1 = newCharacters[0];
        const character2 = newCharacters[1];

        if (
            // checkCollision({
            //     x: character1.x,
            //     y: character1.y,
            //     width: character1.width,
            //     height: character1.height,
            //     targetX: character2.x,
            //     targetY: character2.y,
            //     targetWidth: character2.width,
            //     targetHeight: character2.height,
            // })
            character1.x < character2.x + character2.width &&
            character1.x + character1.width > character2.x
        ) {
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
        return prevCharacters.map((char, i) => {
            if (char.gracePeriod >= 30) {
                return char;
            }
            const isCurrentCharacter = i === index;
            const isAttacking = char.attacking;
            const isCharacter1 = i === 0;

            return {
                ...char,
                moving: isCurrentCharacter ? false : char.moving,
                sprite: isAttacking
                    ? isCharacter1
                        ? attackAnimation
                        : attackAnimation2
                    : isCharacter1
                    ? idleAnimation
                    : idleAnimation2,
            };
        });
    });
};

export const handleAttack = (
    index: number,
    direction: AttackDirection,
    setCharacters: React.Dispatch<React.SetStateAction<Character[]>>,
    onAttackEnd: () => void
) => {
    setCharacters((prevCharacters) => {
        if (prevCharacters[index].gracePeriod >= 30) {
            onAttackEnd();
            return prevCharacters;
        }
        const targetIndex = 1 - index;
        const newCharacters = [...prevCharacters];
        newCharacters[index].attacking = true;
        newCharacters[index].attackDirection = direction;
        newCharacters[index].frame = 0;
        newCharacters[index].sprite =
            index === 0 ? attackAnimation : attackAnimation2;
        const hitboxX =
            direction === 'right'
                ? newCharacters[index].x + newCharacters[index].sprite.width / 2
                : newCharacters[index].x +
                  newCharacters[index].sprite.width / 2 -
                  HITBOX_WIDTH +
                  25; // left look assets has 30px padding on the right
        const hitboxY =
            newCharacters[index].y +
            newCharacters[index].height / 2 -
            HITBOX_HEIGHT / 2;

        if (
            checkCollision({
                x: hitboxX,
                y: hitboxY,
                width: HITBOX_WIDTH,
                height: HITBOX_HEIGHT,
                targetX:
                    newCharacters[targetIndex].x +
                    newCharacters[index].sprite.width / 2,
                targetY: newCharacters[targetIndex].y,
                targetWidth: newCharacters[targetIndex].width,
                targetHeight: newCharacters[targetIndex].height,
            }) &&
            newCharacters[targetIndex].gracePeriod === 0
        ) {
            newCharacters[targetIndex].hp -= 20;
            newCharacters[targetIndex].gracePeriod = 60; // Set the grace period to 60 frames (1 second)
            newCharacters[targetIndex].x =
                newCharacters[targetIndex].x + (index === 0 ? 25 : -25);
            targetIndex === 0
                ? (newCharacters[targetIndex].sprite = hitAnimation)
                : (newCharacters[targetIndex].sprite = hitAnimation2);
        }

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

const checkCollision = ({
    x,
    y,
    width,
    height,
    targetX,
    targetY,
    targetWidth,
    targetHeight,
}: {
    x: number;
    y: number;
    width: number;
    height: number;
    targetX: number;
    targetY: number;
    targetWidth: number;
    targetHeight: number;
}) => {
    return (
        x < targetX + targetWidth &&
        x + width > targetX &&
        y < targetY + targetHeight &&
        y + height > targetY
    );
};
