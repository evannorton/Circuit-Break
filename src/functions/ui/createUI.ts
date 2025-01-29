import { createQuadrilateral, createSprite, getGameWidth } from "pixel-pigeon";
import { isPowerPercentageReached } from "../isPowerPercentageReached";

export const createUI = (): void => {
  const width: number = 65;
  const height: number = 53;
  const x: number = getGameWidth() - width - 1;
  const y: number = 0;
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
      x,
      y,
    },
    imagePath: "battery",
  });
  for (let i: number = 0; i < 20; i++) {
    const tickX: number = x + 22;
    createQuadrilateral({
      color: "#d59cfc",
      coordinates: {
        condition: (): boolean => isPowerPercentageReached((i + 1) / 20),
        x: tickX + i + Math.floor(i / 2),
        y: y + 23,
      },
      height: 5,
      width: 1,
    });
  }
};
