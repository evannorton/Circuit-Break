import { powerLevels } from "../constants";
import { state } from "../state";

export const getPowerLevel = (): number | null => {
  let iteratedPower: number = 0;
  for (let i: number = 0; i < powerLevels.length; i++) {
    const powerLevel: number | undefined = powerLevels[i];
    if (typeof powerLevel === "undefined") {
      throw new Error("Power level is undefined.");
    }
    iteratedPower += powerLevel;
    if (state.values.power < iteratedPower) {
      return i;
    }
  }
  return null;
};
