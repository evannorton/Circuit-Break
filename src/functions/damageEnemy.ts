import { Enemy } from "../classes/Enemy";
import { getCurrentTime } from "pixel-pigeon";
import { getDefinable } from "definables";
import { isEnemyStunned } from "./isEnemyStunned";
import { isEnemyTakingDamage } from "./isEnemyTakingDamage";

export const damageEnemy = (
  enemyID: string,
  damage: number,
  stunDuration: number,
): void => {
  const enemy: Enemy = getDefinable(Enemy, enemyID);
  if (isEnemyTakingDamage(enemyID) === false) {
    const currentTime: number = getCurrentTime();
    enemy.hp -= damage;
    if (isEnemyStunned(enemyID) === false) {
      enemy.tookDamageAt = currentTime;
      enemy.stunDuration = stunDuration;
    }
    enemy.kick = null;
    enemy.punch = null;
    if (enemy.hp <= 0) {
      enemy.remove();
    }
  }
};
