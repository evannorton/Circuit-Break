import { createLabel, createSprite, getGameWidth } from "pixel-pigeon";
import { state } from "../../state";

export const createInstructions = (): void => {
  const width: number = 218;
  const height: number = 104;
  const x: number = Math.floor(getGameWidth() / 2 - width / 2);
  const y: number = 4;
  const condition = (): boolean =>
    state.values.gameStartedAt !== null &&
    state.values.enemiesStartedAt === null;
  const textPadding: number = 8;
  const textX: number = x + textPadding;
  const textY: number = y + textPadding;
  const textMaxWidth: number = width - textPadding * 2;
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
      condition,
      x,
      y,
    },
    imagePath: "tutorial",
  });
  createLabel({
    color: "#ffffff",
    coordinates: {
      condition,
      x: textX,
      y: textY,
    },
    horizontalAlignment: "left",
    maxWidth: textMaxWidth,
    text: {
      value:
        "Fend off the evil robots trying to harness your power. Destroy batteries to gain new powers and restore HP.",
    },
  });
  createLabel({
    color: "#ffffff",
    coordinates: {
      condition,
      x: textX,
      y: textY + 44,
    },
    horizontalAlignment: "left",
    maxWidth: textMaxWidth,
    text: {
      value: "- Arrow keys/D-Pad to move.",
    },
  });
  createLabel({
    color: "#ffffff",
    coordinates: {
      condition,
      x: textX,
      y: textY + 54,
    },
    horizontalAlignment: "left",
    maxWidth: textMaxWidth,
    text: {
      value: "- Z key/A button to jump.",
    },
  });
  createLabel({
    color: "#ffffff",
    coordinates: {
      condition,
      x: textX,
      y: textY + 64,
    },
    horizontalAlignment: "left",
    maxWidth: textMaxWidth,
    text: {
      value: "- X key/X button for light attack.",
    },
  });
  createLabel({
    color: "#ffffff",
    coordinates: {
      condition,
      x: textX,
      y: textY + 74,
    },
    horizontalAlignment: "left",
    maxWidth: textMaxWidth,
    text: {
      value: "- C key/B button for heavy attack.",
    },
  });
};
