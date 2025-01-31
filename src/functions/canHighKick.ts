import {
  comboThreshold,
  punchAfterDuration,
  punchBeforeDuration,
} from "../constants";
import { getCurrentTime } from "pixel-pigeon";
import { state } from "../state";

export const canHighKick = (): boolean => {
  if (state.values.playerPunch !== null) {
    const currentTime: number = getCurrentTime();
    const punchOverAt: number =
      state.values.playerPunch.createdAt +
      punchBeforeDuration +
      punchAfterDuration;
    return (
      currentTime >= punchOverAt && currentTime < comboThreshold + punchOverAt
    );
  }
  return false;
};
