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
  enemyKickDamage,
  entityHitboxHeight,
  kickBeforeDuration,
  kickHitboxWidth,
  playerKickedStunDuration,
} from "../constants";
import { damagePlayer } from "./damagePlayer";
import { getDefinables } from "definables";
import { sfxVolumeChannelID } from "../volumeChannels";

export const executeEnemiesKicks = (): void => {
  for (const enemy of getDefinables(Enemy).values()) {
    if (
      enemy.hasKick() &&
      enemy.kick.wasExecuted === false &&
      getCurrentTime() - enemy.kick.createdAt >= kickBeforeDuration
    ) {
      const enemyPosition: EntityPosition = getEntityPosition(enemy.id);
      let position: EntityPosition | undefined;
      switch (enemy.facingDirection) {
        case XDirection.Left:
          position = {
            x: enemyPosition.x - kickHitboxWidth,
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
      playAudioSource("sfx/kick", {
        volumeChannelID: sfxVolumeChannelID,
      });
      enemy.kick.wasExecuted = true;
      enemy.hasAttacked = true;
      const collisionData: CollisionData = getRectangleCollisionData({
        entityTypes: ["player"],
        rectangle: {
          height: entityHitboxHeight,
          width: kickHitboxWidth,
          x: position.x,
          y: position.y,
        },
      });
      for (const entityCollidable of collisionData.entityCollidables) {
        switch (entityCollidable.type) {
          case "player":
            damagePlayer(enemyKickDamage, playerKickedStunDuration);
            break;
        }
      }
    }
  }
};
