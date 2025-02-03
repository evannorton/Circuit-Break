import {
  EntityPosition,
  getCurrentTime,
  getEntityPosition,
  moveEntity,
  playAudioSource,
} from "pixel-pigeon";
import { HadoukenProjectile } from "../classes/HadoukenProjectile";
import { XDirection } from "../types/Direction";
import {
  hadoukenBeforeDuration,
  hadoukenHitboxWidth,
  playerHitboxWidth,
} from "../constants";
import { sfxVolumeChannelID } from "../volumeChannels";
import { state } from "../state";

export const executePlayerHadouken = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error(
      "An attempt was made to create a hadouken entity but no player entity exists",
    );
  }
  if (
    state.values.playerHadouken !== null &&
    state.values.playerHadouken.wasExecuted === false &&
    getCurrentTime() - state.values.playerHadouken.createdAt >=
      hadoukenBeforeDuration
  ) {
    const playerPosition: EntityPosition = getEntityPosition(
      state.values.playerEntityID,
    );
    let position: EntityPosition | undefined;
    switch (state.values.facingDirection) {
      case XDirection.Left:
        position = {
          x: playerPosition.x - hadoukenHitboxWidth,
          y: playerPosition.y,
        };
        break;
      case XDirection.Right:
        position = {
          x: playerPosition.x + playerHitboxWidth,
          y: playerPosition.y,
        };
        break;
    }
    const hadoukenProjectile: HadoukenProjectile = new HadoukenProjectile({
      position,
      spawnDirection: state.values.facingDirection,
    });
    switch (state.values.facingDirection) {
      case XDirection.Left:
        moveEntity(hadoukenProjectile.id, {
          xVelocity: -120,
        });
        break;
      case XDirection.Right:
        moveEntity(hadoukenProjectile.id, {
          xVelocity: 120,
        });
        break;
    }
    state.values.playerHadouken.wasExecuted = true;
    playAudioSource("sfx/x-wave", {
      volumeChannelID: sfxVolumeChannelID,
    });
  }
};
