import { Enemy } from "../classes/Enemy";
import { Explosion } from "../classes/Explosion";
import {
  batterySaverModeAchievementID,
  safeModeAchievementID,
  systemsSecuredAchievementID,
} from "../achievements";
import { endGame } from "./endGame";
import { explosionDuration } from "../constants";
import { getCurrentTime, unlockAchievement } from "pixel-pigeon";
import { getDefinables, getDefinablesCount } from "definables";
import { state } from "../state";

export const handleExplosions = (): void => {
  const currentTime: number = getCurrentTime();
  for (const explosion of getDefinables(Explosion).values()) {
    if (currentTime - explosion.createdAt >= explosionDuration) {
      explosion.remove();
    }
  }
  if (getDefinablesCount(Explosion) === 0) {
    if (state.values.isPlayerKilled) {
      endGame(false);
    } else if (
      state.values.finalWaveBossEnemySpawnedAt !== null &&
      getDefinablesCount(Enemy) === 0
    ) {
      unlockAchievement(systemsSecuredAchievementID);
      if (state.values.power === 1) {
        unlockAchievement(batterySaverModeAchievementID);
      }
      if (state.values.playerTookDamageAt === null) {
        unlockAchievement(safeModeAchievementID);
      }
      endGame(true);
    }
  }
};
