import { Character } from '../types';
import {
    attackAnimation,
    attackAnimation2,
    idleAnimation,
    idleAnimation2,
    runAnimation,
    runAnimation2,
} from './Sprite';

export const drawCharacters = (
    ctx: CanvasRenderingContext2D,
    characters: Character[]
) => {
    characters.forEach((char, i) => {
        /** blinking when hit. */
        if (char.gracePeriod % 2 === 0) {
            let animationSprite;

            if (char.attacking) {
                animationSprite = i === 0 ? attackAnimation : attackAnimation2;
            } else {
                animationSprite =
                    i === 0
                        ? char.moving
                            ? runAnimation
                            : idleAnimation
                        : char.moving
                        ? runAnimation2
                        : idleAnimation2;
            }
            // Flip the Player 2 sprite
            const flip = i === 1;
            const frameIndex = char.frame % animationSprite.maxFrames;
            animationSprite.draw(ctx, char.x, char.y, frameIndex, flip);
        }
        /** HP */
        ctx.fillStyle = 'white';
        ctx.fillText(`HP: ${char.hp}`, char.x, char.y - 10);

        /** attack hitbox */
        if (char.attacking) {
            ctx.fillStyle = 'yellow';
            const hitboxWidth = 120;
            const hitboxHeight = 10;
            const hitboxX =
                char.attackDirection === 'right'
                    ? char.x + char.width
                    : char.x - hitboxWidth;
            const hitboxY = char.y + char.height / 2 - hitboxHeight / 2;
            ctx.fillRect(hitboxX, hitboxY, hitboxWidth, hitboxHeight);
        }
    });
};
