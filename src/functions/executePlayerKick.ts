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
  enemyJumpKickedStunDuration,
  enemyKickedStunDuration,
  entityHitboxHeight,
  kickBeforeDuration,
  kickHitboxWidth,
  playerHitboxWidth,
  playerKickDamage,
} from "../constants";
import { isPlayerJumping } from "./isPlayerJumping";
import { sfxVolumeChannelID } from "../volumeChannels";
import { state } from "../state";

export const executePlayerKick = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error(
      "An attempt was made to create a kick entity but no player entity exists",
    );
  }
  if (
    state.values.playerKick !== null &&
    state.values.playerKick.wasExecuted === false &&
    getCurrentTime() - state.values.playerKick.createdAt >= kickBeforeDuration
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
    state.values.playerKick.wasExecuted = true;
    playAudioSource("sfx/kick", {
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
        width: kickHitboxWidth,
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
              playerKickDamage,
              isPlayerJumping()
                ? enemyJumpKickedStunDuration
                : enemyKickedStunDuration,
            );
            break;
          case "enemy-base":
          case "enemy-shooting":
          case "enemy-flying": {
            if (entityCollidable.type === "enemy-flying") {
              if (isPlayerJumping() === false) {
                return;
              }
            }
            damageEnemy(
              entityCollidable.entityID,
              playerKickDamage,
              isPlayerJumping()
                ? enemyJumpKickedStunDuration
                : enemyKickedStunDuration,
              false,
              0,
            );
            break;
          }
        }
      }
    }
  }
};
