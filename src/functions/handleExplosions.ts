import { Enemy } from "../classes/Enemy";
import { Explosion } from "../classes/Explosion";
import { endGame } from "./endGame";
import { explosionDuration } from "../constants";
import { getCurrentTime } from "pixel-pigeon";
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
      endGame(true);
    }
  }
};
