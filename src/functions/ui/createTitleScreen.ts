import {
  createInputPressHandler,
  createSprite,
  getGameHeight,
  getGameWidth,
} from "pixel-pigeon";
import { startGame } from "../startGame";
import { startInputCollectionID } from "../../input";
import { state } from "../../state";

export const createTitleScreen = (): void => {
  const width: number = getGameWidth();
  const height: number = getGameHeight();
  createSprite({
    animationID: "default",
    animations: [
      {
        frames: [
          {
            height,
            sourceHeight: height,
            sourceWidth: width,
            sourceX: 0,
            sourceY: 0,
            width,
          },
        ],
        id: "default",
      },
    ],
    coordinates: {
      condition: (): boolean => state.values.gameStartedAt === null,
      x: 0,
      y: 0,
    },
    imagePath: "title",
  });
  createInputPressHandler({
    condition: (): boolean => state.values.gameStartedAt === null,
    inputCollectionID: startInputCollectionID,
    onInput: (): void => {
      startGame();
    },
  });
};
