import { getCurrentTime } from "pixel-pigeon";
import { kickAfterDuration } from "../constants";
import { state } from "../state";

export const isPlayerKicking = (): boolean =>
  state.values.kick !== null &&
  getCurrentTime() - state.values.kick.createdAt < kickAfterDuration;
