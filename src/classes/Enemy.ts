import { Definable } from "definables";
import {
  EntityPosition,
  createEntity,
  createQuadrilateral,
  createSprite,
  removeEntity,
} from "pixel-pigeon";
import { XDirection, YDirection } from "../types/Direction";
import {
  enemyHitboxWidth,
  enemySpriteHeight,
  entityHitboxHeight,
  levelID,
  renderHitboxes,
} from "../constants";
import { isEnemyMoving } from "../functions/isEnemyMoving";
import { isEnemyStunned } from "../functions/isEnemyStunned";

interface EnemyOptions {
  position: EntityPosition;
}

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
      position: options.position,
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
                  if (isEnemyStunned(this._id)) {
                    return "stun-left";
                  }
                  if (isEnemyMoving(this._id)) {
                    return "walk-left";
                  }
                  return "idle-left";
                case XDirection.Right:
                  if (isEnemyStunned(this._id)) {
                    return "stun-right";
                  }
                  if (isEnemyMoving(this._id)) {
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
                id: "stun-left",
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
                id: "stun-right",
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

  public get movingXDirection(): XDirection {
    if (this._movingXDirection !== null) {
      return this._movingXDirection;
    }
    throw new Error(this.getAccessorErrorMessage("movingXDirection"));
  }

  public get movingYDirection(): YDirection {
    if (this._movingYDirection !== null) {
      return this._movingYDirection;
    }
    throw new Error(this.getAccessorErrorMessage("movingYDirection"));
  }

  public get tookDamageAt(): number {
    if (this._tookDamageAt !== null) {
      return this._tookDamageAt;
    }
    throw new Error(this.getAccessorErrorMessage("tookDamageAt"));
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

  public hasMovingXDirection(): boolean {
    return this._movingXDirection !== null;
  }

  public hasMovingYDirection(): boolean {
    return this._movingYDirection !== null;
  }

  public hasTookDamageAt(): boolean {
    return this._tookDamageAt !== null;
  }

  public remove(): void {
    super.remove();
    removeEntity(this._entityID);
  }
}
