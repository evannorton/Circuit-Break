import { getCurrentTime } from "pixel-pigeon";
import { state } from "../state";

export const isDestructibleStunned = (): boolean => {
  if (state.values.destructible === null) {
    throw new Error(
      "An attempt was made to get the animation ID of a destructible but no box exists",
    );
  }
  if (state.values.destructible.tookDamageAt !== null) {
    if (state.values.destructible.stunDuration === null) {
      throw new Error(
        "An attempt was made to get the animation ID of a destructible but no stun duration exists",
      );
    }
    return (
      getCurrentTime() - state.values.destructible.tookDamageAt <
      state.values.destructible.stunDuration
    );
  }
  return false;
};
