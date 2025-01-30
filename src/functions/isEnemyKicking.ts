import { Enemy } from "../classes/Enemy";
import { getCurrentTime } from "pixel-pigeon";
import { getDefinable } from "definables";
import { kickAfterDuration, kickBeforeDuration } from "../constants";

export const isEnemyKicking = (enemyID: string): boolean => {
  const enemy: Enemy = getDefinable(Enemy, enemyID);
  return (
    enemy.hasKick() &&
    getCurrentTime() - enemy.kick.createdAt <
      kickBeforeDuration + kickAfterDuration
  );
};
