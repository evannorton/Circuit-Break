import { StateSchema, state } from "../state";
import { XDirection } from "../types/Direction";
import {
  applyAudioSourceVolume,
  fadeInAudioSourceVolume,
  fadeOutAudioSourceVolume,
} from "pixel-pigeon";
import { playerStartMaxHP } from "../constants";
import { startGame } from "./startGame";

export const retry = (): void => {
  const initialValues: StateSchema = {
    comboDirectionSequence: [],
    defeatAdvancedAt: null,
    destructible: null,
    didWin: false,
    enemiesStartedAt: null,
    facingDirection: XDirection.Right,
    finalWaveBaseEnemySpawnedAt: null,
    finalWaveBossEnemySpawnedAt: null,
    finalWaveFlyingEnemySpawnedAt: null,
    finalWaveShootingEnemySpawnedAt: null,
    firstWaveClearedAt: null,
    gameEndedAt: null,
    gameStartedAt: null,
    isPlayerKilled: false,
    jumpedAt: null,
    lastComboDirection: null,
    lastEnemyDirection: null,
    movingXDirection: null,
    movingYDirection: null,
    playerEntityID: null,
    playerHP: playerStartMaxHP,
    playerHadouken: null,
    playerHighKick: null,
    playerKick: null,
    playerMaxHP: playerStartMaxHP,
    playerPunch: null,
    playerStunDuration: null,
    playerTookDamageAt: null,
    power: 0,
    spawnedEnemyAt: null,
    titleAdvancedAt: state.values.titleAdvancedAt,
    titleStartedAt: state.values.titleStartedAt,
    unlockDisplayedAt: null,
  };
  state.setValues(initialValues);
  startGame();
  applyAudioSourceVolume("music/main", { volume: 1 });
  fadeOutAudioSourceVolume("music/chill", {
    duration: 1000,
  });
  fadeInAudioSourceVolume("music/main", {
    duration: 1000,
  });
};
