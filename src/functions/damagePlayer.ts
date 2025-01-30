import { getCurrentTime, moveEntity } from "pixel-pigeon";
import { isPlayerTakingDamage } from "./isPlayerTakingDamage";
import { state } from "../state";

export const damagePlayer = (damage: number): void => {
  if (state.values.playerEntityID === null) {
    throw new Error("Player entity ID is null.");
  }
  if (isPlayerTakingDamage() === false) {
    moveEntity(state.values.playerEntityID, {});
    state.setValues({
      playerHP: state.values.playerHP - damage,
      playerTookDamageAt: getCurrentTime(),
    });
    if (state.values.playerHP <= 0) {
      alert(
        `You survived ${Math.floor(
          getCurrentTime() / 1000,
        )} seconds and collected ${state.values.power} power.`,
      );
      window.location.reload();
    }
  }
};
