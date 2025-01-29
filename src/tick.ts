import { Enemy } from "./classes/Enemy";
import {
  EntityPosition,
  getEntityIDs,
  getEntityPosition,
  moveEntity,
  setEntityZIndex,
} from "pixel-pigeon";
import { XDirection, YDirection } from "./types/Direction";
import { createDestructible } from "./functions/createDestructible";
import { createEnemy } from "./functions/createEnemy";
import {
  enemyMovementXSpeed,
  enemyMovementYSpeed,
  entityHitboxHeight,
  levelID,
  playerHitboxWidth,
} from "./constants";
import { executePlayerKick } from "./functions/executePlayerKick";
import { executePlayerPunch } from "./functions/executePlayerPunch";
import { getDefinables } from "definables";
import { isEnemyStunned } from "./functions/isEnemyStunned";
import { isPlayerKicking } from "./functions/isPlayerKicking";
import { isPlayerLanding } from "./functions/isPlayerLanding";
import { isPlayerPunching } from "./functions/isPlayerPunching";
import { movePlayer } from "./functions/movePlayer";
import { state } from "./state";

export const tick = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error("Player entity ID is null.");
  }
  // Create enemy
  createEnemy();
  // Create destructible if we don't already have one
  if (state.values.destructible === null) {
    createDestructible();
  }
  // Move player if not punching or kicking
  if (
    isPlayerPunching() === false &&
    isPlayerKicking() === false &&
    isPlayerLanding() === false
  ) {
    movePlayer();
  }
  // Stop player from moving if landing
  if (isPlayerLanding()) {
    moveEntity(state.values.playerEntityID, {});
  }
  // Execute punch
  executePlayerPunch();
  // Execute kick
  executePlayerKick();
  // Move enemies
  const playerPosition: EntityPosition = getEntityPosition(
    state.values.playerEntityID,
  );
  for (const enemy of getDefinables(Enemy).values()) {
    const enemyPosition: EntityPosition = getEntityPosition(enemy.entityID);
    const isMovingLeft: boolean =
      enemyPosition.x - playerPosition.x > playerHitboxWidth + 3;
    const isMovingRight: boolean =
      playerPosition.x - enemyPosition.x > playerHitboxWidth + 3;
    const xVelocity: number | undefined = isEnemyStunned(enemy.id)
      ? 0
      : isMovingLeft
        ? -enemyMovementXSpeed
        : isMovingRight
          ? enemyMovementXSpeed
          : 0;
    const yVelocity: number | undefined = isEnemyStunned(enemy.id)
      ? 0
      : enemyPosition.y - playerPosition.y > Math.ceil(entityHitboxHeight / 2)
        ? -enemyMovementYSpeed
        : playerPosition.y - enemyPosition.y > Math.ceil(entityHitboxHeight / 2)
          ? enemyMovementYSpeed
          : 0;
    moveEntity(enemy.entityID, {
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
  }
  // Y-sort characters
  [
    ...getEntityIDs({
      layerIDs: ["Characters"],
      levelIDs: [levelID],
    }),
  ]
    .sort((a: string, b: string): number => {
      const aPosition: EntityPosition = getEntityPosition(a);
      const bPosition: EntityPosition = getEntityPosition(b);
      if (aPosition.y < bPosition.y) {
        return -1;
      }
      if (aPosition.y > bPosition.y) {
        return 1;
      }
      return 0;
    })
    .forEach((entityID: string, entityIndex: number): void => {
      setEntityZIndex(entityID, entityIndex);
    });
};
