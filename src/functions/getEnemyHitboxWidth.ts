import { EnemyType } from "../classes/Enemy";
import { baseEnemyHitboxWidth, flyingEnemyHitboxWidth } from "../constants";

export const getEnemyHitboxWidth = (enemyType: EnemyType): number => {
  switch (enemyType) {
    case EnemyType.Base:
      return baseEnemyHitboxWidth;
    case EnemyType.Flying:
      return flyingEnemyHitboxWidth;
  }
};
