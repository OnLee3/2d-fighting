import { Character } from '../types';
import { idleAnimation } from './Sprite';

export const drawCharacters = (
    ctx: CanvasRenderingContext2D,
    characters: Character[]
) => {
    characters.forEach((char, i) => {
        /** blinking when hit. */
        if (char.gracePeriod % 2 === 0) {
            const frameIndex = char.frame % 10;
            idleAnimation.draw(ctx, char.x, char.y, frameIndex);
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
