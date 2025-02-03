import { Enemy, EnemyType } from "../classes/Enemy";
import {
  baseEnemyMovementYSpeed,
  bossEnemyMovementYSpeed,
  flyingEnemyMovementYSpeed,
} from "../constants";
import { getDefinable } from "definables";

export const getEnemyMovementYSpeed = (enemyID: string): number => {
  const enemy: Enemy = getDefinable(Enemy, enemyID);
  switch (enemy.type) {
    case EnemyType.Base:
      return baseEnemyMovementYSpeed;
    case EnemyType.Boss:
      return bossEnemyMovementYSpeed;
    case EnemyType.Flying:
      return flyingEnemyMovementYSpeed;
    case EnemyType.Shooting:
      return baseEnemyMovementYSpeed;
  }
};
