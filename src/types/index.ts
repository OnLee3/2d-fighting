import { Sprite } from '../utils/Sprite';

export interface Character {
    x: number;
    y: number;
    width: number;
    height: number;
    hp: number;
    attacking: boolean;
    attackDirection: AttackDirection;
    gracePeriod: number;
    frame: number;
    frameCounter: number;
    moving: boolean;
    sprite: Sprite;
}

export interface SpriteOptions {
    src: string;
    width: number;
    height: number;
    offsetX?: number;
    offsetY?: number;
    scale?: number;
    maxFrames?: number;
}

export type AttackDirection = 'left' | 'right';
