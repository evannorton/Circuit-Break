import { createQuadrilateral, createSprite, getGameWidth } from "pixel-pigeon";
import { heartsAmount } from "../../constants";
import { isPowerPercentageReached } from "../isPowerPercentageReached";
import { state } from "../../state";

export const createUI = (): void => {
  const width: number = 65;
  const height: number = 53;
  const x: number = getGameWidth() - width - 1;
  const y: number = 1;
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
  // HP hearts
  for (let i: number = 0; i < heartsAmount; i++) {
    createSprite({
      animationID: "default",
      animations: [
        {
          frames: [
            {
              height: 6,
              sourceHeight: 6,
              sourceWidth: 7,
              sourceX: 0,
              sourceY: 0,
              width: 7,
            },
          ],
          id: "default",
        },
      ],
      coordinates: {
        x: (): number => x + 9 + i * 8,
        y: y + 12,
      },
      imagePath: (): string => {
        const emptyHP: number = i * 2;
        const fullHP: number = i * 2 + 2;
        if (state.values.playerHP >= fullHP) {
          return "battery-hearts/full";
        }
        if (state.values.playerHP <= emptyHP) {
          return "battery-hearts/empty";
        }
        return "battery-hearts/half";
      },
    });
  }
  // Battery ticks
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
