import {
  EntityPosition,
  createEntity,
  createSprite,
  getGameHeight,
} from "pixel-pigeon";
import { XDirection } from "../types/Direction";
import { levelID, playerHeight } from "../constants";
import { state } from "../state";

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
                  if (isMoving) {
                    return "walk-left";
                  }
                  return "idle-left";
                case XDirection.Right:
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
            ],
            imagePath: "player",
          }),
        },
      ],
      width: 16,
    }),
  });
};
