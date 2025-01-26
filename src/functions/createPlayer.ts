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
  const startingPosition: EntityPosition = {
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
      position: startingPosition,
      sprites: [
        {
          spriteID: createSprite({
            animationID: (): string => {
              switch (state.values.direction) {
                case XDirection.Left:
                  return "idle-left";
                case XDirection.Right:
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
            ],
            imagePath: "player",
          }),
        },
      ],
      width: 18,
    }),
  });
};
