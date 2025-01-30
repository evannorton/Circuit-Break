import { getCurrentTime } from "pixel-pigeon";
import { state } from "../state";

export const isPlayerStunned = (): boolean => {
  if (state.values.playerTookDamageAt !== null) {
    if (state.values.playerStunDuration === null) {
      throw new Error("Player stun duration is null.");
    }
    return (
      getCurrentTime() - state.values.playerTookDamageAt <
      state.values.playerStunDuration
    );
  }
  return false;
};
