import { Enemy } from "../classes/Enemy";
import { getCurrentTime } from "pixel-pigeon";
import { getDefinable } from "definables";
import { punchAfterDuration, punchBeforeDuration } from "../constants";

export const isEnemyPunching = (enemyID: string): boolean => {
  const enemy: Enemy = getDefinable(Enemy, enemyID);
  return (
    enemy.hasPunch() &&
    getCurrentTime() - enemy.punch.createdAt <
      punchBeforeDuration + punchAfterDuration
  );
};
