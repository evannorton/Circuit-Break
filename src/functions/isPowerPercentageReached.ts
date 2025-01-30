import { PowerLevel } from "../types/PowerLevel";
import { getPowerLevelIndex } from "./getPowerLevel";
import { powerLevels } from "../constants";
import { state } from "../state";

export const isPowerPercentageReached = (percentage: number): boolean => {
  const powerLevel: number | null = getPowerLevelIndex();
  if (powerLevel === null) {
    return true;
  }
  let powerTowardNextLevel: number = state.values.power;
  for (let i: number = 0; i < powerLevel; i++) {
    const iPowerLevel: PowerLevel | undefined = powerLevels[i];
    if (typeof iPowerLevel === "undefined") {
      throw new Error("Power level is undefined.");
    }
    powerTowardNextLevel -= iPowerLevel.amount;
  }
  const powerNeededForNextLevel: PowerLevel | undefined =
    powerLevels[powerLevel];
  if (typeof powerNeededForNextLevel === "undefined") {
    throw new Error("Power level is undefined.");
  }
  return powerTowardNextLevel / powerNeededForNextLevel.amount >= percentage;
};
