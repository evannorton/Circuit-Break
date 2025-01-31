import { Definable } from "definables";
import {
  EntityPosition,
  createEntity,
  createQuadrilateral,
  createSprite,
  getCurrentTime,
  removeEntity,
} from "pixel-pigeon";
import { Kick } from "../types/Kick";
import { Punch, PunchHand } from "../types/Punch";
import { XDirection, YDirection } from "../types/Direction";
import {
  enemyHitboxWidth,
  enemySpriteHeight,
  enemySpriteWidth,
  entityHitboxHeight,
  jumpDuration,
  kickAfterDuration,
  kickBeforeDuration,
  levelID,
  punchAfterDuration,
  punchBeforeDuration,
  renderHitboxes,
} from "../constants";
import { isEnemyKicking } from "../functions/isEnemyKicking";
import { isEnemyMoving } from "../functions/isEnemyMoving";
import { isEnemyPunching } from "../functions/isEnemyPunching";
import { isEnemyStunned } from "../functions/isEnemyStunned";
import { isEnemyTakingKnockback } from "../functions/isEnemyTakingKnockback";

interface EnemyOptions {
  position: EntityPosition;
}

export class Enemy extends Definable {
  private readonly _entityID: string;
  private _hp: number = 6;
  private _facingDirection: XDirection = XDirection.Left;
  private _kick: Kick | null = null;
  private _knockbackDuration: number | null = null;
  private _knockbackVelocity: number | null = null;
  private _movingXDirection: XDirection | null = null;
  private _movingYDirection: YDirection | null = null;
  private _punch: Punch | null = null;
  private _stunDuration: number | null = null;
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
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: 0,
                    width: enemySpriteWidth,
                  },
                ],
                id: "default",
              },
              {
                frames: [
                  {
                    duration: jumpDuration / 5,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth,
                    sourceY: 0,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: jumpDuration / 5,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 2,
                    sourceY: 0,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: jumpDuration / 5,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 3,
                    sourceY: 0,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: jumpDuration / 5,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 2,
                    sourceY: 0,
                    width: enemySpriteWidth,
                  },
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth,
                    sourceY: 0,
                    width: enemySpriteWidth,
                  },
                ],
                id: "jump",
              },
            ],
            imagePath: "shadow",
          }),
          x: (): number => {
            switch (this._facingDirection) {
              case XDirection.Left:
                return -18;
              case XDirection.Right:
                return -17;
            }
          },
          y: -enemySpriteHeight + entityHitboxHeight + 7,
        },
        {
          spriteID: createSprite({
            animationID: (): string => {
              switch (this._facingDirection) {
                case XDirection.Left:
                  if (isEnemyPunching(this._id)) {
                    if (
                      getCurrentTime() - this.punch.createdAt <
                      punchBeforeDuration
                    ) {
                      return "charge-punch-left";
                    }
                    if (this.punch.hand === PunchHand.Left) {
                      return "punch-left-left";
                    }
                    return "punch-left-right";
                  }
                  if (isEnemyKicking(this._id)) {
                    if (
                      getCurrentTime() - this.kick.createdAt <
                      kickBeforeDuration
                    ) {
                      return "charge-kick-left";
                    }
                    return "kick-left";
                  }
                  if (
                    isEnemyTakingKnockback(this._id) ||
                    isEnemyStunned(this._id)
                  ) {
                    return "stunned-left";
                  }
                  if (isEnemyMoving(this._id)) {
                    return "walk-left";
                  }
                  return "idle-left";
                case XDirection.Right:
                  if (isEnemyPunching(this._id)) {
                    if (
                      getCurrentTime() - this.punch.createdAt <
                      punchBeforeDuration
                    ) {
                      return "charge-punch-right";
                    }
                    if (this.punch.hand === PunchHand.Left) {
                      return "punch-right-left";
                    }
                    return "punch-right-right";
                  }
                  if (isEnemyKicking(this._id)) {
                    if (
                      getCurrentTime() - this.kick.createdAt <
                      kickBeforeDuration
                    ) {
                      return "charge-kick-right";
                    }
                    return "kick-right";
                  }
                  if (
                    isEnemyTakingKnockback(this._id) ||
                    isEnemyStunned(this._id)
                  ) {
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
                    duration: 100,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 19,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: 100,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth,
                    sourceY: enemySpriteHeight * 19,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: 100,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 2,
                    sourceY: enemySpriteHeight * 19,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: 100,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 3,
                    sourceY: enemySpriteHeight * 19,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: 100,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 4,
                    sourceY: enemySpriteHeight * 19,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: 100,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 5,
                    sourceY: enemySpriteHeight * 19,
                    width: enemySpriteWidth,
                  },
                ],
                id: "walk-left",
              },
              {
                frames: [
                  {
                    duration: 100,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 2,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: 100,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth,
                    sourceY: enemySpriteHeight * 2,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: 100,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 2,
                    sourceY: enemySpriteHeight * 2,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: 100,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 3,
                    sourceY: enemySpriteHeight * 2,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: 100,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 4,
                    sourceY: enemySpriteHeight * 2,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: 100,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 5,
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
                    duration: punchAfterDuration / 3,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 21,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: punchAfterDuration / 3,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth,
                    sourceY: enemySpriteHeight * 21,
                    width: enemySpriteWidth,
                  },
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 2,
                    sourceY: enemySpriteHeight * 21,
                    width: enemySpriteWidth,
                  },
                ],
                id: "punch-left-right",
              },
              {
                frames: [
                  {
                    duration: punchAfterDuration / 3,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 22,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: punchAfterDuration / 3,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth,
                    sourceY: enemySpriteHeight * 22,
                    width: enemySpriteWidth,
                  },
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 2,
                    sourceY: enemySpriteHeight * 22,
                    width: enemySpriteWidth,
                  },
                ],
                id: "punch-left-left",
              },
              {
                frames: [
                  {
                    duration: punchAfterDuration / 3,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 5,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: punchAfterDuration / 3,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth,
                    sourceY: enemySpriteHeight * 5,
                    width: enemySpriteWidth,
                  },
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 2,
                    sourceY: enemySpriteHeight * 5,
                    width: enemySpriteWidth,
                  },
                ],
                id: "punch-right-right",
              },
              {
                frames: [
                  {
                    duration: punchAfterDuration / 3,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 4,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: punchAfterDuration / 3,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth,
                    sourceY: enemySpriteHeight * 4,
                    width: enemySpriteWidth,
                  },
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 2,
                    sourceY: enemySpriteHeight * 4,
                    width: enemySpriteWidth,
                  },
                ],
                id: "punch-right-left",
              },
              {
                frames: [
                  {
                    duration: kickAfterDuration / 3,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 24,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: kickAfterDuration / 3,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth,
                    sourceY: enemySpriteHeight * 24,
                    width: enemySpriteWidth,
                  },
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 2,
                    sourceY: enemySpriteHeight * 24,
                    width: enemySpriteWidth,
                  },
                ],
                id: "kick-left",
              },
              {
                frames: [
                  {
                    duration: kickAfterDuration / 3,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: 0,
                    sourceY: enemySpriteHeight * 7,
                    width: enemySpriteWidth,
                  },
                  {
                    duration: kickAfterDuration / 3,
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth,
                    sourceY: enemySpriteHeight * 7,
                    width: enemySpriteWidth,
                  },
                  {
                    height: enemySpriteHeight,
                    sourceHeight: enemySpriteHeight,
                    sourceWidth: enemySpriteWidth,
                    sourceX: enemySpriteWidth * 2,
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

  public get facingDirection(): XDirection {
    return this._facingDirection;
  }

  public get hp(): number {
    return this._hp;
  }

  public get kick(): Kick {
    if (this._kick !== null) {
      return this._kick;
    }
    throw new Error(this.getAccessorErrorMessage("kick"));
  }

  public get knockbackDuration(): number {
    if (this._knockbackDuration !== null) {
      return this._knockbackDuration;
    }
    throw new Error(this.getAccessorErrorMessage("knockbackDuration"));
  }

  public get knockbackVelocity(): number {
    if (this._knockbackVelocity !== null) {
      return this._knockbackVelocity;
    }
    throw new Error(this.getAccessorErrorMessage("knockbackVelocity"));
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

  public get punch(): Punch {
    if (this._punch !== null) {
      return this._punch;
    }
    throw new Error(this.getAccessorErrorMessage("punch"));
  }

  public get stunDuration(): number {
    if (this._stunDuration !== null) {
      return this._stunDuration;
    }
    throw new Error(this.getAccessorErrorMessage("stunDuration"));
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

  public set kick(kick: Kick | null) {
    this._kick = kick;
  }

  public set knockbackDuration(knockbackDuration: number | null) {
    this._knockbackDuration = knockbackDuration;
  }

  public set knockbackVelocity(knockbackVelocity: number | null) {
    this._knockbackVelocity = knockbackVelocity;
  }

  public set movingXDirection(movingXDirection: XDirection | null) {
    this._movingXDirection = movingXDirection;
  }

  public set movingYDirection(movingYDirection: YDirection | null) {
    this._movingYDirection = movingYDirection;
  }

  public set punch(punch: Punch | null) {
    this._punch = punch;
  }

  public set stunDuration(stunDuration: number) {
    this._stunDuration = stunDuration;
  }

  public set tookDamageAt(tookDamageAt: number) {
    this._tookDamageAt = tookDamageAt;
  }

  public hasKick(): boolean {
    return this._kick !== null;
  }

  public hasMovingXDirection(): boolean {
    return this._movingXDirection !== null;
  }

  public hasMovingYDirection(): boolean {
    return this._movingYDirection !== null;
  }

  public hasPunch(): boolean {
    return this._punch !== null;
  }

  public hasTookDamageAt(): boolean {
    return this._tookDamageAt !== null;
  }

  public remove(): void {
    super.remove();
    removeEntity(this._entityID);
  }
}
