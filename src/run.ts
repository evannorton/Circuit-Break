import { createCollisionBoundaries } from "./functions/createCollisionBoundaries";
import { createDestructible } from "./functions/createDestructible";
import { createPlayer } from "./functions/createPlayer";
import { goToLevel, setPauseMenuCondition } from "pixel-pigeon";
import { levelID } from "./constants";

export const run = (): void => {
  setPauseMenuCondition((): boolean => true);
  goToLevel(levelID);
  createPlayer();
  createDestructible();
  createCollisionBoundaries();
};
