import { getCurrentTime } from "pixel-pigeon";
import { jumpDuration } from "../constants";
import { state } from "../state";

export const isPlayerJumping = (): boolean =>
  state.values.jumpedAt !== null &&
  getCurrentTime() - state.values.jumpedAt < jumpDuration;
