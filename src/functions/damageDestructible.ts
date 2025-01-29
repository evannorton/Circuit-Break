import { getCurrentTime, removeEntity } from "pixel-pigeon";
import { isDestructibleTakingDamage } from "./isDestructibleTakingDamage";
import { state } from "../state";

export const damageDestructible = (damage: number): void => {
  if (isDestructibleTakingDamage() === false) {
    if (state.values.destructible === null) {
      throw new Error(
        "An attempt was made to punch a destructible but no box exists",
      );
    }
    state.values.destructible.damageDirection = state.values.facingDirection;
    state.values.destructible.hp -= damage;
    state.values.destructible.tookDamageAt = getCurrentTime();
    if (state.values.destructible.hp <= 0) {
      state.setValues({
        power: state.values.power + 1,
      });
      removeEntity(state.values.destructible.batteryEntityID);
      removeEntity(state.values.destructible.baseEntityID);
      state.setValues({
        destructible: null,
      });
    }
  }
};
