import { Enemy, EnemyType } from "../classes/Enemy";
import { addEntityQuadrilateral, createQuadrilateral } from "pixel-pigeon";
import {
  baseEnemyHitboxWidth,
  entityHitboxHeight,
  flyingEnemyHitboxWidth,
  renderHitboxes,
  shootingEnemyHitboxWidth,
} from "../constants";
import { getDefinable } from "definables";

export const addEnemyQuadrilaterals = (enemyID: string): void => {
  if (renderHitboxes) {
    const enemy: Enemy = getDefinable(Enemy, enemyID);
    let hitboxWidth: number | undefined;
    switch (enemy.type) {
      case EnemyType.Base:
        hitboxWidth = baseEnemyHitboxWidth;
        break;
      case EnemyType.Flying:
        hitboxWidth = flyingEnemyHitboxWidth;
        break;
      case EnemyType.Shooting:
        hitboxWidth = shootingEnemyHitboxWidth;
        break;
    }
    addEntityQuadrilateral(enemyID, {
      quadrilateralID: createQuadrilateral({
        color: "#e03c28",
        height: 1,
        width: hitboxWidth,
      }),
    });
    addEntityQuadrilateral(enemyID, {
      quadrilateralID: createQuadrilateral({
        color: "#e03c28",
        height: 1,
        width: hitboxWidth,
      }),
      y: entityHitboxHeight - 1,
    });
    addEntityQuadrilateral(enemyID, {
      quadrilateralID: createQuadrilateral({
        color: "#e03c28",
        height: entityHitboxHeight,
        width: 1,
      }),
    });
    addEntityQuadrilateral(enemyID, {
      quadrilateralID: createQuadrilateral({
        color: "#e03c28",
        height: entityHitboxHeight,
        width: 1,
      }),
      x: hitboxWidth - 1,
    });
  }
};
