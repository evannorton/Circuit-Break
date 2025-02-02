import { Enemy } from "../classes/Enemy";
import {
  EntityPosition,
  getCurrentTime,
  getEntityPosition,
  moveEntity,
} from "pixel-pigeon";
import { ShootProjectile } from "../classes/ShootProjectile";
import { XDirection } from "../types/Direction";
import {
  baseEnemyHitboxWidth,
  shootBeforeDuration,
  shootHitboxWidth,
} from "../constants";
import { getDefinables } from "definables";

export const executeEnemiesShoots = (): void => {
  for (const enemy of getDefinables(Enemy).values()) {
    if (
      enemy.hasShoot() &&
      enemy.shoot.wasExecuted === false &&
      getCurrentTime() - enemy.shoot.createdAt >= shootBeforeDuration
    ) {
      const enemyPosition: EntityPosition = getEntityPosition(enemy.id);
      let position: EntityPosition | undefined;
      switch (enemy.facingDirection) {
        case XDirection.Left:
          position = {
            x: enemyPosition.x - shootHitboxWidth,
            y: enemyPosition.y,
          };
          break;
        case XDirection.Right:
          position = {
            x: enemyPosition.x + baseEnemyHitboxWidth,
            y: enemyPosition.y,
          };
          break;
      }
      enemy.shoot.wasExecuted = true;
      enemy.hasAttacked = true;
      const shootProjectile: ShootProjectile = new ShootProjectile({
        position,
        spawnDirection: enemy.facingDirection,
      });
      switch (enemy.facingDirection) {
        case XDirection.Left:
          moveEntity(shootProjectile.id, {
            xVelocity: -120,
          });
          break;
        case XDirection.Right:
          moveEntity(shootProjectile.id, {
            xVelocity: 120,
          });
          break;
      }
    }
  }
};
