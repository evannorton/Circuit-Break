import { Enemy } from "../classes/Enemy";
import { HadoukenProjectile } from "../classes/HadoukenProjectile";
import { ShootProjectile } from "../classes/ShootProjectile";
import {
  applyAudioSourceVolume,
  fadeInAudioSourceVolume,
  fadeOutAudioSourceVolume,
  getCurrentTime,
  removeEntity,
} from "pixel-pigeon";
import { getDefinables } from "definables";
import { state } from "../state";

export const endGame = (didWin: boolean): void => {
  fadeOutAudioSourceVolume("music/main", {
    duration: 1000,
  });
  applyAudioSourceVolume("music/chill", { volume: 1 });
  fadeInAudioSourceVolume("music/chill", {
    duration: 1000,
  });
  state.setValues({
    didWin,
    gameEndedAt: getCurrentTime(),
  });
  for (const enemy of getDefinables(Enemy).values()) {
    enemy.remove();
  }
  for (const hadoukenProjectile of getDefinables(HadoukenProjectile).values()) {
    hadoukenProjectile.remove();
  }
  for (const shootProjectile of getDefinables(ShootProjectile).values()) {
    shootProjectile.remove();
  }
  if (state.values.destructible !== null) {
    removeEntity(state.values.destructible.batteryEntityID);
    removeEntity(state.values.destructible.baseEntityID);
  }
};
