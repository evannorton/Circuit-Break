import { getCurrentTime, removeEntity } from "pixel-pigeon";
import { getPowerLevelIndex } from "./getPowerLevel";
import { isDestructibleRising } from "./isDestructibleRising";
import { isDestructibleTakingDamage } from "./isDestructibleTakingDamage";
import { playerMaxHP } from "../constants";
import { state } from "../state";

export const damageDestructible = (
  damage: number,
  stunDuration: number,
): void => {
  if (
    isDestructibleTakingDamage() === false &&
    isDestructibleRising() === false
  ) {
    if (state.values.destructible === null) {
      throw new Error(
        "An attempt was made to punch a destructible but no box exists",
      );
    }
    const currentTime: number = getCurrentTime();
    state.values.destructible.damageDirection = state.values.facingDirection;
    state.values.destructible.hp -= damage;
    state.values.destructible.tookDamageAt = currentTime;
    state.values.destructible.stunDuration = stunDuration;
    if (state.values.destructible.hp <= 0) {
      const powerLevelIndex: number | null = getPowerLevelIndex();
      removeEntity(state.values.destructible.batteryEntityID);
      removeEntity(state.values.destructible.baseEntityID);
      state.setValues({
        destructible: null,
        playerHP: Math.min(state.values.playerHP + 1, playerMaxHP),
        power: state.values.power + 1,
      });
      if (state.values.enemiesStartedAt === null) {
        state.setValues({
          enemiesStartedAt: currentTime,
        });
      }
      const newPowerLevelIndex: number | null = getPowerLevelIndex();
      if (newPowerLevelIndex !== powerLevelIndex) {
        state.setValues({
          unlockDisplayedAt: currentTime,
        });
      }
    }
  }
};
