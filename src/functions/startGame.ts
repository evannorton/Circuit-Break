import { createPlayer } from "./createPlayer";
import { getCurrentTime } from "pixel-pigeon";
import { state } from "../state";

export const startGame = (): void => {
  state.setValues({
    gameStartedAt: getCurrentTime(),
  });
  createPlayer();
};
