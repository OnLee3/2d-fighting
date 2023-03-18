// Sprite.ts
import idleSprite from '../../assets/_idle.png';

export class Sprite {
    image: HTMLImageElement;
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;

    constructor(
        src: string,
        width: number,
        height: number,
        offsetX: number,
        offsetY: number
    ) {
        this.image = new Image();
        this.image.src = src;
        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    draw(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        frameIndex: number
    ) {
        ctx.drawImage(
            this.image,
            frameIndex * this.width + this.offsetX,
            this.offsetY,
            this.width,
            this.height,
            x,
            y,
            this.width,
            this.height
        );
    }
}

export const IDLE_SPRITE_WIDTH = 120;
export const IDLE_SPRIT_HEIGHT = 80;
export const IDLE_SPRITE_OFFSET_X = 40; // Adjust these values based on the actual padding in the sprite image
export const IDLE_SPRITE_OFFSET_Y = 40;
export const idleAnimation = new Sprite(
    idleSprite,
    IDLE_SPRITE_WIDTH,
    IDLE_SPRIT_HEIGHT,
    IDLE_SPRITE_OFFSET_X,
    IDLE_SPRITE_OFFSET_Y
);
