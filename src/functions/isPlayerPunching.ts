import { getCurrentTime } from "pixel-pigeon";
import { punchDuration } from "../constants";
import { state } from "../state";

export const isPlayerPunching = (): boolean =>
  state.values.punch !== null &&
  getCurrentTime() - state.values.punch.createdAt < punchDuration;
