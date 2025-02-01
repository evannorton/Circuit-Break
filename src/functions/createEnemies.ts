import { Enemy, EnemyType } from "../classes/Enemy";
import { EntityPosition, getCurrentTime, getGameWidth } from "pixel-pigeon";
import { XDirection } from "../types/Direction";
import { baseEnemyHitboxWidth, enemySpawnTime } from "../constants";
import { state } from "../state";

export const createEnemies = (): void => {
  const currentTime: number = getCurrentTime();
  if (
    state.values.power > 0 &&
    (state.values.spawnedEnemyAt === null ||
      currentTime - state.values.spawnedEnemyAt >= enemySpawnTime)
  ) {
    if (state.values.gameStartedAt === null) {
      throw new Error("Game started at is null.");
    }
    const offset: number = 32;
    const x: number =
      state.values.lastEnemyDirection === XDirection.Left
        ? -baseEnemyHitboxWidth - offset
        : getGameWidth() + offset;
    const oppositeX: number =
      state.values.lastEnemyDirection === XDirection.Left
        ? getGameWidth() + offset
        : -baseEnemyHitboxWidth - offset;
    const y: number = 120;
    const position: EntityPosition = {
      x,
      y,
    };
    const oppositePosition: EntityPosition = {
      x: oppositeX,
      y,
    };
    new Enemy({
      position,
      spawnDirection:
        state.values.lastEnemyDirection === XDirection.Left
          ? XDirection.Right
          : XDirection.Left,
      type: EnemyType.Base,
    });
    if (currentTime - state.values.gameStartedAt > 20000) {
      new Enemy({
        position: oppositePosition,
        spawnDirection:
          state.values.lastEnemyDirection === XDirection.Left
            ? XDirection.Left
            : XDirection.Right,
        type: EnemyType.Flying,
      });
    }
    state.setValues({
      lastEnemyDirection:
        state.values.lastEnemyDirection === XDirection.Left
          ? XDirection.Right
          : XDirection.Left,
      spawnedEnemyAt: currentTime,
    });
  }
};
