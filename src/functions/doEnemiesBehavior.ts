import { Enemy, EnemyType } from "../classes/Enemy";
import {
  EntityPosition,
  getCurrentTime,
  getEntityPosition,
  moveEntity,
  playAudioSource,
} from "pixel-pigeon";
import { PunchHand } from "../types/Punch";
import { XDirection, YDirection } from "../types/Direction";
import { entityHitboxHeight, playerHitboxWidth } from "../constants";
import { getDefinables } from "definables";
import { getEnemyMovementXSpeed } from "./getEnemyMovementXSpeed";
import { getEnemyMovementYSpeed } from "./getEnemyMovementYSpeed";
import { isEnemyKicking } from "./isEnemyKicking";
import { isEnemyPummeling } from "./isEnemyPummeling";
import { isEnemyPunching } from "./isEnemyPunching";
import { isEnemyShooting } from "./isEnemyShooting";
import { isEnemySlamming } from "./isEnemySlamming";
import { isEnemyStunned } from "../functions/isEnemyStunned";
import { isEnemyTakingKnockback } from "./isEnemyTakingKnockback";
import { sfxVolumeChannelID } from "../volumeChannels";
import { state } from "../state";

export const doEnemiesBehavior = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error("Player entity ID is null.");
  }
  const currentTime: number = getCurrentTime();
  const playerPosition: EntityPosition = getEntityPosition(
    state.values.playerEntityID,
  );
  for (const enemy of getDefinables(Enemy).values()) {
    const enemyMovementXSpeed: number = getEnemyMovementXSpeed(enemy.id);
    const enemyMovementYSpeed: number = getEnemyMovementYSpeed(enemy.id);
    const enemyPosition: EntityPosition = getEntityPosition(enemy.id);
    const xOffset: number =
      enemy.type === EnemyType.Boss
        ? 4
        : enemy.type === EnemyType.Shooting
          ? 112
          : 0;
    const isLeftFarFromPlayer: boolean =
      enemyPosition.x - playerPosition.x > playerHitboxWidth + 3 + xOffset;
    const isRightFarFromPlayer: boolean =
      playerPosition.x - enemyPosition.x > playerHitboxWidth + 10 + xOffset;
    const isUpFarFromPlayer: boolean =
      enemyPosition.y - playerPosition.y > Math.ceil(entityHitboxHeight / 2);
    const isDownFarFromPlayer: boolean =
      playerPosition.y - enemyPosition.y > Math.ceil(entityHitboxHeight / 2);
    if (isEnemyTakingKnockback(enemy.id)) {
      moveEntity(enemy.id, { xVelocity: enemy.knockbackVelocity });
    } else {
      const xVelocity: number | undefined =
        enemy.type === EnemyType.Flying && enemy.hasAttacked
          ? enemy.spawnDirection === XDirection.Left
            ? -(enemyMovementXSpeed * 3)
            : enemyMovementXSpeed * 3
          : isEnemyPunching(enemy.id) ||
              isEnemyPummeling(enemy.id) ||
              isEnemySlamming(enemy.id) ||
              isEnemyKicking(enemy.id) ||
              isEnemyStunned(enemy.id) ||
              isEnemyShooting(enemy.id)
            ? 0
            : isLeftFarFromPlayer
              ? -enemyMovementXSpeed
              : isRightFarFromPlayer
                ? enemyMovementXSpeed
                : 0;
      const yVelocity: number | undefined =
        enemy.type === EnemyType.Flying && enemy.hasAttacked
          ? 0
          : isEnemyPunching(enemy.id) ||
              isEnemyPummeling(enemy.id) ||
              isEnemySlamming(enemy.id) ||
              isEnemyKicking(enemy.id) ||
              isEnemyStunned(enemy.id) ||
              isEnemyShooting(enemy.id)
            ? 0
            : isUpFarFromPlayer
              ? -enemyMovementYSpeed
              : isDownFarFromPlayer
                ? enemyMovementYSpeed
                : 0;
      moveEntity(enemy.id, {
        xVelocity,
        yVelocity,
      });
      if (enemy.type !== EnemyType.Flying || enemy.hasAttacked === false) {
        if (playerPosition.x > enemyPosition.x) {
          enemy.facingDirection = XDirection.Right;
          enemy.movingXDirection = XDirection.Right;
        }
        if (playerPosition.x < enemyPosition.x) {
          enemy.facingDirection = XDirection.Left;
          enemy.movingXDirection = XDirection.Left;
        }
      }
      if (xVelocity === 0) {
        enemy.movingXDirection = null;
      }
      if (yVelocity > 0) {
        enemy.movingYDirection = YDirection.Down;
      }
      if (yVelocity < 0) {
        enemy.movingYDirection = YDirection.Up;
      }
      if (yVelocity === 0) {
        enemy.movingYDirection = null;
      }
    }
    if (
      isLeftFarFromPlayer === false &&
      isRightFarFromPlayer === false &&
      isUpFarFromPlayer === false &&
      isDownFarFromPlayer === false &&
      isEnemyStunned(enemy.id) === false &&
      isEnemyTakingKnockback(enemy.id) === false &&
      isEnemyPunching(enemy.id) === false &&
      isEnemyPummeling(enemy.id) === false &&
      isEnemySlamming(enemy.id) === false &&
      isEnemyKicking(enemy.id) === false &&
      isEnemyShooting(enemy.id) === false &&
      (enemy.type !== EnemyType.Flying || enemy.hasAttacked === false) &&
      (enemy.hasPunch() === false ||
        currentTime - enemy.punch.createdAt >= 1000) &&
      (enemy.hasKick() === false ||
        currentTime - enemy.kick.createdAt >= 1000) &&
      (enemy.hasSwoop() === false ||
        currentTime - enemy.swoop.createdAt >= 1000)
    ) {
      switch (enemy.type) {
        case EnemyType.Base:
          if (Math.random() < 0.5) {
            enemy.punch = {
              createdAt: getCurrentTime(),
              hand:
                enemy.hasPunch() && enemy.punch.hand === PunchHand.Left
                  ? PunchHand.Right
                  : PunchHand.Left,
              isJumping: false,
              wasExecuted: false,
            };
          } else {
            enemy.kick = {
              createdAt: getCurrentTime(),
              wasExecuted: false,
            };
          }
          break;
        case EnemyType.Boss:
          if (Math.random() < 0.5) {
            enemy.pummel = {
              createdAt: getCurrentTime(),
              wasExecuted: false,
            };
            playAudioSource("sfx/wind-up", {
              volumeChannelID: sfxVolumeChannelID,
            });
          } else {
            enemy.slam = {
              createdAt: getCurrentTime(),
              wasExecuted: false,
            };
            playAudioSource("sfx/wind-up", {
              volumeChannelID: sfxVolumeChannelID,
            });
          }
          break;
        case EnemyType.Flying:
          enemy.swoop = {
            createdAt: getCurrentTime(),
            wasExecuted: false,
          };
          break;
        case EnemyType.Shooting:
          if (
            enemy.hasShoot() === false ||
            currentTime - enemy.shoot.createdAt >= 4000
          ) {
            enemy.shoot = {
              createdAt: getCurrentTime(),
              wasExecuted: false,
            };
          }
          break;
      }
    }
  }
};
