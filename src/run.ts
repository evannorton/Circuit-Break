import {
  applyAudioSourceVolume,
  getCurrentTime,
  goToLevel,
  playAudioSource,
  setPauseMenuCondition,
} from "pixel-pigeon";
import { createCollisionBoundaries } from "./functions/createCollisionBoundaries";
import { createUI } from "./functions/ui/createUI";
import { isGameOngoing } from "./functions/isGameOngoing";
import { levelID } from "./constants";
import { musicVolumeChannelID } from "./volumeChannels";
import { state } from "./state";

export const run = (): void => {
  setPauseMenuCondition((): boolean => isGameOngoing());
  createUI();
  goToLevel(levelID);
  createCollisionBoundaries();
  playAudioSource("music/main", {
    loopPoint: 70730,
    volumeChannelID: musicVolumeChannelID,
  });
  playAudioSource("music/chill", {
    loopPoint: 70730,
    volumeChannelID: musicVolumeChannelID,
  });
  applyAudioSourceVolume("music/main", { volume: 0.5 });
  applyAudioSourceVolume("music/chill", { volume: 0 });
  state.setValues({
    titleStartedAt: getCurrentTime(),
  });
};
