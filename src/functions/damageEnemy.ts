import { Enemy } from "../classes/Enemy";
import { getCurrentTime } from "pixel-pigeon";
import { getDefinable } from "definables";
import { isEnemyTakingDamage } from "./isEnemyTakingDamage";

export const damageEnemy = (enemyID: string, damage: number): void => {
  const enemy: Enemy = getDefinable(Enemy, enemyID);
  if (isEnemyTakingDamage(enemyID) === false) {
    enemy.hp -= damage;
    enemy.tookDamageAt = getCurrentTime();
    if (enemy.hp < 0) {
      enemy.remove();
    }
  }
};
