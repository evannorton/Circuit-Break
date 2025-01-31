import { Enemy } from "../classes/Enemy";
import { getCurrentTime } from "pixel-pigeon";
import { getDefinable } from "definables";

export const isEnemyTakingKnockback = (enemyID: string): boolean => {
  const enemy: Enemy = getDefinable(Enemy, enemyID);
  return (
    enemy.hasTookDamageAt() &&
    getCurrentTime() - enemy.tookDamageAt < enemy.knockbackDuration
  );
};
