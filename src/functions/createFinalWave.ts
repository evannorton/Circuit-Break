import { Enemy, EnemyType } from "../classes/Enemy";
import { EntityPosition, getCurrentTime, getGameWidth } from "pixel-pigeon";
import { XDirection } from "../types/Direction";
import { baseEnemyHitboxWidth, finalWaveStartsAt } from "../constants";
import { state } from "../state";

export const createFinalWave = (): void => {
  const currentTime: number = getCurrentTime();
  if (
    state.values.enemiesStartedAt !== null &&
    currentTime - state.values.enemiesStartedAt > finalWaveStartsAt &&
    state.values.firstWaveClearedAt !== null
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
    const plebDelay: number = 0;
    const bossDelay: number = 5000;
    if (state.values.finalWaveBaseEnemySpawnedAt === null) {
      didSpawn = true;
      new Enemy({
        position,
        spawnDirection:
          state.values.lastEnemyDirection === XDirection.Left
            ? XDirection.Right
            : XDirection.Left,
        type: EnemyType.Base,
      });
      state.setValues({ finalWaveBaseEnemySpawnedAt: currentTime });
    }
    if (
      state.values.finalWaveShootingEnemySpawnedAt === null &&
      state.values.finalWaveBaseEnemySpawnedAt !== null &&
      currentTime - state.values.finalWaveBaseEnemySpawnedAt >= plebDelay
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
      state.setValues({ finalWaveShootingEnemySpawnedAt: currentTime });
    }
    if (
      state.values.finalWaveFlyingEnemySpawnedAt === null &&
      state.values.finalWaveShootingEnemySpawnedAt !== null &&
      currentTime - state.values.finalWaveShootingEnemySpawnedAt >= plebDelay
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
      state.setValues({ finalWaveFlyingEnemySpawnedAt: currentTime });
    }
    if (
      state.values.finalWaveBossEnemySpawnedAt === null &&
      state.values.finalWaveFlyingEnemySpawnedAt !== null &&
      currentTime - state.values.finalWaveFlyingEnemySpawnedAt >= bossDelay
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
      state.setValues({ finalWaveBossEnemySpawnedAt: currentTime });
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
