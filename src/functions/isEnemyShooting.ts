import { Enemy } from "../classes/Enemy";
import { getCurrentTime } from "pixel-pigeon";
import { getDefinable } from "definables";
import { shootAfterDuration, shootBeforeDuration } from "../constants";

export const isEnemyShooting = (enemyID: string): boolean => {
  const enemy: Enemy = getDefinable(Enemy, enemyID);
  return (
    enemy.hasShoot() &&
    getCurrentTime() - enemy.shoot.createdAt <
      shootBeforeDuration + shootAfterDuration
  );
};
