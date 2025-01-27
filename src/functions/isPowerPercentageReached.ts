import { getPowerLevel } from "./getPowerLevel";
import { powerLevels } from "../constants";
import { state } from "../state";

export const isPowerPercentageReached = (percentage: number): boolean => {
  const powerLevel: number | null = getPowerLevel();
  if (powerLevel === null) {
    return true;
  }
  let powerTowardNextLevel: number = state.values.power;
  for (let i: number = 0; i < powerLevel; i++) {
    const iPowerLevel: number | undefined = powerLevels[i];
    if (typeof iPowerLevel === "undefined") {
      throw new Error("Power level is undefined.");
    }
    powerTowardNextLevel -= iPowerLevel;
  }
  const powerNeededForNextLevel: number | undefined = powerLevels[powerLevel];
  if (typeof powerNeededForNextLevel === "undefined") {
    throw new Error("Power level is undefined.");
  }
  return powerTowardNextLevel / powerNeededForNextLevel >= percentage;
};
