import { Enemy } from "../classes/Enemy";
import { getCurrentTime } from "pixel-pigeon";
import { getDefinable } from "definables";
import { swoopAfterDuration, swoopBeforeDuration } from "../constants";

export const isEnemySwooping = (enemyID: string): boolean => {
  const enemy: Enemy = getDefinable(Enemy, enemyID);
  return (
    enemy.hasSwoop() &&
    getCurrentTime() - enemy.swoop.createdAt <
      swoopBeforeDuration + swoopAfterDuration
  );
};
