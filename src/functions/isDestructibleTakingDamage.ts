import { damageDuration } from "../constants";
import { getCurrentTime } from "pixel-pigeon";
import { state } from "../state";

export const isDestructibleTakingDamage = (): boolean => {
  if (state.values.destructible === null) {
    throw new Error(
      "An attempt was made to get the animation ID of a destructible but no box exists",
    );
  }
  return (
    state.values.destructible.tookDamageAt !== null &&
    getCurrentTime() - state.values.destructible.tookDamageAt < damageDuration
  );
};
