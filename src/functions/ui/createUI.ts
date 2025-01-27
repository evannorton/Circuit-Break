import {
  CreateLabelOptionsText,
  createLabel,
  createQuadrilateral,
  createSprite,
  getGameWidth,
} from "pixel-pigeon";
import { getPowerLevel } from "../getPowerLevel";
import { isPowerPercentageReached } from "../isPowerPercentageReached";

export const createUI = (): void => {
  const width: number = 61;
  const x: number = getGameWidth() - width - 1;
  const y: number = 0;
  createSprite({
    animationID: "default",
    animations: [
      {
        frames: [
          {
            height: 62,
            sourceHeight: 62,
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
      x,
      y,
    },
    imagePath: "battery",
  });
  createLabel({
    color: "#eeffa9",
    coordinates: {
      x: getGameWidth() - width + Math.floor(width / 2),
      y: 14,
    },
    horizontalAlignment: "center",
    text: (): CreateLabelOptionsText => {
      const powerLevel: number | null = getPowerLevel();
      if (powerLevel === null) {
        return { value: "MAX" };
      }
      return {
        value: `PWR ${powerLevel}`,
      };
    },
  });
  for (let i: number = 0; i < 16; i++) {
    const tickX: number = x + 19;
    createQuadrilateral({
      color: "#eeffa9",
      coordinates: {
        condition: (): boolean => isPowerPercentageReached((i + 1) / 16),
        x: tickX + i + Math.floor(i / 2),
        y: y + 26,
      },
      height: 8,
      width: 1,
    });
  }
};
