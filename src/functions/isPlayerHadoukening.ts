import { getCurrentTime } from "pixel-pigeon";
import { hadoukenAfterDuration, hadoukenBeforeDuration } from "../constants";
import { state } from "../state";

export const isPlayerHadoukening = (): boolean =>
  state.values.playerHadouken !== null &&
  getCurrentTime() - state.values.playerHadouken.createdAt <
    hadoukenBeforeDuration + hadoukenAfterDuration;
