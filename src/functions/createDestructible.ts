import {
  CreateSpriteOptionsAnimationFrame,
  EntityPosition,
  createEntity,
  createQuadrilateral,
  createSprite,
  getCurrentTime,
  getEntityPosition,
  getGameWidth,
} from "pixel-pigeon";
import { Enemy } from "../classes/Enemy";
import { XDirection } from "../types/Direction";
import {
  destructibleHitboxWidth,
  destructibleIdleFrameDuration,
  destructibleRisingFrameDuration,
  destructibleRisingFrames,
  destructibleSpriteHeight,
  destructibleSpriteWidth,
  enemyHitboxWidth,
  entityHitboxHeight,
  levelID,
  maxY,
  minY,
  playerHitboxWidth,
  renderHitboxes,
} from "../constants";
import { getDefinables } from "definables";
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
  const minBoxX: number = playerHitboxWidth;
  const maxBoxX: number =
    getGameWidth() - destructibleHitboxWidth - playerHitboxWidth;
  const x: number = Math.floor(Math.random() * (maxBoxX - minBoxX)) + minBoxX;
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
  const minBoxY: number = minY + 19;
  const maxBoxY: number = maxY - entityHitboxHeight + 1 - 6;
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
    const risingFrames: CreateSpriteOptionsAnimationFrame[] = [];
    for (let i: number = 0; i < destructibleRisingFrames; i++) {
      risingFrames.push({
        duration: destructibleRisingFrameDuration,
        height: destructibleSpriteHeight,
        sourceHeight: destructibleSpriteHeight,
        sourceWidth: destructibleSpriteWidth,
        sourceX: destructibleSpriteWidth * i,
        sourceY: 0,
        width: destructibleSpriteWidth,
      });
    }
    const batteryEntityID: string = createEntity({
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
                  "An attempt was made to get the destructible's animation but the destructible does not exist",
                );
              }
              if (
                getCurrentTime() - state.values.destructible.createdAt <
                destructibleRisingFrameDuration * 17
              ) {
                return "rising";
              }
              if (state.values.destructible.hp <= 1) {
                return "idle-5";
              }
              if (state.values.destructible.hp <= 2) {
                return "idle-4";
              }
              if (state.values.destructible.hp <= 3) {
                return "idle-3";
              }
              if (state.values.destructible.hp <= 4) {
                return "idle-2";
              }
              return "idle-1";
            },
            animations: [
              {
                frames: risingFrames,
                id: "rising",
              },
              {
                frames: [
                  {
                    duration: destructibleIdleFrameDuration,
                    height: destructibleSpriteHeight,
                    sourceHeight: destructibleSpriteHeight,
                    sourceWidth: destructibleSpriteWidth,
                    sourceX: 0,
                    sourceY: destructibleSpriteHeight,
                    width: destructibleSpriteWidth,
                  },
                  {
                    duration: destructibleIdleFrameDuration,
                    height: destructibleSpriteHeight,
                    sourceHeight: destructibleSpriteHeight,
                    sourceWidth: destructibleSpriteWidth,
                    sourceX: destructibleSpriteWidth,
                    sourceY: destructibleSpriteHeight,
                    width: destructibleSpriteWidth,
                  },
                ],
                id: "idle-1",
              },
              {
                frames: [
                  {
                    duration: destructibleIdleFrameDuration,
                    height: destructibleSpriteHeight,
                    sourceHeight: destructibleSpriteHeight,
                    sourceWidth: destructibleSpriteWidth,
                    sourceX: 0 + destructibleSpriteWidth * 3,
                    sourceY: destructibleSpriteHeight,
                    width: destructibleSpriteWidth,
                  },
                  {
                    duration: destructibleIdleFrameDuration,
                    height: destructibleSpriteHeight,
                    sourceHeight: destructibleSpriteHeight,
                    sourceWidth: destructibleSpriteWidth,
                    sourceX: destructibleSpriteWidth * 4,
                    sourceY: destructibleSpriteHeight,
                    width: destructibleSpriteWidth,
                  },
                ],
                id: "idle-2",
              },
              {
                frames: [
                  {
                    duration: destructibleIdleFrameDuration,
                    height: destructibleSpriteHeight,
                    sourceHeight: destructibleSpriteHeight,
                    sourceWidth: destructibleSpriteWidth,
                    sourceX: 0 + destructibleSpriteWidth * 6,
                    sourceY: destructibleSpriteHeight,
                    width: destructibleSpriteWidth,
                  },
                  {
                    duration: destructibleIdleFrameDuration,
                    height: destructibleSpriteHeight,
                    sourceHeight: destructibleSpriteHeight,
                    sourceWidth: destructibleSpriteWidth,
                    sourceX: destructibleSpriteWidth * 7,
                    sourceY: destructibleSpriteHeight,
                    width: destructibleSpriteWidth,
                  },
                ],
                id: "idle-3",
              },
              {
                frames: [
                  {
                    duration: destructibleIdleFrameDuration,
                    height: destructibleSpriteHeight,
                    sourceHeight: destructibleSpriteHeight,
                    sourceWidth: destructibleSpriteWidth,
                    sourceX: 0 + destructibleSpriteWidth * 9,
                    sourceY: destructibleSpriteHeight,
                    width: destructibleSpriteWidth,
                  },
                  {
                    duration: destructibleIdleFrameDuration,
                    height: destructibleSpriteHeight,
                    sourceHeight: destructibleSpriteHeight,
                    sourceWidth: destructibleSpriteWidth,
                    sourceX: destructibleSpriteWidth * 10,
                    sourceY: destructibleSpriteHeight,
                    width: destructibleSpriteWidth,
                  },
                ],
                id: "idle-4",
              },
              {
                frames: [
                  {
                    duration: destructibleIdleFrameDuration,
                    height: destructibleSpriteHeight,
                    sourceHeight: destructibleSpriteHeight,
                    sourceWidth: destructibleSpriteWidth,
                    sourceX: 0 + destructibleSpriteWidth * 12,
                    sourceY: destructibleSpriteHeight,
                    width: destructibleSpriteWidth,
                  },
                  {
                    duration: destructibleIdleFrameDuration,
                    height: destructibleSpriteHeight,
                    sourceHeight: destructibleSpriteHeight,
                    sourceWidth: destructibleSpriteWidth,
                    sourceX: destructibleSpriteWidth * 13,
                    sourceY: destructibleSpriteHeight,
                    width: destructibleSpriteWidth,
                  },
                ],
                id: "idle-5",
              },
            ],
            imagePath: "destructible",
          }),
          x: (): number => {
            if (state.values.destructible === null) {
              throw new Error(
                "An attempt was made to get the destructible's x position but the destructible does not exist",
              );
            }
            const baseOffset: number = -3;
            if (state.values.destructible.tookDamageAt !== null) {
              const diff: number =
                getCurrentTime() - state.values.destructible.tookDamageAt;
              const duration: number = 50;
              if (diff < duration) {
                if (
                  state.values.destructible.damageDirection === XDirection.Left
                ) {
                  return baseOffset - 1;
                }
                return baseOffset + 1;
              }
              if (diff < duration * 2) {
                if (
                  state.values.destructible.damageDirection === XDirection.Left
                ) {
                  return baseOffset + 1;
                }
                return baseOffset - 1;
              }
            }
            return baseOffset;
          },
          y: -destructibleSpriteHeight + entityHitboxHeight + 2,
        },
      ],
      type: "destructible",
      width: destructibleHitboxWidth,
    });
    const baseEntityID: string = createEntity({
      height: entityHitboxHeight,
      layerID: "Bases",
      levelID,
      position: {
        x,
        y,
      },
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
                    sourceWidth: 16,
                    sourceX: 0,
                    sourceY: 0,
                    width: 16,
                  },
                ],
                id: "default",
              },
            ],
            imagePath: "destructible-base",
          }),
          x: -3,
          y: -3,
        },
      ],
      width: destructibleHitboxWidth,
    });
    state.setValues({
      destructible: {
        baseEntityID,
        batteryEntityID,
        createdAt: getCurrentTime(),
        damageDirection: null,
        hp: 5,
        tookDamageAt: null,
      },
    });
  }
};
