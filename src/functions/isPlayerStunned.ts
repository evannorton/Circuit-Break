import { enemyStunDuration } from "../constants";
import { getCurrentTime } from "pixel-pigeon";
import { state } from "../state";

export const isPlayerStunned = (): boolean =>
  state.values.playerTookDamageAt !== null &&
  getCurrentTime() - state.values.playerTookDamageAt < enemyStunDuration;
