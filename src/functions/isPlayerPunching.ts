import { getCurrentTime } from "pixel-pigeon";
import { punchAfterDuration } from "../constants";
import { state } from "../state";

export const isPlayerPunching = (): boolean =>
  state.values.punch !== null &&
  getCurrentTime() - state.values.punch.createdAt < punchAfterDuration;
