import {
  CollisionData,
  EntityPosition,
  getCurrentTime,
  getEntityPosition,
  getRectangleCollisionData,
  playAudioSource,
} from "pixel-pigeon";
import { Enemy } from "../classes/Enemy";
import { damagePlayer } from "./damagePlayer";
import {
  enemySlamDamage,
  entityHitboxHeight,
  playerSlammedStunDuration,
  slamBeforeDuration,
} from "../constants";
import { getDefinables } from "definables";
import { getEnemyHitboxWidth } from "./getEnemyHitboxWidth";
import { sfxVolumeChannelID } from "../volumeChannels";

export const executeEnemiesSlams = (): void => {
  for (const enemy of getDefinables(Enemy).values()) {
    if (
      enemy.hasSlam() &&
      enemy.slam.wasExecuted === false &&
      getCurrentTime() - enemy.slam.createdAt >= slamBeforeDuration
    ) {
      const enemyPosition: EntityPosition = getEntityPosition(enemy.id);
      const position: EntityPosition = {
        x: enemyPosition.x - 20,
        y: enemyPosition.y - 4,
      };
      playAudioSource("sfx/big-slam", {
        volumeChannelID: sfxVolumeChannelID,
      });
      enemy.slam.wasExecuted = true;
      enemy.hasAttacked = true;
      const collisionData: CollisionData = getRectangleCollisionData({
        entityTypes: ["player"],
        rectangle: {
          height: entityHitboxHeight + 8,
          width: getEnemyHitboxWidth(enemy.type) + 40,
          x: position.x,
          y: position.y,
        },
      });
      for (const entityCollidable of collisionData.entityCollidables) {
        switch (entityCollidable.type) {
          case "player":
            damagePlayer(enemySlamDamage, playerSlammedStunDuration);
            break;
        }
      }
    }
  }
};
