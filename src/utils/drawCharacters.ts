import { Character } from '../types';

export const drawCharacters = (
    ctx: CanvasRenderingContext2D,
    characters: Character[]
) => {
    characters.forEach((char, i) => {
        /** blinking when hit. */
        if (char.gracePeriod % 2 === 0) {
            // Flip the Player 2 sprite
            const flip = i === 1;
            const frameIndex = char.frame % char.sprite.maxFrames;
            char.sprite.draw(ctx, char.x, char.y, frameIndex, flip);
        }
        /** HP */
        ctx.fillStyle = 'white';
        ctx.fillText(`HP: ${char.hp}`, char.x + char.sprite.width, char.y - 10);

        /** attack hitbox */
        // if (char.attacking) {
        //     ctx.fillStyle = 'yellow';
        //     const hitboxX =
        //         char.attackDirection === 'right'
        //             ? char.x + char.sprite.width
        //             : char.x + char.sprite.width - HITBOX_WIDTH;
        //     const hitboxY = char.y + char.height / 2 - HITBOX_HEIGHT / 2;
        //     ctx.fillRect(hitboxX, hitboxY, HITBOX_WIDTH, HITBOX_HEIGHT);
        // }
    });
};
