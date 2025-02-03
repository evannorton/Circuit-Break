import {
  applyAudioSourceVolume,
  fadeInAudioSourceVolume,
  fadeOutAudioSourceVolume,
  getCurrentTime,
} from "pixel-pigeon";
import { state } from "../state";

export const endGame = (didWin: boolean): void => {
  fadeOutAudioSourceVolume("music/main", {
    duration: 1000,
  });
  applyAudioSourceVolume("music/chill", { volume: 0.5 });
  fadeInAudioSourceVolume("music/chill", {
    duration: 1000,
  });
  state.setValues({
    didWin,
    gameEndedAt: getCurrentTime(),
  });
};
