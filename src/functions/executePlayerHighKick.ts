import {
  CollisionData,
  EntityPosition,
  getCurrentTime,
  getEntityPosition,
  getRectangleCollisionData,
  playAudioSource,
} from "pixel-pigeon";
import { XDirection } from "../types/Direction";
import { damageDestructible } from "./damageDestructible";
import { damageEnemy } from "./damageEnemy";
import {
  enemyHighKickedStunDuration,
  entityHitboxHeight,
  highKickBeforeDuration,
  highKickHitboxWidth,
  highKickKnockbackDuration,
  playerHighKickDamage,
  playerHitboxWidth,
} from "../constants";
import { sfxVolumeChannelID } from "../volumeChannels";
import { state } from "../state";

export const executePlayerHighKick = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error(
      "An attempt was made to create a highKick entity but no player entity exists",
    );
  }
  if (
    state.values.playerHighKick !== null &&
    state.values.playerHighKick.wasExecuted === false &&
    getCurrentTime() - state.values.playerHighKick.createdAt >=
      highKickBeforeDuration
  ) {
    const playerPosition: EntityPosition = getEntityPosition(
      state.values.playerEntityID,
    );
    let position: EntityPosition | undefined;
    switch (state.values.facingDirection) {
      case XDirection.Left:
        position = {
          x: playerPosition.x - highKickHitboxWidth,
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
    state.values.playerHighKick.wasExecuted = true;
    playAudioSource("sfx/high-kick", {
      volumeChannelID: sfxVolumeChannelID,
    });
    const collisionData: CollisionData = getRectangleCollisionData({
      entityTypes: [
        "destructible",
        "enemy-base",
        "enemy-shooting",
        "enemy-flying",
      ],
      rectangle: {
        height: entityHitboxHeight,
        width: highKickHitboxWidth,
        x: position.x,
        y: position.y,
      },
    });
    for (const entityCollidable of collisionData.entityCollidables) {
      if (
        entityCollidable.type === "destructible" ||
        entityCollidable.type === "enemy-base" ||
        entityCollidable.type === "enemy-shooting" ||
        entityCollidable.type === "enemy-flying"
      ) {
        switch (entityCollidable.type) {
          case "destructible":
            damageDestructible(
              playerHighKickDamage,
              enemyHighKickedStunDuration,
            );
            break;
          case "enemy-base":
          case "enemy-shooting":
          case "enemy-flying": {
            damageEnemy(
              entityCollidable.entityID,
              playerHighKickDamage,
              enemyHighKickedStunDuration,
              true,
              highKickKnockbackDuration,
            );
            break;
          }
        }
      }
    }
  }
};
