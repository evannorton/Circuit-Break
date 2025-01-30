import { getCurrentTime, moveEntity } from "pixel-pigeon";
import { isPlayerTakingDamage } from "./isPlayerTakingDamage";
import { state } from "../state";

export const damagePlayer = (damage: number): void => {
  if (state.values.playerEntityID === null) {
    throw new Error("Player entity ID is null.");
  }
  if (state.values.gameStartedAt === null) {
    throw new Error("Game started at is null.");
  }
  const currentTime: number = getCurrentTime();
  if (isPlayerTakingDamage() === false) {
    moveEntity(state.values.playerEntityID, {});
    state.setValues({
      playerHP: state.values.playerHP - damage,
      playerTookDamageAt: currentTime,
    });
    if (state.values.playerHP <= 0) {
      alert(
        `You survived ${Math.floor(
          (currentTime - state.values.gameStartedAt) / 1000,
        )} seconds and collected ${state.values.power} power.`,
      );
      window.location.reload();
    }
  }
};
