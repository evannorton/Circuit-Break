import { EntityPosition, getEntityPosition, getGameWidth } from "pixel-pigeon";
import { HadoukenProjectile } from "../classes/HadoukenProjectile";
import { getDefinables } from "definables";
import { hadoukenHitboxWidth } from "../constants";

export const landHadoukens = (): void => {
  for (const hadoukenProjectile of getDefinables(HadoukenProjectile).values()) {
    const position: EntityPosition = getEntityPosition(hadoukenProjectile.id);
    if (position.x < -hadoukenHitboxWidth || position.x > getGameWidth()) {
      hadoukenProjectile.remove();
    }
  }
};
