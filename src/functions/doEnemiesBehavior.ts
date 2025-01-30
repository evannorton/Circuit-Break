import { Enemy } from "../classes/Enemy";
import {
  EntityPosition,
  getCurrentTime,
  getEntityPosition,
  moveEntity,
} from "pixel-pigeon";
import { PunchHand } from "../types/Punch";
import { XDirection, YDirection } from "../types/Direction";
import {
  enemyMovementXSpeed,
  enemyMovementYSpeed,
  entityHitboxHeight,
  playerHitboxWidth,
} from "../constants";
import { getDefinables } from "definables";
import { isEnemyKicking } from "./isEnemyKicking";
import { isEnemyPunching } from "./isEnemyPunching";
import { isEnemyStunned } from "../functions/isEnemyStunned";
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
    const enemyPosition: EntityPosition = getEntityPosition(enemy.id);
    const isLeftFarFromPlayer: boolean =
      enemyPosition.x - playerPosition.x > playerHitboxWidth + 3;
    const isRightFarFromPlayer: boolean =
      playerPosition.x - enemyPosition.x > playerHitboxWidth + 3;
    const isUpFarFromPlayer: boolean =
      enemyPosition.y - playerPosition.y > Math.ceil(entityHitboxHeight / 2);
    const isDownFarFromPlayer: boolean =
      playerPosition.y - enemyPosition.y > Math.ceil(entityHitboxHeight / 2);
    const xVelocity: number | undefined =
      isEnemyPunching(enemy.id) ||
      isEnemyKicking(enemy.id) ||
      isEnemyStunned(enemy.id)
        ? 0
        : isLeftFarFromPlayer
          ? -enemyMovementXSpeed
          : isRightFarFromPlayer
            ? enemyMovementXSpeed
            : 0;
    const yVelocity: number | undefined =
      isEnemyPunching(enemy.id) ||
      isEnemyKicking(enemy.id) ||
      isEnemyStunned(enemy.id)
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
    if (xVelocity > 0) {
      enemy.facingDirection = XDirection.Right;
      enemy.movingXDirection = XDirection.Right;
    }
    if (xVelocity < 0) {
      enemy.facingDirection = XDirection.Left;
      enemy.movingXDirection = XDirection.Left;
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
    if (
      isLeftFarFromPlayer === false &&
      isRightFarFromPlayer === false &&
      isUpFarFromPlayer === false &&
      isDownFarFromPlayer === false &&
      isEnemyStunned(enemy.id) === false &&
      isEnemyPunching(enemy.id) === false &&
      isEnemyKicking(enemy.id) === false &&
      (enemy.hasPunch() === false ||
        currentTime - enemy.punch.createdAt >= 1000) &&
      (enemy.hasKick() === false || currentTime - enemy.kick.createdAt >= 1000)
    ) {
      if (Math.random() < 0.5) {
        enemy.punch = {
          createdAt: getCurrentTime(),
          hand:
            enemy.hasPunch() && enemy.punch.hand === PunchHand.Left
              ? PunchHand.Right
              : PunchHand.Left,
          wasExecuted: false,
        };
      } else {
        enemy.kick = {
          createdAt: getCurrentTime(),
          wasExecuted: false,
        };
      }
    }
  }
};
