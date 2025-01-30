import {
  CollisionData,
  EntityPosition,
  getCurrentTime,
  getEntityPosition,
  getRectangleCollisionData,
} from "pixel-pigeon";
import { XDirection } from "../types/Direction";
import { damageDestructible } from "./damageDestructible";
import { damageEnemy } from "./damageEnemy";
import {
  enemyJumpPunchedStunDuration,
  enemyPunchDamage,
  enemyPunchedStunDuration,
  entityHitboxHeight,
  jumpPunchHitboxWidth,
  playerHitboxWidth,
  playerPunchDamage,
  punchBeforeDuration,
  punchHitboxWidth,
} from "../constants";
import { isPlayerJumping } from "./isPlayerJumping";
import { state } from "../state";

export const executePlayerPunch = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error(
      "An attempt was made to create a punch entity but no player entity exists",
    );
  }
  if (
    state.values.playerPunch !== null &&
    state.values.playerPunch.wasExecuted === false &&
    getCurrentTime() - state.values.playerPunch.createdAt >= punchBeforeDuration
  ) {
    const playerPosition: EntityPosition = getEntityPosition(
      state.values.playerEntityID,
    );
    const calculatedPunchHitboxWidth: number = isPlayerJumping()
      ? jumpPunchHitboxWidth
      : punchHitboxWidth;
    let position: EntityPosition | undefined;
    switch (state.values.facingDirection) {
      case XDirection.Left:
        position = {
          x: playerPosition.x - calculatedPunchHitboxWidth,
          y: playerPosition.y,
        };
        break;
      case XDirection.Right:
        position = {
          x: playerPosition.x + playerHitboxWidth,
          y: playerPosition.y,
        };
        break;
    }
    state.values.playerPunch.wasExecuted = true;
    const collisionData: CollisionData = getRectangleCollisionData({
      entityTypes: ["destructible", "enemy"],
      rectangle: {
        height: entityHitboxHeight,
        width: calculatedPunchHitboxWidth,
        x: position.x,
        y: position.y,
      },
    });
    for (const entityCollidable of collisionData.entityCollidables) {
      switch (entityCollidable.type) {
        case "destructible":
          damageDestructible(
            playerPunchDamage,
            isPlayerJumping() ? enemyJumpPunchedStunDuration : enemyPunchDamage,
          );
          break;
        case "enemy": {
          damageEnemy(
            entityCollidable.entityID,
            playerPunchDamage,
            isPlayerJumping()
              ? enemyJumpPunchedStunDuration
              : enemyPunchedStunDuration,
          );
          break;
        }
      }
    }
  }
};
