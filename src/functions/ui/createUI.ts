import { createGameOverScreen } from "./createGameOverScreen";
import { createHUD } from "./createHUD";
import { createTitleScreen } from "./createTitleScreen";

export const createUI = (): void => {
  createTitleScreen();
  createGameOverScreen();
  createHUD();
};
