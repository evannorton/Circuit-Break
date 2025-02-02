import {
  CollisionData,
  EntityPosition,
  getCurrentTime,
  getEntityPosition,
  getRectangleCollisionData,
  playAudioSource,
} from "pixel-pigeon";
import { Enemy } from "../classes/Enemy";
import { PunchHand } from "../types/Punch";
import { XDirection } from "../types/Direction";
import {
  baseEnemyHitboxWidth,
  enemyPunchDamage,
  entityHitboxHeight,
  playerPunchedStunDuration,
  punchBeforeDuration,
  punchHitboxWidth,
} from "../constants";
import { damagePlayer } from "./damagePlayer";
import { getDefinables } from "definables";
import { sfxVolumeChannelID } from "../volumeChannels";

export const executeEnemiesPunches = (): void => {
  for (const enemy of getDefinables(Enemy).values()) {
    if (
      enemy.hasPunch() &&
      enemy.punch.wasExecuted === false &&
      getCurrentTime() - enemy.punch.createdAt >= punchBeforeDuration
    ) {
      const enemyPosition: EntityPosition = getEntityPosition(enemy.id);
      let position: EntityPosition | undefined;
      switch (enemy.facingDirection) {
        case XDirection.Left:
          position = {
            x: enemyPosition.x - punchHitboxWidth,
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
      playAudioSource(
        enemy.hasPunch() && enemy.punch.hand === PunchHand.Left
          ? "sfx/punch-1"
          : "sfx/punch-2",
        {
          volumeChannelID: sfxVolumeChannelID,
        },
      );
      enemy.punch.wasExecuted = true;
      enemy.hasAttacked = true;
      const collisionData: CollisionData = getRectangleCollisionData({
        entityTypes: ["player"],
        rectangle: {
          height: entityHitboxHeight,
          width: punchHitboxWidth,
          x: position.x,
          y: position.y,
        },
      });
      for (const entityCollidable of collisionData.entityCollidables) {
        switch (entityCollidable.type) {
          case "player":
            damagePlayer(enemyPunchDamage, playerPunchedStunDuration);
            break;
        }
      }
    }
  }
};
