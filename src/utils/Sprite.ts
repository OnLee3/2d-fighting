import idleSprite from '../../assets/_idle.png';
import backgroundImage from '../../assets/Background.png';

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
        offsetX = 0,
        offsetY = 0
    ) {
        this.image = new Image();
        this.image.src = src;
        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    draw(ctx: CanvasRenderingContext2D, x: number, y: number, frameIndex = 0) {
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

// Add these exports for the background sprite
export const BACKGROUND_WIDTH = 928;
export const BACKGROUND_HEIGHT = 500;
export const backgroundSprite = new Sprite(
    backgroundImage,
    BACKGROUND_WIDTH,
    BACKGROUND_HEIGHT
);

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
