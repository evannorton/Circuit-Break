import { createCollisionBoundaries } from "./functions/createCollisionBoundaries";
import { createUI } from "./functions/ui/createUI";
import { getCurrentTime, goToLevel, setPauseMenuCondition } from "pixel-pigeon";
import { isGameOngoing } from "./functions/isGameOngoing";
import { levelID } from "./constants";
import { state } from "./state";

export const run = (): void => {
  setPauseMenuCondition((): boolean => isGameOngoing());
  createUI();
  goToLevel(levelID);
  createCollisionBoundaries();
  state.setValues({
    titleStartedAt: getCurrentTime(),
  });
};
