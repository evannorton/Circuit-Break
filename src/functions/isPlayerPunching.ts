import { getCurrentTime } from "pixel-pigeon";
import { punchDuration } from "../constants";
import { state } from "../state";

export const isPlayerPunching = (): boolean =>
  state.values.punchedAt !== null &&
  getCurrentTime() - state.values.punchedAt < punchDuration;
