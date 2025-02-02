import { EnemyType } from "../classes/Enemy";
import {
  baseEnemyHitboxWidth,
  flyingEnemyHitboxWidth,
  shootingEnemyHitboxWidth,
} from "../constants";

export const getEnemyHitboxWidth = (enemyType: EnemyType): number => {
  switch (enemyType) {
    case EnemyType.Base:
      return baseEnemyHitboxWidth;
    case EnemyType.Flying:
      return flyingEnemyHitboxWidth;
    case EnemyType.Shooting:
      return shootingEnemyHitboxWidth;
  }
};
