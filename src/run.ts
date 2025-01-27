import { Enemy } from "./classes/Enemy";
import { createCollisionBoundaries } from "./functions/createCollisionBoundaries";
import { createDestructible } from "./functions/createDestructible";
import { createPlayer } from "./functions/createPlayer";
import { createUI } from "./functions/ui/createUI";
import { goToLevel, setPauseMenuCondition } from "pixel-pigeon";
import { levelID } from "./constants";

export const run = (): void => {
  setPauseMenuCondition((): boolean => true);
  createUI();
  goToLevel(levelID);
  createPlayer();
  createDestructible();
  createCollisionBoundaries();
  new Enemy({});
};
