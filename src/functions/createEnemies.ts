import { Enemy, EnemyType } from "../classes/Enemy";
import { EntityPosition, getCurrentTime, getGameWidth } from "pixel-pigeon";
import { XDirection } from "../types/Direction";
import {
  baseEnemiesStartAt,
  baseEnemyHitboxWidth,
  enemySpawnTime,
  flyingEnemiesStartAt,
  shootingEnemiesStartAt,
} from "../constants";
import { state } from "../state";

export const createEnemies = (): void => {
  const currentTime: number = getCurrentTime();
  if (
    state.values.enemiesStartedAt !== null &&
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
    const flyingEnemyPosition: EntityPosition = {
      x: oppositeX,
      y,
    };
    const shootingEnemyPosition: EntityPosition = {
      x,
      y: y + 40,
    };
    let didSpawn: boolean = false;
    if (currentTime - state.values.enemiesStartedAt > baseEnemiesStartAt) {
      didSpawn = true;
      new Enemy({
        position,
        spawnDirection:
          state.values.lastEnemyDirection === XDirection.Left
            ? XDirection.Right
            : XDirection.Left,
        type: EnemyType.Base,
      });
    }
    if (currentTime - state.values.enemiesStartedAt > flyingEnemiesStartAt) {
      didSpawn = true;
      new Enemy({
        position: flyingEnemyPosition,
        spawnDirection:
          state.values.lastEnemyDirection === XDirection.Left
            ? XDirection.Left
            : XDirection.Right,
        type: EnemyType.Flying,
      });
    }
    if (currentTime - state.values.enemiesStartedAt > shootingEnemiesStartAt) {
      didSpawn = true;
      new Enemy({
        position: shootingEnemyPosition,
        spawnDirection:
          state.values.lastEnemyDirection === XDirection.Left
            ? XDirection.Right
            : XDirection.Left,
        type: EnemyType.Shooting,
      });
    }
    if (didSpawn) {
      state.setValues({
        lastEnemyDirection:
          state.values.lastEnemyDirection === XDirection.Left
            ? XDirection.Right
            : XDirection.Left,
        spawnedEnemyAt: currentTime,
      });
    }
  }
};
