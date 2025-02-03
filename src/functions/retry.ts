import { Enemy } from "../classes/Enemy";
import { StateSchema, state } from "../state";
import { XDirection } from "../types/Direction";
import {
  applyAudioSourceVolume,
  fadeInAudioSourceVolume,
  fadeOutAudioSourceVolume,
  removeEntity,
} from "pixel-pigeon";
import { getDefinables } from "definables";
import { playerMaxHP } from "../constants";
import { startGame } from "./startGame";

export const retry = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error("Player entity ID is null.");
  }
  removeEntity(state.values.playerEntityID);
  if (state.values.destructible !== null) {
    removeEntity(state.values.destructible.batteryEntityID);
    removeEntity(state.values.destructible.baseEntityID);
  }
  const initialValues: StateSchema = {
    bossSpawnedAt: null,
    comboDirectionSequence: [],
    defeatAdvancedAt: null,
    destructible: null,
    didWin: false,
    enemiesStartedAt: null,
    facingDirection: XDirection.Right,
    gameEndedAt: null,
    gameStartedAt: null,
    jumpedAt: null,
    lastComboDirection: null,
    lastEnemyDirection: null,
    movingXDirection: null,
    movingYDirection: null,
    playerEntityID: null,
    playerHP: playerMaxHP,
    playerHadouken: null,
    playerHighKick: null,
    playerKick: null,
    playerPunch: null,
    playerStunDuration: null,
    playerTookDamageAt: null,
    power: 0,
    spawnedEnemyAt: null,
    titleAdvancedAt: state.values.titleAdvancedAt,
    titleStartedAt: null,
    unlockDisplayedAt: null,
  };
  state.setValues(initialValues);
  for (const enemy of getDefinables(Enemy).values()) {
    enemy.remove();
  }
  startGame();
  applyAudioSourceVolume("music/main", { volume: 0.5 });
  fadeOutAudioSourceVolume("music/chill", {
    duration: 1000,
  });
  fadeInAudioSourceVolume("music/main", {
    duration: 1000,
  });
};
