import { getCurrentTime } from "pixel-pigeon";
import { highKickAfterDuration, highKickBeforeDuration } from "../constants";
import { state } from "../state";

export const isPlayerHighKicking = (): boolean =>
  state.values.playerHighKick !== null &&
  getCurrentTime() - state.values.playerHighKick.createdAt <
    highKickBeforeDuration + highKickAfterDuration;
