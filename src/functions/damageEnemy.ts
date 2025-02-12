import { Enemy, EnemyType } from "../classes/Enemy";
import {
  EntityPosition,
  getCurrentTime,
  getEntityPosition,
} from "pixel-pigeon";
import { Explosion } from "../classes/Explosion";
import {
  entityHitboxHeight,
  explosionSpriteHeight,
  explosionSpriteWidth,
  knockbackVelocity,
  swoopBeforeDuration,
} from "../constants";
import { getDefinable } from "definables";
import { getEnemyHitboxWidth } from "./getEnemyHitboxWidth";
import { isEnemyStunned } from "./isEnemyStunned";
import { isEnemySwooping } from "./isEnemySwooping";
import { isEnemyTakingDamage } from "./isEnemyTakingDamage";
import { isEnemyTakingKnockback } from "./isEnemyTakingKnockback";
import { state } from "../state";

export const damageEnemy = (
  enemyID: string,
  damage: number,
  stunDuration: number,
  overrideStun: boolean,
  knockbackDuration: number,
): void => {
  if (state.values.playerEntityID === null) {
    throw new Error("Player entity ID is null.");
  }
  const currentTime: number = getCurrentTime();
  const enemy: Enemy = getDefinable(Enemy, enemyID);
  if (
    isEnemyTakingDamage(enemyID) === false &&
    isEnemyTakingKnockback(enemyID) === false &&
    (isEnemySwooping(enemyID) === false ||
      currentTime - enemy.swoop.createdAt < swoopBeforeDuration)
  ) {
    enemy.hp -= damage;
    if (overrideStun || isEnemyStunned(enemyID) === false) {
      enemy.tookDamageAt = currentTime;
      enemy.stunDuration = stunDuration;
    }
    enemy.knockbackDuration = knockbackDuration;
    enemy.knockbackVelocity =
      getEntityPosition(state.values.playerEntityID).x <
      getEntityPosition(enemy.id).x
        ? knockbackVelocity
        : -knockbackVelocity;
    enemy.kick = null;
    enemy.punch = null;
    if (enemy.hp <= 0) {
      const enemyPosition: EntityPosition = getEntityPosition(enemy.id);
      const enemyHitboxWidth: number = getEnemyHitboxWidth(enemy.type);
      new Explosion({
        position: {
          x: Math.floor(
            enemyPosition.x + enemyHitboxWidth / 2 - explosionSpriteWidth / 2,
          ),
          y:
            Math.floor(
              enemyPosition.y +
                entityHitboxHeight / 2 -
                explosionSpriteHeight / 2,
            ) - (enemy.type === EnemyType.Flying ? 44 : 22),
        },
      });
      enemy.remove();
    }
  }
};
