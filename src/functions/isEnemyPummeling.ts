import { Enemy } from "../classes/Enemy";
import { getCurrentTime } from "pixel-pigeon";
import { getDefinable } from "definables";
import { pummelAfterDuration, pummelBeforeDuration } from "../constants";

export const isEnemyPummeling = (enemyID: string): boolean => {
  const enemy: Enemy = getDefinable(Enemy, enemyID);
  return (
    enemy.hasPummel() &&
    getCurrentTime() - enemy.pummel.createdAt <
      pummelBeforeDuration + pummelAfterDuration
  );
};
