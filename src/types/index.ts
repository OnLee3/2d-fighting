export interface Character {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    hp: number;
    attacking: boolean;
    attackDirection: AttackDirection;
    gracePeriod: number;
    frame: number;
    frameCounter: number;
    moving: boolean;
}

export type AttackDirection = 'left' | 'right';
