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
  kickBeforeDuration,
  kickDamage,
  kickHitboxWidth,
  playerHitboxWidth,
} from "../constants";
import { state } from "../state";

export const executePlayerKick = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error(
      "An attempt was made to create a kick entity but no player entity exists",
    );
  }
  if (
    state.values.kick !== null &&
    state.values.kick.wasExecuted === false &&
    getCurrentTime() - state.values.kick.createdAt >= kickBeforeDuration
  ) {
    const playerPosition: EntityPosition = getEntityPosition(
      state.values.playerEntityID,
    );
    let position: EntityPosition | undefined;
    switch (state.values.facingDirection) {
      case XDirection.Left:
        position = {
          x: playerPosition.x - kickHitboxWidth,
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
    state.values.kick.wasExecuted = true;
    const collisionData: CollisionData = getRectangleCollisionData({
      entityTypes: ["destructible", "enemy"],
      rectangle: {
        height: entityHitboxHeight,
        width: kickHitboxWidth,
        x: position.x,
        y: position.y,
      },
    });
    for (const entityCollidable of collisionData.entityCollidables) {
      if (
        entityCollidable.type === "destructible" ||
        entityCollidable.type === "enemy"
      ) {
        switch (entityCollidable.type) {
          case "destructible":
            damageDestructible(kickDamage);
            break;
          case "enemy": {
            damageEnemy(entityCollidable.entityID, kickDamage);
            break;
          }
        }
      }
    }
  }
};
