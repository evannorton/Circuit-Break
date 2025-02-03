import { Enemy, EnemyType } from "../classes/Enemy";
import { EntityPosition, getCurrentTime, getGameWidth } from "pixel-pigeon";
import { XDirection } from "../types/Direction";
import {
  baseEnemiesStartAt,
  baseEnemyHitboxWidth,
  bossEnemyStartsAt,
  enemySpawnTime,
  flyingEnemiesStartAt,
  shootingEnemiesStartAt,
} from "../constants";
import { getDefinables } from "definables";
import { state } from "../state";

export const createEnemies = (): void => {
  const currentTime: number = getCurrentTime();
  if (
    state.values.bossSpawnedAt === null &&
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
    const bossEnemyPosition: EntityPosition = {
      x: oppositeX,
      y: y + 40,
    };
    let didSpawn: boolean = false;
    let baseEnemyCount: number = 0;
    let flyingEnemyCount: number = 0;
    let shootingEnemyCount: number = 0;
    let bossEnemyCount: number = 0;
    for (const enemy of getDefinables(Enemy).values()) {
      switch (enemy.type) {
        case EnemyType.Base:
          baseEnemyCount++;
          break;
        case EnemyType.Flying:
          flyingEnemyCount++;
          break;
        case EnemyType.Shooting:
          shootingEnemyCount++;
          break;
        case EnemyType.Boss:
          bossEnemyCount++;
          break;
      }
    }
    if (
      currentTime - state.values.enemiesStartedAt > baseEnemiesStartAt &&
      baseEnemyCount < 1
    ) {
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
    if (
      currentTime - state.values.enemiesStartedAt > flyingEnemiesStartAt &&
      flyingEnemyCount < 1
    ) {
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
    if (
      currentTime - state.values.enemiesStartedAt > shootingEnemiesStartAt &&
      shootingEnemyCount < 1
    ) {
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
    if (
      currentTime - state.values.enemiesStartedAt > bossEnemyStartsAt &&
      bossEnemyCount < 1
    ) {
      didSpawn = true;
      new Enemy({
        position: bossEnemyPosition,
        spawnDirection:
          state.values.lastEnemyDirection === XDirection.Left
            ? XDirection.Right
            : XDirection.Left,
        type: EnemyType.Boss,
      });
      state.setValues({
        bossSpawnedAt: currentTime,
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
