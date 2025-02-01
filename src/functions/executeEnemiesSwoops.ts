import {
  CollisionData,
  EntityPosition,
  getCurrentTime,
  getEntityPosition,
  getRectangleCollisionData,
} from "pixel-pigeon";
import { Enemy } from "../classes/Enemy";
import { XDirection } from "../types/Direction";
import {
  baseEnemyHitboxWidth,
  enemySwoopDamage,
  entityHitboxHeight,
  playerSwoopedStunDuration,
  swoopBeforeDuration,
  swoopHitboxWidth,
} from "../constants";
import { damagePlayer } from "./damagePlayer";
import { getDefinables } from "definables";

export const executeEnemiesSwoops = (): void => {
  for (const enemy of getDefinables(Enemy).values()) {
    if (
      enemy.hasSwoop() &&
      enemy.swoop.wasExecuted === false &&
      getCurrentTime() - enemy.swoop.createdAt >= swoopBeforeDuration
    ) {
      const enemyPosition: EntityPosition = getEntityPosition(enemy.id);
      let position: EntityPosition | undefined;
      switch (enemy.facingDirection) {
        case XDirection.Left:
          position = {
            x: enemyPosition.x - swoopHitboxWidth,
            y: enemyPosition.y,
          };
          break;
        case XDirection.Right:
          position = {
            x: enemyPosition.x + baseEnemyHitboxWidth,
            y: enemyPosition.y,
          };
          break;
      }
      enemy.swoop.wasExecuted = true;
      enemy.hasAttacked = true;
      const collisionData: CollisionData = getRectangleCollisionData({
        entityTypes: ["player"],
        rectangle: {
          height: entityHitboxHeight,
          width: swoopHitboxWidth,
          x: position.x,
          y: position.y,
        },
      });
      for (const entityCollidable of collisionData.entityCollidables) {
        switch (entityCollidable.type) {
          case "player":
            damagePlayer(enemySwoopDamage, playerSwoopedStunDuration);
            break;
        }
      }
    }
  }
};
