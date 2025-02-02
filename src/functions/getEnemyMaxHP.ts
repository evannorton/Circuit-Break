import { EnemyType } from "../classes/Enemy";

export const getEnemyMaxHP = (enemyType: EnemyType): number => {
  switch (enemyType) {
    case EnemyType.Base:
      return 6;
    case EnemyType.Flying:
      return 1;
    case EnemyType.Shooting:
      return 4;
  }
};
