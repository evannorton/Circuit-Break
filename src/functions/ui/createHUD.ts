import {
  CreateLabelOptionsText,
  createLabel,
  createQuadrilateral,
  createSprite,
  getCurrentTime,
  getGameWidth,
} from "pixel-pigeon";
import { PowerLevel } from "../../types/PowerLevel";
import { getPowerLevelIndex } from "../getPowerLevel";
import { heartsAmount, powerLevels } from "../../constants";
import { isGameOngoing } from "../isGameOngoing";
import { isPowerPercentageReached } from "../isPowerPercentageReached";
import { state } from "../../state";

export const createHUD = (): void => {
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
      condition: (): boolean => isGameOngoing(),
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
        condition: (): boolean => isGameOngoing(),
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
        condition: (): boolean =>
          isGameOngoing() && isPowerPercentageReached((i + 1) / 20),
        x: tickX + i + Math.floor(i / 2),
        y: y + 23,
      },
      height: 5,
      width: 1,
    });
  }
  // Unlock
  const unlockWidth: number = 88;
  const unlockHeight: number = 80;
  const unlockCondition = (): boolean =>
    isGameOngoing() &&
    state.values.unlockDisplayedAt !== null &&
    getCurrentTime() - state.values.unlockDisplayedAt < 3000;
  createSprite({
    animationID: "default",
    animations: [
      {
        frames: [
          {
            height: unlockHeight,
            sourceHeight: unlockHeight,
            sourceWidth: unlockWidth,
            sourceX: 0,
            sourceY: 0,
            width: unlockWidth,
          },
        ],
        id: "default",
      },
    ],
    coordinates: {
      condition: unlockCondition,
      x: Math.floor(getGameWidth() / 2 - unlockWidth / 2),
      y: 1,
    },
    imagePath: (): string => {
      const powerLevelIndex: number | null = getPowerLevelIndex();
      if (powerLevelIndex === null) {
        throw new Error("No power level index found");
      }
      const powerLevel: PowerLevel | undefined = powerLevels[powerLevelIndex];
      if (typeof powerLevel === "undefined") {
        throw new Error("No power level found");
      }
      return powerLevel.unlockImagePath;
    },
  });
  createLabel({
    color: "#ffffff",
    coordinates: {
      condition: unlockCondition,
      x: Math.floor(getGameWidth() / 2),
      y: 10,
    },
    horizontalAlignment: "center",
    text: { value: "New combo:" },
  });
  createLabel({
    color: "#ffffff",
    coordinates: {
      condition: unlockCondition,
      x: Math.floor(getGameWidth() / 2),
      y: 20,
    },
    horizontalAlignment: "center",
    text: (): CreateLabelOptionsText => {
      const powerLevelIndex: number | null = getPowerLevelIndex();
      if (powerLevelIndex === null) {
        throw new Error("No power level index found");
      }
      const powerLevel: PowerLevel | undefined = powerLevels[powerLevelIndex];
      if (typeof powerLevel === "undefined") {
        throw new Error("No power level found");
      }
      return { value: powerLevel.unlockName };
    },
  });
};
