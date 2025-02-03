import { Definable } from "definables";
import { EntityPosition, createEntity, removeEntity } from "pixel-pigeon";
import { Kick } from "../types/Kick";
import { Pummel } from "../types/Pummel";
import { Punch } from "../types/Punch";
import { Shoot } from "../types/Shoot";
import { Slam } from "../types/Slam";
import { Swoop } from "../types/Swoop";
import { XDirection, YDirection } from "../types/Direction";
import { addEnemyQuadrilaterals } from "../functions/addEnemyQuadrilaterals";
import { addEnemySprites } from "../functions/addEnemySprites";
import { entityHitboxHeight, levelID } from "../constants";
import { getEnemyCollidableEntities } from "../functions/getEnemyCollidableEntities";
import { getEnemyHitboxWidth } from "../functions/getEnemyHitboxWidth";
import { getEnemyMaxHP } from "../functions/getEnemyMaxHP";

export enum EnemyType {
  Base = "base",
  Boss = "boss",
  Flying = "flying",
  Shooting = "shooting",
}
export interface EnemyOptions {
  position: EntityPosition;
  spawnDirection: XDirection;
  type: EnemyType;
}
export class Enemy extends Definable {
  private _hasAttacked: boolean = false;
  private _hp: number;
  private _facingDirection: XDirection = XDirection.Left;
  private _kick: Kick | null = null;
  private _knockbackDuration: number | null = null;
  private _knockbackVelocity: number | null = null;
  private _movingXDirection: XDirection | null = null;
  private _movingYDirection: YDirection | null = null;
  private _pummel: Pummel | null = null;
  private _punch: Punch | null = null;
  private _shoot: Shoot | null = null;
  private _slam: Slam | null = null;
  private readonly _spawnDirection: XDirection;
  private _stunDuration: number | null = null;
  private _swoop: Swoop | null = null;
  private _tookDamageAt: number | null = null;
  private readonly _type: EnemyType;
  public constructor(options: EnemyOptions) {
    const entityID: string = createEntity({
      collidableEntityTypes: getEnemyCollidableEntities(options.type),
      height: entityHitboxHeight,
      layerID: "Characters",
      levelID,
      position: options.position,
      type: `enemy-${options.type}`,
      width: getEnemyHitboxWidth(options.type),
    });
    super(entityID);
    this._type = options.type;
    this._hp = getEnemyMaxHP(options.type);
    this._spawnDirection = options.spawnDirection;
    addEnemySprites(this._id);
    addEnemyQuadrilaterals(this._id);
  }

  public get facingDirection(): XDirection {
    return this._facingDirection;
  }

  public get hasAttacked(): boolean {
    return this._hasAttacked;
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

  public get pummel(): Pummel {
    if (this._pummel !== null) {
      return this._pummel;
    }
    throw new Error(this.getAccessorErrorMessage("pummel"));
  }

  public get punch(): Punch {
    if (this._punch !== null) {
      return this._punch;
    }
    throw new Error(this.getAccessorErrorMessage("punch"));
  }

  public get shoot(): Shoot {
    if (this._shoot !== null) {
      return this._shoot;
    }
    throw new Error(this.getAccessorErrorMessage("shoot"));
  }

  public get slam(): Slam {
    if (this._slam !== null) {
      return this._slam;
    }
    throw new Error(this.getAccessorErrorMessage("slam"));
  }

  public get spawnDirection(): XDirection {
    return this._spawnDirection;
  }

  public get stunDuration(): number {
    if (this._stunDuration !== null) {
      return this._stunDuration;
    }
    throw new Error(this.getAccessorErrorMessage("stunDuration"));
  }

  public get swoop(): Swoop {
    if (this._swoop !== null) {
      return this._swoop;
    }
    throw new Error(this.getAccessorErrorMessage("swoop"));
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

  public set hasAttacked(hasAttacked: boolean) {
    this._hasAttacked = hasAttacked;
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

  public set pummel(pummel: Pummel | null) {
    this._pummel = pummel;
  }

  public set punch(punch: Punch | null) {
    this._punch = punch;
  }

  public set shoot(shoot: Shoot | null) {
    this._shoot = shoot;
  }

  public set slam(slam: Slam | null) {
    this._slam = slam;
  }

  public set stunDuration(stunDuration: number) {
    this._stunDuration = stunDuration;
  }

  public set swoop(swoop: Swoop | null) {
    this._swoop = swoop;
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

  public hasPummel(): boolean {
    return this._pummel !== null;
  }

  public hasPunch(): boolean {
    return this._punch !== null;
  }

  public hasShoot(): boolean {
    return this._shoot !== null;
  }

  public hasSlam(): boolean {
    return this._slam !== null;
  }

  public hasSwoop(): boolean {
    return this._swoop !== null;
  }

  public hasTookDamageAt(): boolean {
    return this._tookDamageAt !== null;
  }

  public remove(): void {
    super.remove();
    removeEntity(this._id);
  }
}
