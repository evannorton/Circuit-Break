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
  applyAudioSourceVolume("music/chill", { volume: 0 });
  playAudioSource("music/main", {
    loopPoint: 70073,
    volumeChannelID: musicVolumeChannelID,
  });
  playAudioSource("music/chill", {
    loopPoint: 70073,
    volumeChannelID: musicVolumeChannelID,
  });
  state.setValues({
    titleStartedAt: getCurrentTime(),
  });
};
