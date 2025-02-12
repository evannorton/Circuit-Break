import {
  EntityPosition,
  getCurrentTime,
  getEntityPosition,
  moveEntity,
  removeEntity,
} from "pixel-pigeon";
import { Explosion } from "../classes/Explosion";
import {
  entityHitboxHeight,
  explosionSpriteHeight,
  explosionSpriteWidth,
  playerHitboxWidth,
} from "../constants";
import { isPlayerStunned } from "./isPlayerStunned";
import { isPlayerTakingDamage } from "./isPlayerTakingDamage";
import { state } from "../state";

export const damagePlayer = (damage: number, stunDuration: number): void => {
  if (state.values.isPlayerKilled) {
    return;
  }
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
      playerHadouken: null,
      playerHighKick: null,
      playerKick: null,
      playerPunch: null,
    });
    if (state.values.playerHP <= 0) {
      const playerPosition: EntityPosition = getEntityPosition(
        state.values.playerEntityID,
      );
      removeEntity(state.values.playerEntityID);
      state.setValues({
        isPlayerKilled: true,
        playerEntityID: null,
      });
      new Explosion({
        position: {
          x: Math.floor(
            playerPosition.x + playerHitboxWidth / 2 - explosionSpriteWidth / 2,
          ),
          y:
            Math.floor(
              playerPosition.y +
                entityHitboxHeight / 2 -
                explosionSpriteHeight / 2,
            ) - 22,
        },
      });
    }
  }
};
