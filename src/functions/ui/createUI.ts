import { createDefeatScreen } from "./createDefeatScreen";
import { createHUD } from "./createHUD";
import { createInstructions } from "./createInstructions";
import { createTitleScreen } from "./createTitleScreen";

export const createUI = (): void => {
  createTitleScreen();
  createDefeatScreen();
  createHUD();
  createInstructions();
};
