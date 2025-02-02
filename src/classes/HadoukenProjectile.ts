import { Definable } from "definables";
import {
  EntityPosition,
  createEntity,
  createQuadrilateral,
  createSprite,
  removeEntity,
} from "pixel-pigeon";
import { XDirection } from "../types/Direction";
import {
  entityHitboxHeight,
  hadoukenHitboxWidth,
  levelID,
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
