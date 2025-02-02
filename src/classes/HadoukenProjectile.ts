import { Definable } from "definables";
import {
  EntityCollidable,
  EntityPosition,
  OverlapData,
  createEntity,
  createQuadrilateral,
  createSprite,
  removeEntity,
} from "pixel-pigeon";
import { XDirection } from "../types/Direction";
import { damageDestructible } from "../functions/damageDestructible";
import { damageEnemy } from "../functions/damageEnemy";
import {
  enemyHadoukenedStunDuration,
  entityHitboxHeight,
  hadoukenHitboxWidth,
  levelID,
  playerHadoukenDamage,
  renderHitboxes,
} from "../constants";

export interface HadoukenProjectileOptions {
  position: EntityPosition;
  spawnDirection: XDirection;
}
export class HadoukenProjectile extends Definable {
  public constructor(options: HadoukenProjectileOptions) {
    const entityID: string = createEntity({
      height: entityHitboxHeight,
      layerID: "Characters",
      levelID,
      onOverlap: (overlapData: OverlapData): void => {
        const hitEntityCollidable: EntityCollidable | undefined =
          overlapData.entityCollidables.find(
            (entityCollidable: EntityCollidable): boolean =>
              entityCollidable.type === "enemy-base" ||
              entityCollidable.type === "destructible",
          );
        if (typeof hitEntityCollidable !== "undefined") {
          switch (hitEntityCollidable.type) {
            case "destructible":
              damageDestructible(
                playerHadoukenDamage,
                enemyHadoukenedStunDuration,
              );
              break;
            case "enemy-base":
              damageEnemy(
                hitEntityCollidable.entityID,
                playerHadoukenDamage,
                enemyHadoukenedStunDuration,
                true,
                0,
              );
              break;
          }
          this.remove();
        }
      },
      position: options.position,
      quadrilaterals: renderHitboxes
        ? [
            {
              quadrilateralID: createQuadrilateral({
                color: "#000000",
                height: 1,
                width: hadoukenHitboxWidth,
              }),
            },
            {
              quadrilateralID: createQuadrilateral({
                color: "#000000",
                height: 1,
                width: hadoukenHitboxWidth,
              }),
              y: entityHitboxHeight - 1,
            },
            {
              quadrilateralID: createQuadrilateral({
                color: "#000000",
                height: entityHitboxHeight,
                width: 1,
              }),
            },
            {
              quadrilateralID: createQuadrilateral({
                color: "#000000",
                height: entityHitboxHeight,
                width: 1,
              }),
              x: hadoukenHitboxWidth - 1,
            },
          ]
        : undefined,
      sprites: [
        {
          spriteID: createSprite({
            animationID: (): string => {
              switch (options.spawnDirection) {
                case XDirection.Left:
                  return "hadouken-left";
                case XDirection.Right:
                  return "hadouken-right";
              }
            },
            animations: [
              {
                frames: [
                  {
                    duration: 100,
                    height: 21,
                    sourceHeight: 21,
                    sourceWidth: 18,
                    sourceX: 0,
                    sourceY: 21,
                    width: 18,
                  },
                  {
                    duration: 100,
                    height: 21,
                    sourceHeight: 21,
                    sourceWidth: 18,
                    sourceX: 18,
                    sourceY: 21,
                    width: 18,
                  },
                ],
                id: "hadouken-left",
              },
              {
                frames: [
                  {
                    duration: 100,
                    height: 21,
                    sourceHeight: 21,
                    sourceWidth: 18,
                    sourceX: 0,
                    sourceY: 0,
                    width: 18,
                  },
                  {
                    duration: 100,
                    height: 21,
                    sourceHeight: 21,
                    sourceWidth: 18,
                    sourceX: 18,
                    sourceY: 0,
                    width: 18,
                  },
                ],
                id: "hadouken-right",
              },
            ],
            imagePath: "fireball",
          }),
          y: -27,
        },
      ],
      type: "hadouken-projectile",
      width: hadoukenHitboxWidth,
    });
    super(entityID);
  }

  public remove(): void {
    super.remove();
    removeEntity(this._id);
  }
}
