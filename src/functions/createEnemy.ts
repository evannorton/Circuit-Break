import { Enemy } from "../classes/Enemy";
import { EntityPosition, getCurrentTime, getGameWidth } from "pixel-pigeon";
import { XDirection } from "../types/Direction";
import { enemyHitboxWidth, enemySpawnTime } from "../constants";
import { state } from "../state";

export const createEnemy = (): void => {
  const currentTime: number = getCurrentTime();
  if (
    state.values.power > 0 &&
    (state.values.spawnedEnemyAt === null ||
      currentTime - state.values.spawnedEnemyAt >= enemySpawnTime)
  ) {
    const offset: number = 32;
    const x: number =
      state.values.lastEnemyDirection === XDirection.Left
        ? -enemyHitboxWidth - offset
        : getGameWidth() + offset;
    const y: number = 100;
    const position: EntityPosition = {
      x,
      y,
    };
    new Enemy({
      position,
    });
    state.setValues({
      lastEnemyDirection:
        state.values.lastEnemyDirection === XDirection.Left
          ? XDirection.Right
          : XDirection.Left,
      spawnedEnemyAt: currentTime,
    });
  }
};
