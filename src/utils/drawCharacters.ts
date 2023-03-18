import { Character } from '../types';
import idleSprite from '../../assets/_idle.png';

const idleImage = new Image();
idleImage.src = idleSprite;

export const drawCharacters = (
    ctx: CanvasRenderingContext2D,
    characters: Character[]
) => {
    const spriteWidth = 1200;
    const spriteHeight = 80;
    const frameWidth = spriteWidth / 10;
    const frameHeight = spriteHeight;

    characters.forEach((char, i) => {
        /** blinking when hit. */
        if (char.gracePeriod % 2 === 0) {
            const frameIndex = char.frame % 10;
            ctx.drawImage(
                idleImage,
                frameIndex * frameWidth,
                0,
                frameWidth,
                frameHeight,
                char.x,
                char.y,
                frameWidth,
                frameHeight
            );
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
