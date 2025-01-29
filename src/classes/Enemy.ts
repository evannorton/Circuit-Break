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
  enemySpriteWidth,
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
      collidableEntityTypes: ["boundary", "destructible", "player", "enemy"],
      height: entityHitboxHeight,
      layerID: "Characters",
      levelID,
      position: options.position,
      quadrilaterals: renderHitboxes
        ? [
            {
              quadrilateralID: createQuadrilateral({
                color: "#e03c28",
                height: 1,
                width: enemyHitboxWidth,
              }),
            },
            {
              quadrilateralID: createQuadrilateral({
                color: "#e03c28",
                height: 1,
                width: enemyHitboxWidth,
              }),
              y: entityHitboxHeight - 1,
            },
            {
              quadrilateralID: createQuadrilateral({
                color: "#e03c28",
                height: entityHitboxHeight,
                width: 1,
              }),
            },
            {
              quadrilateralID: createQuadrilateral({
                color: "#e03c28",
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
                    height: 15,
                    sourceHeight: 15,
                    sourceWidth: 38,
                    sourceX: 0,
                    sourceY: 0,
                    width: 38,
                  },
                ],
                id: "default",
              },
            ],
            imagePath: "shadow",
          }),
          x: -4,
          y: -6,
        },
        {
          spriteID: createSprite({
            animationID: (): string => {
              switch (this._facingDirection) {
                case XDirection.Left:
                  if (isEnemyStunned(this._id)) {
                    return "stunned-left";
                  }
                  if (isEnemyMoving(this._id)) {
                    return "walk-left";
                  }
                  return "idle-left";
                case XDirection.Right:
                  if (isEnemyStunned(this._id)) {
                    return "stunned-right";
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
                    duration: 200,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 17,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: 100,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth,
                    sourceY: enemySpriteHeight * 17,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: 200,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 2,
                    sourceY: enemySpriteHeight * 17,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: 100,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 3,
                    sourceY: enemySpriteHeight * 17,
                    width: enemySpriteWidth,
                  },
                ],
                id: "idle-left",
              },
              {
                frames: [
                  {
                    duration: 200,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: 0,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: 100,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth,
                    sourceY: 0,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: 200,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 2,
                    sourceY: 0,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: 100,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 2,
                    sourceY: 0,
                    width: enemySpriteWidth,
                  },
                ],
                id: "idle-right",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 19,
                    width: enemySpriteWidth,
                  },
                ],
                id: "walk-left",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 2,
                    width: enemySpriteWidth,
                  },
                ],
                id: "walk-right",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 29,
                    width: enemySpriteWidth,
                  },
                ],
                id: "jump-left",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 12,
                    width: enemySpriteWidth,
                  },
                ],
                id: "jump-right",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 21,
                    width: enemySpriteWidth,
                  },
                ],
                id: "punch-left",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 4,
                    width: enemySpriteWidth,
                  },
                ],
                id: "punch-right",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 24,
                    width: enemySpriteWidth,
                  },
                ],
                id: "kick-left",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 7,
                    width: enemySpriteWidth,
                  },
                ],
                id: "kick-right",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 23,
                    width: enemySpriteWidth,
                  },
                ],
                id: "charge-punch-left",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 6,
                    width: enemySpriteWidth,
                  },
                ],
                id: "charge-punch-right",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 23,
                    width: enemySpriteWidth,
                  },
                ],
                id: "charge-kick-left",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 6,
                    width: enemySpriteWidth,
                  },
                ],
                id: "charge-kick-right",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth,
                    sourceY: enemySpriteHeight * 33,
                    width: enemySpriteWidth,
                  },
                ],
                id: "stunned-left",
              },
              {
                frames: [
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth,
                    sourceY: enemySpriteHeight * 16,
                    width: enemySpriteWidth,
                  },
                ],
                id: "stunned-right",
              },
            ],
            imagePath: "enemy",
          }),
          x: (): number => {
            switch (this._facingDirection) {
              case XDirection.Left:
                return -34;
              case XDirection.Right:
                return -17;
            }
          },
          y: (): number => {
            const baseOffset: number =
              -enemySpriteHeight + entityHitboxHeight + 7;
            return baseOffset;
          },
        },
      ],
      type: "enemy",
      width: enemyHitboxWidth,
    });
    super(entityID);
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
