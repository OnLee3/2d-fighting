import idleSprite from '../../assets/_Idle.png';
import idleSprite2 from '../../assets/_Idle_2.png';
import runSprite from '../../assets/_Run.png';
import runSprite2 from '../../assets/_Run_2.png';
import backgroundImage from '../../assets/Background.png';
import attack from '../../assets/_Attack.png';
import attack2 from '../../assets/_Attack_2.png';

export class Sprite {
    image: HTMLImageElement;
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    scale: number;
    maxFrames: number;

    constructor(
        src: string,
        width: number,
        height: number,
        offsetX = 0,
        offsetY = 0,
        scale = 1,
        maxFrames = 10
    ) {
        this.image = new Image();
        this.image.src = src;
        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.scale = scale;
        this.maxFrames = maxFrames;
    }

    public draw(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        frameIndex = 0,
        flip = false
    ) {
        const scaleX = flip ? -1 : 1;

        ctx.save();
        ctx.scale(scaleX, 1);
        ctx.drawImage(
            this.image,
            frameIndex * this.width + this.offsetX,
            this.offsetY,
            this.width,
            this.height,
            x * scaleX,
            y,
            this.width * this.scale * scaleX,
            this.height * this.scale
        );
        ctx.restore();
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
export const IDLE_SPRIT_SCALE = 2;
export const IDLE_SPRITE_OFFSET_X = 20; // Adjust these values based on the actual padding in the sprite image
export const IDLE_SPRITE_OFFSET_Y = 40;
export const IDLE_SPRITE_2_OFFSET_X = -10; // Adjust these values based on the actual padding in the sprite image
export const IDLE_SPRITE_MAX_FRAME = 10; // Adjust these values based on the actual padding in the sprite image

const ATTACK_SPRITE_WIDTH = 120;
const ATTACK_SPRITE_HEIGHT = 80;
const ATTACK_SPRITE_SCALE = 2;
const ATTACK_SPRITE_MAX_FRAME = 6;

export const idleAnimation = new Sprite(
    idleSprite,
    IDLE_SPRITE_WIDTH,
    IDLE_SPRIT_HEIGHT,
    IDLE_SPRITE_OFFSET_X,
    IDLE_SPRITE_OFFSET_Y,
    IDLE_SPRIT_SCALE,
    IDLE_SPRITE_MAX_FRAME
);
export const idleAnimation2 = new Sprite(
    idleSprite2,
    IDLE_SPRITE_WIDTH,
    IDLE_SPRIT_HEIGHT,
    IDLE_SPRITE_2_OFFSET_X,
    IDLE_SPRITE_OFFSET_Y,
    IDLE_SPRIT_SCALE,
    IDLE_SPRITE_MAX_FRAME
);

export const runAnimation = new Sprite(
    runSprite,
    IDLE_SPRITE_WIDTH,
    IDLE_SPRIT_HEIGHT,
    IDLE_SPRITE_OFFSET_X,
    IDLE_SPRITE_OFFSET_Y,
    IDLE_SPRIT_SCALE,
    IDLE_SPRITE_MAX_FRAME
);

export const runAnimation2 = new Sprite(
    runSprite2,
    IDLE_SPRITE_WIDTH,
    IDLE_SPRIT_HEIGHT,
    IDLE_SPRITE_2_OFFSET_X,
    IDLE_SPRITE_OFFSET_Y,
    IDLE_SPRIT_SCALE,
    IDLE_SPRITE_MAX_FRAME
);

export const attackAnimation = new Sprite(
    attack,
    ATTACK_SPRITE_WIDTH,
    ATTACK_SPRITE_HEIGHT,
    IDLE_SPRITE_OFFSET_X,
    IDLE_SPRITE_OFFSET_Y,
    ATTACK_SPRITE_SCALE,
    ATTACK_SPRITE_MAX_FRAME
);

export const attackAnimation2 = new Sprite(
    attack2,
    ATTACK_SPRITE_WIDTH,
    ATTACK_SPRITE_HEIGHT,
    IDLE_SPRITE_2_OFFSET_X,
    IDLE_SPRITE_OFFSET_Y,
    ATTACK_SPRITE_SCALE,
    ATTACK_SPRITE_MAX_FRAME
);
