import { Definable } from "definables";
import {
  EntityPosition,
  createEntity,
  createQuadrilateral,
  removeEntity,
} from "pixel-pigeon";
import { Kick } from "../types/Kick";
import { Punch } from "../types/Punch";
import { XDirection, YDirection } from "../types/Direction";
import { addEnemySprites } from "../functions/addEnemySprites";
import {
  baseEnemyHitboxWidth,
  entityHitboxHeight,
  levelID,
  renderHitboxes,
} from "../constants";

export enum EnemyType {
  Base = "base",
  Flying = "flying",
}
export interface EnemyOptions {
  position: EntityPosition;
  type: EnemyType;
}
export class Enemy extends Definable {
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
  private readonly _type: EnemyType;
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
                width: baseEnemyHitboxWidth,
              }),
            },
            {
              quadrilateralID: createQuadrilateral({
                color: "#e03c28",
                height: 1,
                width: baseEnemyHitboxWidth,
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
              x: baseEnemyHitboxWidth - 1,
            },
          ]
        : undefined,
      type: "enemy",
      width: baseEnemyHitboxWidth,
    });
    super(entityID);
    this._type = options.type;
    addEnemySprites(this._id);
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

  public get type(): EnemyType {
    return this._type;
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
    removeEntity(this._id);
  }
}
