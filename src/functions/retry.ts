import { Enemy } from "../classes/Enemy";
import { XDirection } from "../types/Direction";
import { getDefinables } from "definables";
import { playerMaxHP } from "../constants";
import { removeEntity } from "pixel-pigeon";
import { startGame } from "./startGame";
import { state } from "../state";

export const retry = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error("Player entity ID is null.");
  }
  removeEntity(state.values.playerEntityID);
  if (state.values.destructible !== null) {
    removeEntity(state.values.destructible.batteryEntityID);
    removeEntity(state.values.destructible.baseEntityID);
  }
  state.setValues({
    defeatAdvancedAt: null,
    destructible: null,
    facingDirection: XDirection.Right,
    gameEndedAt: null,
    jumpedAt: null,
    lastEnemyDirection: null,
    movingXDirection: null,
    movingYDirection: null,
    playerEntityID: null,
    playerHP: playerMaxHP,
    playerHighKick: null,
    playerKick: null,
    playerPunch: null,
    playerStunDuration: null,
    playerTookDamageAt: null,
    power: 0,
    spawnedEnemyAt: null,
    unlockDisplayedAt: null,
  });
  for (const enemy of getDefinables(Enemy).values()) {
    enemy.remove();
  }
  startGame();
};
