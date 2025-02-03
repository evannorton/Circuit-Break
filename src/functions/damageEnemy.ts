import { Enemy } from "../classes/Enemy";
import { endGame } from "./endGame";
import { getCurrentTime, getEntityPosition } from "pixel-pigeon";
import { getDefinable, getDefinablesCount } from "definables";
import { isEnemyStunned } from "./isEnemyStunned";
import { isEnemyTakingDamage } from "./isEnemyTakingDamage";
import { isEnemyTakingKnockback } from "./isEnemyTakingKnockback";
import { knockbackVelocity } from "../constants";
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
  if (
    isEnemyTakingDamage(enemyID) === false &&
    isEnemyTakingKnockback(enemyID) === false
  ) {
    const enemy: Enemy = getDefinable(Enemy, enemyID);
    const currentTime: number = getCurrentTime();
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
      enemy.remove();
      if (
        state.values.bossSpawnedAt !== null &&
        getDefinablesCount(Enemy) === 0
      ) {
        endGame(true);
      }
    }
  }
};
