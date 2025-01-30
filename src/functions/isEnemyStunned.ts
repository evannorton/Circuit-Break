import { Enemy } from "../classes/Enemy";
import { getCurrentTime } from "pixel-pigeon";
import { getDefinable } from "definables";

export const isEnemyStunned = (enemyID: string): boolean => {
  const enemy: Enemy = getDefinable(Enemy, enemyID);
  return (
    enemy.hasTookDamageAt() &&
    getCurrentTime() - enemy.tookDamageAt < enemy.stunDuration
  );
};
