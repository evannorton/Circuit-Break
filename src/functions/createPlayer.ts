import {
  EntityPosition,
  createEntity,
  createQuadrilateral,
  createSprite,
  getCurrentTime,
} from "pixel-pigeon";
import { XDirection } from "../types/Direction";
import { isPlayerJumping } from "./isPlayerJumping";
import {
  jumpDuration,
  levelID,
  minY,
  playerHitboxHeight,
  playerHitboxWidth,
  playerSpriteHeight,
  renderHitboxes,
} from "../constants";
import { state } from "../state";

export const createPlayer = (): void => {
  const y: number = minY;
  const position: EntityPosition = {
    x: 16,
    y,
  };
  state.setValues({
    playerEntityID: createEntity({
      collidableEntityTypes: ["boundary"],
      collidesWithMap: true,
      height: playerHitboxHeight,
      layerID: "Entities",
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
              y: playerHitboxHeight - 1,
            },
            {
              quadrilateralID: createQuadrilateral({
                color: "#d59cfc",
                height: playerHitboxHeight,
                width: 1,
              }),
            },
            {
              quadrilateralID: createQuadrilateral({
                color: "#d59cfc",
                height: playerHitboxHeight,
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
          y: -playerSpriteHeight + playerHitboxHeight + 26,
        },
        {
          spriteID: createSprite({
            animationID: (): string => {
              const isMoving: boolean =
                state.values.movingXDirection !== null ||
                state.values.movingYDirection !== null;
              switch (state.values.facingDirection) {
                case XDirection.Left:
                  if (isPlayerJumping()) {
                    return "jump-left";
                  }
                  if (isMoving) {
                    return "walk-left";
                  }
                  return "idle-left";
                case XDirection.Right:
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
                    sourceWidth: 18,
                    sourceX: 0,
                    sourceY: 0,
                    width: 18,
                  },
                ],
                id: "idle-left",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: 18,
                    sourceX: 0,
                    sourceY: 32,
                    width: 18,
                  },
                ],
                id: "idle-right",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: 18,
                    sourceX: 0,
                    sourceY: 64,
                    width: 18,
                  },
                ],
                id: "walk-left",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: 18,
                    sourceX: 0,
                    sourceY: 96,
                    width: 18,
                  },
                ],
                id: "walk-right",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: 18,
                    sourceX: 0,
                    sourceY: 128,
                    width: 18,
                  },
                ],
                id: "jump-left",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: 18,
                    sourceX: 0,
                    sourceY: 160,
                    width: 18,
                  },
                ],
                id: "jump-right",
              },
            ],
            imagePath: "player",
          }),
          y: (): number => {
            const baseOffset: number = -playerSpriteHeight + playerHitboxHeight;
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
      width: playerHitboxWidth,
    }),
  });
};
