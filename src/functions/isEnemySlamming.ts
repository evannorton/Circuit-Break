import { Enemy } from "../classes/Enemy";
import { getCurrentTime } from "pixel-pigeon";
import { getDefinable } from "definables";
import { slamAfterDuration, slamBeforeDuration } from "../constants";

export const isEnemySlamming = (enemyID: string): boolean => {
  const enemy: Enemy = getDefinable(Enemy, enemyID);
  return (
    enemy.hasSlam() &&
    getCurrentTime() - enemy.slam.createdAt <
      slamBeforeDuration + slamAfterDuration
  );
};
