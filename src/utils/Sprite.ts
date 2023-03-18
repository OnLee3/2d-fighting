import idleSprite from '../../assets/_idle.png';

export class Sprite {
    image: HTMLImageElement;
    width: number;
    height: number;

    constructor(src: string, width: number, height: number) {
        this.image = new Image();
        this.image.src = src;
        this.width = width;
        this.height = height;
    }

    draw(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        frameIndex: number
    ) {
        ctx.drawImage(
            this.image,
            frameIndex * this.width,
            0,
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
export const idleAnimation = new Sprite(
    idleSprite,
    IDLE_SPRITE_WIDTH,
    IDLE_SPRIT_HEIGHT
);
