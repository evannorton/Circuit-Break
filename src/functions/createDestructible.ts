import {
  createEntity,
  createQuadrilateral,
  createSprite,
  getCurrentTime,
  getGameWidth,
  removeEntity,
} from "pixel-pigeon";
import {
  damageAnimationDuration,
  destructibleHitboxWidth,
  destructibleSpriteHeight,
  entityHitboxHeight,
  levelID,
  maxY,
  minY,
  renderHitboxes,
} from "../constants";
import { state } from "../state";

export const createDestructible = (): void => {
  if (state.values.destructible !== null) {
    removeEntity(state.values.destructible.entityID);
    state.setValues({
      destructible: null,
    });
  }
  const x: number = Math.floor(
    Math.random() * (getGameWidth() - destructibleHitboxWidth),
  );
  const minBoxY: number = minY;
  const maxBoxY: number = maxY - entityHitboxHeight + 1;
  const y: number = Math.floor(Math.random() * (maxBoxY - minBoxY)) + minBoxY;
  const entityID: string = createEntity({
    height: entityHitboxHeight,
    layerID: "Characters",
    levelID,
    position: {
      x,
      y,
    },
    quadrilaterals: renderHitboxes
      ? [
          {
            quadrilateralID: createQuadrilateral({
              color: "#ff82ce",
              height: 1,
              width: destructibleHitboxWidth,
            }),
          },
          {
            quadrilateralID: createQuadrilateral({
              color: "#ff82ce",
              height: 1,
              width: destructibleHitboxWidth,
            }),
            y: entityHitboxHeight - 1,
          },
          {
            quadrilateralID: createQuadrilateral({
              color: "#ff82ce",
              height: entityHitboxHeight,
              width: 1,
            }),
          },
          {
            quadrilateralID: createQuadrilateral({
              color: "#ff82ce",
              height: entityHitboxHeight,
              width: 1,
            }),
            x: destructibleHitboxWidth - 1,
          },
        ]
      : undefined,
    sprites: [
      {
        spriteID: createSprite({
          animationID: (): string => {
            if (state.values.destructible === null) {
              throw new Error(
                "An attempt was made to get the animation ID of a destructible but no box exists",
              );
            }
            if (
              state.values.destructible.tookDamageAt !== null &&
              getCurrentTime() - state.values.destructible.tookDamageAt <
                damageAnimationDuration
            ) {
              return "hit";
            }
            return "default";
          },
          animations: [
            {
              frames: [
                {
                  height: destructibleSpriteHeight,
                  sourceHeight: destructibleSpriteHeight,
                  sourceWidth: 15,
                  sourceX: 0,
                  sourceY: 0,
                  width: 15,
                },
              ],
              id: "default",
            },
            {
              frames: [
                {
                  height: destructibleSpriteHeight,
                  sourceHeight: destructibleSpriteHeight,
                  sourceWidth: 15,
                  sourceX: 0,
                  sourceY: 30,
                  width: 15,
                },
              ],
              id: "hit",
            },
          ],
          imagePath: "destructible",
        }),
        y: -destructibleSpriteHeight + entityHitboxHeight,
      },
    ],
    type: "destructible",
    width: destructibleHitboxWidth,
  });
  state.setValues({
    destructible: {
      entityID,
      hp: 5,
      tookDamageAt: null,
    },
  });
};
