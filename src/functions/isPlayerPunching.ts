import { getCurrentTime } from "pixel-pigeon";
import { punchAfterDuration, punchBeforeDuration } from "../constants";
import { state } from "../state";

export const isPlayerPunching = (): boolean =>
  state.values.playerPunch !== null &&
  getCurrentTime() - state.values.playerPunch.createdAt <
    punchBeforeDuration + punchAfterDuration;
