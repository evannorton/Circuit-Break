import { Enemy } from "../classes/Enemy";
import { enemyDamageDuration } from "../constants";
import { getCurrentTime } from "pixel-pigeon";
import { getDefinable } from "definables";

export const isEnemyTakingDamage = (enemyID: string): boolean => {
  const enemy: Enemy = getDefinable(Enemy, enemyID);
  return (
    enemy.hasTookDamageAt() &&
    getCurrentTime() - enemy.tookDamageAt < enemyDamageDuration
  );
};
