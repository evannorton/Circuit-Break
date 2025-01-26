import {
  EntityPosition,
  createEntity,
  createSprite,
  getCurrentTime,
  getGameHeight,
} from "pixel-pigeon";
import { XDirection } from "../types/Direction";
import { jumpDuration, levelID, playerHeight } from "../constants";
import { state } from "../state";
import { isPlayerJumping } from "./isPlayerJumping";

export const createPlayer = (): void => {
  const position: EntityPosition = {
    x: 16,
    y: getGameHeight() - 48,
  };
  state.setValues({
    playerEntityID: createEntity({
      collidableEntityTypes: ["boundary"],
      collidesWithMap: true,
      height: playerHeight,
      layerID: "Player",
      levelID,
      position,
      sprites: [
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
                    height: 32,
                    sourceHeight: 32,
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
                    height: 32,
                    sourceHeight: 32,
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
                    height: 32,
                    sourceHeight: 32,
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
                    height: 32,
                    sourceHeight: 32,
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
                    height: 32,
                    sourceHeight: 32,
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
                    height: 32,
                    sourceHeight: 32,
                    sourceWidth: 18,
                    sourceX: 0,
                    sourceY: 160,
                    width: 18,
                  },
                ],
                id: "jump-right",
              }
            ],
            imagePath: "player",
          }),
          y: (): number => {
            if (isPlayerJumping()) {
              if (state.values.jumpedAt === null) {
                throw new Error("Player is jumping but jumpedAt is null");
              }
              const maxOffset: number = 12;
              const x: number = (getCurrentTime() - (state.values.jumpedAt)) / (jumpDuration / 2);
              return -Math.floor(maxOffset * (1 - Math.pow(x - 1, 2)));
            }
            return 0;
          }
        },
      ],
      width: 16,
    }),
  });
};
