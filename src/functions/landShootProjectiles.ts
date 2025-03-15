import { EntityPosition, getEntityPosition, getGameWidth } from "pixel-pigeon";
import { ShootProjectile } from "../classes/ShootProjectile";
import { getDefinables } from "definables";
import { shootHitboxWidth } from "../constants";

export const landShootProjectiles = (): void => {
  for (const shootProjectile of getDefinables(ShootProjectile).values()) {
    const position: EntityPosition = getEntityPosition(shootProjectile.id);
    if (
      position.x < -shootHitboxWidth - getGameWidth() ||
      position.x > getGameWidth() * 2
    ) {
      shootProjectile.remove();
    }
  }
};
