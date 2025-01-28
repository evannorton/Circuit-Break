import { Enemy } from "../classes/Enemy";
import {
  EntityPosition,
  createEntity,
  createQuadrilateral,
  createSprite,
  getEntityPosition,
  getGameWidth,
} from "pixel-pigeon";
import {
  destructibleHitboxWidth,
  destructibleSpriteHeight,
  enemyHitboxWidth,
  entityHitboxHeight,
  levelID,
  maxY,
  minY,
  playerHitboxWidth,
  renderHitboxes,
} from "../constants";
import { getDefinables } from "definables";
import { isDestructibleTakingDamage } from "./isDestructibleTakingDamage";
import { state } from "../state";

const getDestructibleX = (attempt: number): number | null => {
  if (attempt > 10) {
    return null;
  }
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
  const unsafeXs: [number, number][] = [
    [
      playerPosition.x - destructibleHitboxWidth,
      playerPosition.x + playerHitboxWidth,
    ],
  ];
  for (const monster of getDefinables(Enemy).values()) {
    const monsterPosition: EntityPosition = getEntityPosition(monster.entityID);
    unsafeXs.push([
      monsterPosition.x - destructibleHitboxWidth,
      monsterPosition.x + enemyHitboxWidth,
    ]);
  }
  if (
    unsafeXs.some(
      ([min, max]: [number, number]): boolean => x >= min && x <= max,
    )
  ) {
    return getDestructibleX(attempt + 1);
  }
  return x;
};
const getDestructibleY = (attempt: number): number | null => {
  if (attempt > 10) {
    return null;
  }
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
  const unsafeYs: [number, number][] = [
    [
      playerPosition.y - entityHitboxHeight,
      playerPosition.y + entityHitboxHeight,
    ],
  ];
  for (const monster of getDefinables(Enemy).values()) {
    const monsterPosition: EntityPosition = getEntityPosition(monster.entityID);
    unsafeYs.push([
      monsterPosition.y - entityHitboxHeight,
      monsterPosition.y + entityHitboxHeight,
    ]);
  }
  if (
    unsafeYs.some(
      ([min, max]: [number, number]): boolean => y >= min && y <= max,
    )
  ) {
    return getDestructibleY(attempt + 1);
  }
  return y;
};

export const createDestructible = (): void => {
  const x: number | null = getDestructibleX(0);
  const y: number | null = getDestructibleY(0);
  if (x !== null && y !== null) {
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
  }
};
