import {
  EntityPosition,
  createEntity,
  createQuadrilateral,
  createSprite,
  getCurrentTime,
} from "pixel-pigeon";
import { XDirection } from "../types/Direction";
import {
  entityHitboxHeight,
  jumpDuration,
  levelID,
  playerHitboxWidth,
  playerSpriteHeight,
  renderHitboxes,
} from "../constants";
import { isPlayerJumping } from "./isPlayerJumping";
import { isPlayerKicking } from "./isPlayerKicking";
import { isPlayerPunching } from "./isPlayerPunching";
import { state } from "../state";

export const createPlayer = (): void => {
  const position: EntityPosition = {
    x: 16,
    y: 96,
  };
  state.setValues({
    playerEntityID: createEntity({
      collidableEntityTypes: ["boundary", "destructible", "enemy"],
      collidesWithMap: true,
      height: entityHitboxHeight,
      layerID: "Characters",
      levelID,
      position,
      quadrilaterals: renderHitboxes
        ? [
            {
              quadrilateralID: createQuadrilateral({
                color: "#d59cfc",
                height: 1,
                width: playerHitboxWidth,
              }),
            },
            {
              quadrilateralID: createQuadrilateral({
                color: "#d59cfc",
                height: 1,
                width: playerHitboxWidth,
              }),
              y: entityHitboxHeight - 1,
            },
            {
              quadrilateralID: createQuadrilateral({
                color: "#d59cfc",
                height: entityHitboxHeight,
                width: 1,
              }),
            },
            {
              quadrilateralID: createQuadrilateral({
                color: "#d59cfc",
                height: entityHitboxHeight,
                width: 1,
              }),
              x: playerHitboxWidth - 1,
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
                    height: 10,
                    sourceHeight: 10,
                    sourceWidth: 20,
                    sourceX: 0,
                    sourceY: 0,
                    width: 20,
                  },
                ],
                id: "default",
              },
            ],
            imagePath: "shadow",
          }),
          x: -2,
          y: -playerSpriteHeight + entityHitboxHeight + 26,
        },
        {
          spriteID: createSprite({
            animationID: (): string => {
              const isMoving: boolean =
                state.values.movingXDirection !== null ||
                state.values.movingYDirection !== null;
              switch (state.values.facingDirection) {
                case XDirection.Left:
                  if (isPlayerKicking()) {
                    return "kick-left";
                  }
                  if (isPlayerPunching()) {
                    return "punch-left";
                  }
                  if (isPlayerJumping()) {
                    return "jump-left";
                  }
                  if (isMoving) {
                    return "walk-left";
                  }
                  return "idle-left";
                case XDirection.Right:
                  if (isPlayerKicking()) {
                    return "kick-right";
                  }
                  if (isPlayerPunching()) {
                    return "punch-right";
                  }
                  if (isPlayerJumping()) {
                    return "jump-right";
                  }
                  if (isMoving) {
                    return "walk-right";
                  }
                  return "idle-right";
              }
            },
            animations: [
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: 24,
                    sourceX: 0,
                    sourceY: 0,
                    width: 24,
                  },
                ],
                id: "idle-left",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: 24,
                    sourceX: 0,
                    sourceY: 32,
                    width: 24,
                  },
                ],
                id: "idle-right",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: 24,
                    sourceX: 0,
                    sourceY: 64,
                    width: 24,
                  },
                ],
                id: "walk-left",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: 24,
                    sourceX: 0,
                    sourceY: 96,
                    width: 24,
                  },
                ],
                id: "walk-right",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: 24,
                    sourceX: 0,
                    sourceY: 128,
                    width: 24,
                  },
                ],
                id: "jump-left",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: 24,
                    sourceX: 0,
                    sourceY: 160,
                    width: 24,
                  },
                ],
                id: "jump-right",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: 24,
                    sourceX: 0,
                    sourceY: 192,
                    width: 24,
                  },
                ],
                id: "punch-left",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: 24,
                    sourceX: 0,
                    sourceY: 224,
                    width: 24,
                  },
                ],
                id: "punch-right",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: 24,
                    sourceX: 0,
                    sourceY: 256,
                    width: 24,
                  },
                ],
                id: "kick-left",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: 24,
                    sourceX: 0,
                    sourceY: 288,
                    width: 24,
                  },
                ],
                id: "kick-right",
              },
            ],
            imagePath: "player",
          }),
          x: (): number => {
            switch (state.values.facingDirection) {
              case XDirection.Left:
                return -7;
              case XDirection.Right:
                return -1;
            }
          },
          y: (): number => {
            const baseOffset: number = -playerSpriteHeight + entityHitboxHeight;
            if (isPlayerJumping()) {
              if (state.values.jumpedAt === null) {
                throw new Error("Player is jumping but jumpedAt is null");
              }
              const maxOffset: number = 12;
              const x: number =
                (getCurrentTime() - state.values.jumpedAt) / (jumpDuration / 2);
              return (
                baseOffset - Math.floor(maxOffset * (1 - Math.pow(x - 1, 2)))
              );
            }
            return baseOffset;
          },
        },
      ],
      type: "player",
      width: playerHitboxWidth,
    }),
  });
};
