import { getCurrentTime } from "pixel-pigeon";
import { playerDamageDuration } from "../constants";
import { state } from "../state";

export const isPlayerTakingDamage = (): boolean =>
  state.values.playerTookDamageAt !== null &&
  getCurrentTime() - state.values.playerTookDamageAt < playerDamageDuration;
