import { Definable } from "definables";
import { XDirection, YDirection } from "../types/Direction";
import {
  createEntity,
  createQuadrilateral,
  createSprite,
  getCurrentTime,
  removeEntity,
} from "pixel-pigeon";
import {
  damageDuration,
  enemyHitboxWidth,
  enemySpriteHeight,
  entityHitboxHeight,
  levelID,
  renderHitboxes,
} from "../constants";

interface EnemyOptions {}

export class Enemy extends Definable {
  private readonly _entityID: string;
  private _hp: number = 5;
  private _facingDirection: XDirection = XDirection.Left;
  private _movingXDirection: XDirection | null = null;
  private _movingYDirection: YDirection | null = null;
  private _tookDamageAt: number | null = null;
  public constructor(options: EnemyOptions) {
    const entityID: string = createEntity({
      collidableEntityTypes: ["boundary", "destructible", "player"],
      height: entityHitboxHeight,
      layerID: "Characters",
      levelID,
      position: {
        x: 200,
        y: 100,
      },
      quadrilaterals: renderHitboxes
        ? [
            {
              quadrilateralID: createQuadrilateral({
                color: "#d59cfc",
                height: 1,
                width: enemyHitboxWidth,
              }),
            },
            {
              quadrilateralID: createQuadrilateral({
                color: "#d59cfc",
                height: 1,
                width: enemyHitboxWidth,
              }),
              y: entityHitboxHeight - 1,
            },
            {
              quadrilateralID: createQuadrilateral({
                color: "#d59cfc",
                height: entityHitboxHeight,
                width: 1,
              }),
            },
            {
              quadrilateralID: createQuadrilateral({
                color: "#d59cfc",
                height: entityHitboxHeight,
                width: 1,
              }),
              x: enemyHitboxWidth - 1,
            },
          ]
        : undefined,
      sprites: [
        {
          spriteID: createSprite({
            animationID: "default",
            animations: [
              {
                frames: [
                  {
                    height: 10,
                    sourceHeight: 10,
                    sourceWidth: 20,
                    sourceX: 0,
                    sourceY: 0,
                    width: 20,
                  },
                ],
                id: "default",
              },
            ],
            imagePath: "shadow",
          }),
          x: -2,
          y: -enemySpriteHeight + entityHitboxHeight + 26,
        },
        {
          spriteID: createSprite({
            animationID: (): string => {
              switch (this._facingDirection) {
                case XDirection.Left:
                  if (this.isTakingDamage()) {
                    return "damage-left";
                  }
                  if (this.isMoving()) {
                    return "walk-left";
                  }
                  return "idle-left";
                case XDirection.Right:
                  if (this.isTakingDamage()) {
                    return "damage-right";
                  }
                  if (this.isMoving()) {
                    return "walk-right";
                  }
                  return "idle-right";
              }
            },
            animations: [
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: 24,
                    sourceX: 0,
                    sourceY: 0,
                    width: 24,
                  },
                ],
                id: "idle-left",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: 24,
                    sourceX: 0,
                    sourceY: 32,
                    width: 24,
                  },
                ],
                id: "idle-right",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: 24,
                    sourceX: 0,
                    sourceY: 64,
                    width: 24,
                  },
                ],
                id: "walk-left",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: 24,
                    sourceX: 0,
                    sourceY: 96,
                    width: 24,
                  },
                ],
                id: "walk-right",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: 24,
                    sourceX: 0,
                    sourceY: 128,
                    width: 24,
                  },
                ],
                id: "jump-left",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: 24,
                    sourceX: 0,
                    sourceY: 160,
                    width: 24,
                  },
                ],
                id: "jump-right",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: 24,
                    sourceX: 0,
                    sourceY: 192,
                    width: 24,
                  },
                ],
                id: "punch-left",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: 24,
                    sourceX: 0,
                    sourceY: 224,
                    width: 24,
                  },
                ],
                id: "punch-right",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: 24,
                    sourceX: 0,
                    sourceY: 256,
                    width: 24,
                  },
                ],
                id: "damage-left",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: 24,
                    sourceX: 0,
                    sourceY: 288,
                    width: 24,
                  },
                ],
                id: "damage-right",
              },
            ],
            imagePath: "enemy",
          }),
          x: (): number => {
            switch (this._facingDirection) {
              case XDirection.Left:
                return -7;
              case XDirection.Right:
                return -1;
            }
          },
          y: (): number => {
            const baseOffset: number = -enemySpriteHeight + entityHitboxHeight;
            return baseOffset;
          },
        },
      ],
      type: "enemy",
      width: enemyHitboxWidth,
    });
    super(entityID);
    console.log(options);
    this._entityID = entityID;
  }

  public get entityID(): string {
    return this._entityID;
  }

  public get facingDirection(): XDirection {
    return this._facingDirection;
  }

  public get hp(): number {
    return this._hp;
  }

  public get movingXDirection(): XDirection | null {
    return this._movingXDirection;
  }

  public get movingYDirection(): YDirection | null {
    return this._movingYDirection;
  }

  public get tookDamageAt(): number {
    if (this._tookDamageAt === null) {
      throw new Error(
        "An attempt was made to get the time of damage taken but no time exists",
      );
    }
    return this._tookDamageAt;
  }

  public set facingDirection(facingDirection: XDirection) {
    this._facingDirection = facingDirection;
  }

  public set hp(hp: number) {
    this._hp = hp;
  }

  public set movingXDirection(movingXDirection: XDirection | null) {
    this._movingXDirection = movingXDirection;
  }

  public set movingYDirection(movingYDirection: YDirection | null) {
    this._movingYDirection = movingYDirection;
  }

  public set tookDamageAt(tookDamageAt: number) {
    this._tookDamageAt = tookDamageAt;
  }

  public hasTookDamageAt(): boolean {
    return this._tookDamageAt !== null;
  }

  public isTakingDamage(): boolean {
    return (
      this._tookDamageAt !== null &&
      getCurrentTime() - this._tookDamageAt < damageDuration
    );
  }

  public remove(): void {
    super.remove();
    removeEntity(this._entityID);
  }

  private isMoving(): boolean {
    return this._movingXDirection !== null || this._movingYDirection !== null;
  }
}
