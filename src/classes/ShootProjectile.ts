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
import { damagePlayer } from "../functions/damagePlayer";
import {
  enemyShootDamage,
  entityHitboxHeight,
  levelID,
  playerShotStunDuration,
  renderHitboxes,
  shootHitboxWidth,
} from "../constants";

export interface ShootProjectileOptions {
  position: EntityPosition;
  spawnDirection: XDirection;
}
export class ShootProjectile extends Definable {
  public constructor(options: ShootProjectileOptions) {
    const entityID: string = createEntity({
      height: entityHitboxHeight,
      layerID: "Characters",
      levelID,
      onOverlap: (overlapData: OverlapData): void => {
        const hitEntityCollidable: EntityCollidable | undefined =
          overlapData.entityCollidables.find(
            (entityCollidable: EntityCollidable): boolean =>
              entityCollidable.type === "player",
          );
        if (typeof hitEntityCollidable !== "undefined") {
          switch (hitEntityCollidable.type) {
            case "player":
              damagePlayer(enemyShootDamage, playerShotStunDuration);
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
                width: shootHitboxWidth,
              }),
            },
            {
              quadrilateralID: createQuadrilateral({
                color: "#000000",
                height: 1,
                width: shootHitboxWidth,
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
              x: shootHitboxWidth - 1,
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
                    height: 5,
                    sourceHeight: 5,
                    sourceWidth: 5,
                    sourceX: 0,
                    sourceY: 0,
                    width: 5,
                  },
                ],
                id: "default",
              },
            ],
            imagePath: "projectile",
          }),
          y: -19,
        },
      ],
      type: "shoot-projectile",
      width: shootHitboxWidth,
    });
    super(entityID);
  }

  public remove(): void {
    super.remove();
    removeEntity(this._id);
  }
}
