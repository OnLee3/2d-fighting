import { Character } from '../types';

export const drawCharacters = (
    ctx: CanvasRenderingContext2D,
    characters: Character[]
) => {
    characters.forEach((char, i) => {
        if (char.gracePeriod % 2 === 0) {
            ctx.fillStyle = char.color;
            ctx.fillRect(char.x, char.y, char.width, char.height);
        }
        ctx.fillStyle = 'white';
        ctx.fillText(`HP: ${char.hp}`, char.x, char.y - 10);

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
