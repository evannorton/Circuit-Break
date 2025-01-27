import {
  EntityPosition,
  createEntity,
  createQuadrilateral,
  createSprite,
  getEntityPosition,
  getGameWidth,
  removeEntity,
} from "pixel-pigeon";
import {
  destructibleHitboxWidth,
  destructibleSpriteHeight,
  entityHitboxHeight,
  levelID,
  maxY,
  minY,
  playerHitboxWidth,
  renderHitboxes,
} from "../constants";
import { isDestructibleTakingDamage } from "./isDestructibleTakingDamage";
import { state } from "../state";

const getDestructibleX = (): number => {
  if (state.values.playerEntityID === null) {
    throw new Error(
      "An attempt was made to get the player's position but the player does not exist",
    );
  }
  const playerPosition: EntityPosition | null = getEntityPosition(
    state.values.playerEntityID,
  );
  const x: number = Math.floor(
    Math.random() * (getGameWidth() - destructibleHitboxWidth),
  );
  const minUnsafeX: number = playerPosition.x - destructibleHitboxWidth;
  const maxUnsafeX: number = playerPosition.x + playerHitboxWidth;
  if (x >= minUnsafeX && x <= maxUnsafeX) {
    return getDestructibleX();
  }
  return x;
};
const getDestructibleY = (): number => {
  if (state.values.playerEntityID === null) {
    throw new Error(
      "An attempt was made to get the player's position but the player does not exist",
    );
  }
  const playerPosition: EntityPosition | null = getEntityPosition(
    state.values.playerEntityID,
  );
  const minBoxY: number = minY;
  const maxBoxY: number = maxY - entityHitboxHeight + 1;
  const y: number = Math.floor(Math.random() * (maxBoxY - minBoxY)) + minBoxY;
  const minUnsafeY: number = playerPosition.y - entityHitboxHeight;
  const maxUnsafeY: number = playerPosition.y + entityHitboxHeight;
  if (y >= minUnsafeY && y <= maxUnsafeY) {
    return getDestructibleY();
  }
  return y;
};

export const createDestructible = (): void => {
  if (state.values.destructible !== null) {
    removeEntity(state.values.destructible.entityID);
    state.setValues({
      destructible: null,
    });
  }
  const x: number = getDestructibleX();
  const y: number = getDestructibleY();
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
            if (isDestructibleTakingDamage()) {
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
