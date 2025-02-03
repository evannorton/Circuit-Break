import { createDefeatScreen } from "./createDefeatScreen";
import { createHUD } from "./createHUD";
import { createInstructions } from "./createInstructions";
import { createTitleScreen } from "./createTitleScreen";
import { createVictoryScreen } from "./createVictoryScreen";

export const createUI = (): void => {
  createTitleScreen();
  createVictoryScreen();
  createDefeatScreen();
  createHUD();
  createInstructions();
};
