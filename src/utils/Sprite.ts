import idleSprite from '../../assets/_Idle.png';
import idleSprite2 from '../../assets/_Idle_2.png';
import runSprite from '../../assets/_Run.png';
import runSprite2 from '../../assets/_Run_2.png';
import backgroundImage from '../../assets/Background.png';
import attack from '../../assets/_Attack.png';
import attack2 from '../../assets/_Attack_2.png';
import Hit from '../../assets/_Hit.png';
import Hit2 from '../../assets/_Hit_2.png';
import { SpriteOptions } from '../types';
import { BACKGROUND_HEIGHT, BACKGROUND_WIDTH } from '../constants/dimensions';
import {
    ATTACK_SPRITE_HEIGHT,
    ATTACK_SPRITE_MAX_FRAME,
    ATTACK_SPRITE_SCALE,
    ATTACK_SPRITE_WIDTH,
    IDLE_SPRITE_2_OFFSET_X,
    IDLE_SPRITE_MAX_FRAME,
    IDLE_SPRITE_OFFSET_X,
    IDLE_SPRITE_OFFSET_Y,
    IDLE_SPRITE_WIDTH,
    IDLE_SPRIT_HEIGHT,
    IDLE_SPRIT_SCALE,
} from '../constants/sprites';

export class Sprite {
    image: HTMLImageElement;
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    scale: number;
    maxFrames: number;

    constructor(options: SpriteOptions) {
        this.image = new Image();
        this.image.src = options.src;
        this.width = options.width;
        this.height = options.height;
        this.offsetX = options.offsetX || 0;
        this.offsetY = options.offsetY || 0;
        this.scale = options.scale || 1;
        this.maxFrames = options.maxFrames || 10;
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

export const backgroundSprite = new Sprite({
    src: backgroundImage,
    width: BACKGROUND_WIDTH,
    height: BACKGROUND_HEIGHT,
});

export const idleAnimation = new Sprite({
    src: idleSprite,
    width: IDLE_SPRITE_WIDTH,
    height: IDLE_SPRIT_HEIGHT,
    offsetX: IDLE_SPRITE_OFFSET_X,
    offsetY: IDLE_SPRITE_OFFSET_Y,
    scale: IDLE_SPRIT_SCALE,
    maxFrames: IDLE_SPRITE_MAX_FRAME,
});
export const idleAnimation2 = new Sprite({
    src: idleSprite2,
    width: IDLE_SPRITE_WIDTH,
    height: IDLE_SPRIT_HEIGHT,
    offsetX: IDLE_SPRITE_2_OFFSET_X,
    offsetY: IDLE_SPRITE_OFFSET_Y,
    scale: IDLE_SPRIT_SCALE,
    maxFrames: IDLE_SPRITE_MAX_FRAME,
});

export const runAnimation = new Sprite({
    src: runSprite,
    width: IDLE_SPRITE_WIDTH,
    height: IDLE_SPRIT_HEIGHT,
    offsetX: IDLE_SPRITE_OFFSET_X,
    offsetY: IDLE_SPRITE_OFFSET_Y,
    scale: IDLE_SPRIT_SCALE,
    maxFrames: IDLE_SPRITE_MAX_FRAME,
});

export const runAnimation2 = new Sprite({
    src: runSprite2,
    width: IDLE_SPRITE_WIDTH,
    height: IDLE_SPRIT_HEIGHT,
    offsetX: IDLE_SPRITE_2_OFFSET_X,
    offsetY: IDLE_SPRITE_OFFSET_Y,
    scale: IDLE_SPRIT_SCALE,
    maxFrames: IDLE_SPRITE_MAX_FRAME,
});

export const attackAnimation = new Sprite({
    src: attack,
    width: ATTACK_SPRITE_WIDTH,
    height: ATTACK_SPRITE_HEIGHT,
    offsetX: IDLE_SPRITE_OFFSET_X,
    offsetY: IDLE_SPRITE_OFFSET_Y,
    scale: ATTACK_SPRITE_SCALE,
    maxFrames: ATTACK_SPRITE_MAX_FRAME,
});

export const attackAnimation2 = new Sprite({
    src: attack2,
    width: ATTACK_SPRITE_WIDTH,
    height: ATTACK_SPRITE_HEIGHT,
    offsetX: IDLE_SPRITE_2_OFFSET_X,
    offsetY: IDLE_SPRITE_OFFSET_Y,
    scale: ATTACK_SPRITE_SCALE,
    maxFrames: ATTACK_SPRITE_MAX_FRAME,
});

export const hitAnimation = new Sprite({
    src: Hit,
    width: ATTACK_SPRITE_WIDTH,
    height: ATTACK_SPRITE_HEIGHT,
    offsetX: IDLE_SPRITE_OFFSET_X,
    offsetY: IDLE_SPRITE_OFFSET_Y,
    scale: ATTACK_SPRITE_SCALE,
    maxFrames: 1,
});

export const hitAnimation2 = new Sprite({
    src: Hit2,
    width: ATTACK_SPRITE_WIDTH,
    height: ATTACK_SPRITE_HEIGHT,
    offsetX: IDLE_SPRITE_OFFSET_X,
    offsetY: IDLE_SPRITE_OFFSET_Y,
    scale: ATTACK_SPRITE_SCALE,
    maxFrames: 1,
});
