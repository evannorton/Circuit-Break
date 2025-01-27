import { Enemy } from "./classes/Enemy";
import {
  EntityPosition,
  getEntityIDs,
  getEntityPosition,
  moveEntity,
  removeEntity,
  setEntityZIndex,
} from "pixel-pigeon";
import { XDirection } from "./types/Direction";
import {
  enemyMovementXSpeed,
  enemyMovementYSpeed,
  entityHitboxHeight,
  levelID,
  playerHitboxWidth,
} from "./constants";
import { getDefinables } from "definables";
import { isPlayerPunching } from "./functions/isPlayerPunching";
import { movePlayer } from "./functions/movePlayer";
import { state } from "./state";

export const tick = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error("Player entity ID is null.");
  }
  if (state.values.punch !== null && state.values.punch.entityID !== null) {
    removeEntity(state.values.punch.entityID);
    state.values.punch.entityID = null;
  }
  if (isPlayerPunching() === false) {
    movePlayer();
  }
  const playerPosition: EntityPosition = getEntityPosition(
    state.values.playerEntityID,
  );
  for (const enemy of getDefinables(Enemy).values()) {
    const enemyPosition: EntityPosition = getEntityPosition(enemy.entityID);
    const isMovingLeft: boolean =
      enemyPosition.x - playerPosition.x > playerHitboxWidth + 3;
    const isMovingRight: boolean =
      playerPosition.x - enemyPosition.x > playerHitboxWidth + 3;
    moveEntity(enemy.entityID, {
      xVelocity: isMovingLeft
        ? -enemyMovementXSpeed
        : isMovingRight
          ? enemyMovementXSpeed
          : undefined,
      yVelocity:
        enemyPosition.y - playerPosition.y > Math.ceil(entityHitboxHeight / 2)
          ? -enemyMovementYSpeed
          : playerPosition.y - enemyPosition.y >
              Math.ceil(entityHitboxHeight / 2)
            ? enemyMovementYSpeed
            : undefined,
    });
    if (isMovingLeft) {
      enemy.facingDirection = XDirection.Left;
    }
    if (isMovingRight) {
      enemy.facingDirection = XDirection.Right;
    }
  }
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
