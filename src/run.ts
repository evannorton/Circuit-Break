import { createCollisionBoundaries } from "./functions/createCollisionBoundaries";
import { createUI } from "./functions/ui/createUI";
import {
  getCurrentTime,
  goToLevel,
  playAudioSource,
  setPauseMenuCondition,
} from "pixel-pigeon";
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
    loopPoint: 70073,
    volumeChannelID: musicVolumeChannelID,
  });
  state.setValues({
    titleStartedAt: getCurrentTime(),
  });
};
