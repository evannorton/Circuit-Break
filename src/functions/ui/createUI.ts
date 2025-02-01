import { createDefeatScreen } from "./createDefeatScreen";
import { createHUD } from "./createHUD";
import { createTitleScreen } from "./createTitleScreen";

export const createUI = (): void => {
  createTitleScreen();
  createDefeatScreen();
  createHUD();
};
