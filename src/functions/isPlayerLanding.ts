import { getCurrentTime } from "pixel-pigeon";
import { isPlayerJumping } from "./isPlayerJumping";
import { jumpDuration, landDuration } from "../constants";
import { state } from "../state";

export const isPlayerLanding = (): boolean =>
  isPlayerJumping() === false &&
  state.values.jumpedAt !== null &&
  getCurrentTime() - state.values.jumpedAt < jumpDuration + landDuration;
