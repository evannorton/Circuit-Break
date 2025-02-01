import { Enemy, EnemyType } from "../classes/Enemy";
import {
  baseEnemyMovementXSpeed,
  flyingEnemyMovementXSpeed,
} from "../constants";
import { getDefinable } from "definables";

export const getEnemyMovementXSpeed = (enemyID: string): number => {
  const enemy: Enemy = getDefinable(Enemy, enemyID);
  switch (enemy.type) {
    case EnemyType.Base:
      return baseEnemyMovementXSpeed;
    case EnemyType.Flying:
      return flyingEnemyMovementXSpeed;
  }
};
