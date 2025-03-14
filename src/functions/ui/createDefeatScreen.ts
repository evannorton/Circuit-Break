import {
  createButton,
  createInputPressHandler,
  createSprite,
  getCurrentTime,
  getGameHeight,
  getGameWidth,
} from "pixel-pigeon";
import { startInputCollectionID } from "../../input";
import { state } from "../../state";

export const createDefeatScreen = (): void => {
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
      condition: (): boolean =>
        state.values.didWin === false &&
        state.values.gameEndedAt !== null &&
        state.values.defeatAdvancedAt === null,
      x: 0,
      y: 0,
    },
    imagePath: "defeat/default",
  });
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
      condition: (): boolean =>
        state.values.didWin === false &&
        state.values.gameEndedAt !== null &&
        state.values.defeatAdvancedAt !== null,
      x: 0,
      y: 0,
    },
    imagePath: "defeat/pressed",
  });
  createButton({
    coordinates: {
      condition: (): boolean =>
        state.values.didWin === false &&
        state.values.gameEndedAt !== null &&
        state.values.defeatAdvancedAt === null,
      x: 151,
      y: 134,
    },
    height: 41,
    onClick: (): void => {
      state.setValues({
        defeatAdvancedAt: getCurrentTime(),
      });
    },
    width: 90,
  });
  createInputPressHandler({
    condition: (): boolean =>
      state.values.didWin === false &&
      state.values.gameEndedAt !== null &&
      state.values.defeatAdvancedAt === null,
    inputCollectionID: startInputCollectionID,
    onInput: (): void => {
      state.setValues({
        defeatAdvancedAt: getCurrentTime(),
      });
    },
  });
};
