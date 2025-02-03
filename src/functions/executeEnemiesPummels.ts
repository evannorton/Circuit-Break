import {
  CollisionData,
  EntityPosition,
  getCurrentTime,
  getEntityPosition,
  getRectangleCollisionData,
  playAudioSource,
} from "pixel-pigeon";
import { Enemy } from "../classes/Enemy";
import { XDirection } from "../types/Direction";
import {
  baseEnemyHitboxWidth,
  enemyPummelDamage,
  entityHitboxHeight,
  playerPummeledStunDuration,
  pummelBeforeDuration,
  pummelHitboxWidth,
} from "../constants";
import { damagePlayer } from "./damagePlayer";
import { getDefinables } from "definables";
import { sfxVolumeChannelID } from "../volumeChannels";

export const executeEnemiesPummels = (): void => {
  for (const enemy of getDefinables(Enemy).values()) {
    if (
      enemy.hasPummel() &&
      enemy.pummel.wasExecuted === false &&
      getCurrentTime() - enemy.pummel.createdAt >= pummelBeforeDuration
    ) {
      const enemyPosition: EntityPosition = getEntityPosition(enemy.id);
      let position: EntityPosition | undefined;
      switch (enemy.facingDirection) {
        case XDirection.Left:
          position = {
            x: enemyPosition.x - pummelHitboxWidth,
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
      playAudioSource("sfx/pummel", {
        volumeChannelID: sfxVolumeChannelID,
      });
      enemy.pummel.wasExecuted = true;
      enemy.hasAttacked = true;
      const collisionData: CollisionData = getRectangleCollisionData({
        entityTypes: ["player"],
        rectangle: {
          height: entityHitboxHeight,
          width: pummelHitboxWidth,
          x: position.x,
          y: position.y,
        },
      });
      for (const entityCollidable of collisionData.entityCollidables) {
        switch (entityCollidable.type) {
          case "player":
            damagePlayer(enemyPummelDamage, playerPummeledStunDuration);
            break;
        }
      }
    }
  }
};
