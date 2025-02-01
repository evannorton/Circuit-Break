import {
  applyAudioSourceVolume,
  fadeInAudioSourceVolume,
  fadeOutAudioSourceVolume,
  getCurrentTime,
  moveEntity,
} from "pixel-pigeon";
import { isPlayerStunned } from "./isPlayerStunned";
import { isPlayerTakingDamage } from "./isPlayerTakingDamage";
import { state } from "../state";

export const damagePlayer = (damage: number, stunDuration: number): void => {
  if (state.values.playerEntityID === null) {
    throw new Error("Player entity ID is null.");
  }
  if (state.values.gameStartedAt === null) {
    throw new Error("Game started at is null.");
  }
  const currentTime: number = getCurrentTime();
  if (isPlayerTakingDamage() === false) {
    moveEntity(state.values.playerEntityID, {});
    if (isPlayerStunned() === false) {
      state.setValues({
        playerStunDuration: stunDuration,
        playerTookDamageAt: currentTime,
      });
    }
    state.setValues({
      playerHP: state.values.playerHP - damage,
      playerHighKick: null,
      playerKick: null,
      playerPunch: null,
    });
    if (state.values.playerHP <= 0) {
      fadeOutAudioSourceVolume("music/main", {
        duration: 1000,
      });
      applyAudioSourceVolume("music/chill", { volume: 1 });
      fadeInAudioSourceVolume("music/chill", {
        duration: 1000,
      });
      state.setValues({
        gameEndedAt: currentTime,
      });
    }
  }
};
