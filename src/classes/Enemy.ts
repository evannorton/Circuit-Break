import { Definable } from "definables";
import { XDirection, YDirection } from "../types/Direction";
import {
  createEntity,
  createQuadrilateral,
  createSprite,
  removeEntity,
} from "pixel-pigeon";
import {
  enemyHitboxWidth,
  enemySpriteHeight,
  entityHitboxHeight,
  levelID,
  renderHitboxes,
} from "../constants";

interface EnemyOptions {}

export class Enemy extends Definable {
  private readonly _entityID: string;
  private _facingDirection: XDirection = XDirection.Left;
  private _movingXDirection: XDirection | null = null;
  private _movingYDirection: YDirection | null = null;
  public constructor(options: EnemyOptions) {
    super();
    console.log(options);
    this._entityID = createEntity({
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
                  if (this.isMoving()) {
                    return "walk-left";
                  }
                  return "idle-left";
                case XDirection.Right:
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
  }

  public get entityID(): string {
    return this._entityID;
  }

  public get facingDirection(): XDirection {
    return this._facingDirection;
  }

  public get movingXDirection(): XDirection | null {
    return this._movingXDirection;
  }

  public get movingYDirection(): YDirection | null {
    return this._movingYDirection;
  }

  public set facingDirection(facingDirection: XDirection) {
    this._facingDirection = facingDirection;
  }

  public set movingXDirection(movingXDirection: XDirection | null) {
    this._movingXDirection = movingXDirection;
  }

  public set movingYDirection(movingYDirection: YDirection | null) {
    this._movingYDirection = movingYDirection;
  }

  public remove(): void {
    super.remove();
    removeEntity(this._entityID);
  }

  private isMoving(): boolean {
    return this._movingXDirection !== null || this._movingYDirection !== null;
  }
}
