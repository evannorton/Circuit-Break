import { PowerLevel } from "../types/PowerLevel";
import { powerLevels } from "../constants";
import { state } from "../state";

const getPowerLevelIndexRequirement = (index: number): number => {
  let amount: number = 0;
  for (let i: number = 0; i <= index; i++) {
    const powerLevel: PowerLevel | undefined = powerLevels[i];
    if (typeof powerLevel === "undefined") {
      throw new Error("Power level is undefined.");
    }
    amount += powerLevel.amount;
  }
  return amount;
};

export const getPowerLevelIndex = (): number | null => {
  for (let i: number = powerLevels.length - 1; i >= 0; i--) {
    const req: number = getPowerLevelIndexRequirement(i);
    if (state.values.power >= req) {
      if (i === powerLevels.length - 1) {
        return null;
      }
      return i + 1;
    }
  }
  return 0;
};
