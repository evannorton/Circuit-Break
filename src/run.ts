import { createCollisionBoundaries } from "./functions/createCollisionBoundaries";
import { createUI } from "./functions/ui/createUI";
import { goToLevel, setPauseMenuCondition } from "pixel-pigeon";
import { isGameOngoing } from "./functions/isGameOngoing";
import { levelID } from "./constants";

export const run = (): void => {
  setPauseMenuCondition((): boolean => isGameOngoing());
  createUI();
  goToLevel(levelID);
  createCollisionBoundaries();
};
