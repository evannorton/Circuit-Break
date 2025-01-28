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
  entityHitboxHeight,
  playerHitboxWidth,
  punchBeforeDuration,
  punchDamage,
  punchHitboxWidth,
} from "../constants";
import { state } from "../state";

export const executePlayerPunch = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error(
      "An attempt was made to create a punch entity but no player entity exists",
    );
  }
  if (
    state.values.punch !== null &&
    state.values.punch.wasExecuted === false &&
    getCurrentTime() - state.values.punch.createdAt >= punchBeforeDuration
  ) {
    const playerPosition: EntityPosition = getEntityPosition(
      state.values.playerEntityID,
    );
    let position: EntityPosition | undefined;
    switch (state.values.facingDirection) {
      case XDirection.Left:
        position = {
          x: playerPosition.x - punchHitboxWidth,
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
    state.values.punch.wasExecuted = true;
    const collisionData: CollisionData = getRectangleCollisionData({
      entityTypes: ["destructible", "enemy"],
      rectangle: {
        height: entityHitboxHeight,
        width: punchHitboxWidth,
        x: position.x,
        y: position.y,
      },
    });
    for (const entityCollidable of collisionData.entityCollidables) {
      switch (entityCollidable.type) {
        case "destructible":
          damageDestructible(punchDamage);
          break;
        case "enemy": {
          damageEnemy(entityCollidable.entityID, punchDamage);
          break;
        }
      }
    }
  }
};
