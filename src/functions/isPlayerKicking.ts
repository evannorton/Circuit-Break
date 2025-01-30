import { getCurrentTime } from "pixel-pigeon";
import { kickAfterDuration, kickBeforeDuration } from "../constants";
import { state } from "../state";

export const isPlayerKicking = (): boolean =>
  state.values.playerKick !== null &&
  getCurrentTime() - state.values.playerKick.createdAt <
    kickBeforeDuration + kickAfterDuration;
