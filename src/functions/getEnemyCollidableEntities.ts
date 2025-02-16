import { EnemyType } from "../classes/Enemy";

export const getEnemyCollidableEntities = (enemyType: EnemyType): string[] => {
  switch (enemyType) {
    case EnemyType.Base:
      return [
        "boundary",
        "destructible",
        "player",
        "enemy-base",
        "enemy-boss",
        "enemy-shooting",
      ];
    case EnemyType.Boss:
      return [
        "boundary",
        "destructible",
        "player",
        "enemy-base",
        "enemy-boss",
        "enemy-shooting",
      ];
    case EnemyType.Flying:
      return ["boundary"];
    case EnemyType.Shooting:
      return [
        "boundary",
        "destructible",
        "player",
        "enemy-base",
        "enemy-boss",
        "enemy-shooting",
      ];
  }
};
