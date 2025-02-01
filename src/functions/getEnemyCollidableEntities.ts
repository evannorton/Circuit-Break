import { EnemyType } from "../classes/Enemy";

export const getEnemyCollidableEntities = (enemyType: EnemyType): string[] => {
  switch (enemyType) {
    case EnemyType.Base:
      return ["boundary", "destructible", "player", "enemy-base"];
    case EnemyType.Flying:
      return ["boundary"];
  }
};
