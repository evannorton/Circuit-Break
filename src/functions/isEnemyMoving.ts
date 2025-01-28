import { Enemy } from "../classes/Enemy";
import { getDefinable } from "definables";

export const isEnemyMoving = (enemyID: string): boolean => {
  const enemy: Enemy = getDefinable(Enemy, enemyID);
  return enemy.hasMovingXDirection() || enemy.hasMovingYDirection();
};
