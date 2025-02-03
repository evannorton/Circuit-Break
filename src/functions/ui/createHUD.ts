import { PowerLevel } from "../../types/PowerLevel";
import {
  createQuadrilateral,
  createSprite,
  getCurrentTime,
  getGameWidth,
} from "pixel-pigeon";
import { getPowerLevelIndex } from "../getPowerLevelIndex";
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
        condition: (): boolean =>
          isGameOngoing() && (i + 1) * 2 <= state.values.playerMaxHP,
        x: (): number => {
          let offset: number = 0;
          if (state.values.playerMaxHP === 10) {
            offset += 4;
          }
          if (state.values.playerMaxHP === 8) {
            offset += 8;
          }
          if (state.values.playerMaxHP === 6) {
            offset += 12;
          }
          return offset + x + 9 + i * 8;
        },
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
  const unlockWidth: number = 115;
  const unlockHeight: number = 70;
  const unlockCondition = (): boolean =>
    isGameOngoing() &&
    state.values.unlockDisplayedAt !== null &&
    getCurrentTime() - state.values.unlockDisplayedAt < 5000;
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
      let powerLevelIndex: number | null = getPowerLevelIndex();
      if (powerLevelIndex === null) {
        powerLevelIndex = powerLevels.length;
      }
      const powerLevel: PowerLevel | undefined =
        powerLevels[powerLevelIndex - 1];
      if (typeof powerLevel === "undefined") {
        throw new Error("No power level found");
      }
      return powerLevel.unlockImagePath;
    },
    opacity: (): number => {
      if (state.values.unlockDisplayedAt === null) {
        throw new Error("Unlock displayed at is null");
      }
      const diff: number =
        getCurrentTime() - state.values.unlockDisplayedAt - 4000;
      if (diff >= 0 && diff <= 1000) {
        return 1 - diff / 1000;
      }
      return 1;
    },
  });
};
