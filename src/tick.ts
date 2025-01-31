import {
  EntityPosition,
  getCurrentTime,
  getEntityIDs,
  getEntityPosition,
  moveEntity,
  setEntityZIndex,
} from "pixel-pigeon";
import { createDestructible } from "./functions/createDestructible";
import { createEnemy } from "./functions/createEnemy";
import { doEnemiesBehavior } from "./functions/doEnemiesBehavior";
import { executeEnemiesKicks } from "./functions/executeEnemiesKicks";
import { executeEnemiesPunches } from "./functions/executeEnemiesPunches";
import { executePlayerHighKick } from "./functions/executePlayerHighKick";
import { executePlayerKick } from "./functions/executePlayerKick";
import { executePlayerPunch } from "./functions/executePlayerPunch";
import { isGameOngoing } from "./functions/isGameOngoing";
import { isPlayerHighKicking } from "./functions/isPlayerHighKicking";
import { isPlayerKicking } from "./functions/isPlayerKicking";
import { isPlayerLanding } from "./functions/isPlayerLanding";
import { isPlayerPunching } from "./functions/isPlayerPunching";
import { isPlayerStunned } from "./functions/isPlayerStunned";
import { levelID, titleFadeDuration } from "./constants";
import { movePlayer } from "./functions/movePlayer";
import { startGame } from "./functions/startGame";
import { state } from "./state";

export const tick = (): void => {
  const currentTime: number = getCurrentTime();
  if (isGameOngoing()) {
    if (state.values.playerEntityID === null) {
      throw new Error("Player entity ID is null.");
    }
    // Create enemy
    createEnemy();
    // Create destructible if we don't already have one
    if (state.values.destructible === null) {
      createDestructible();
    }
    // Move player if not punching or kicking
    if (
      isPlayerPunching() === false &&
      isPlayerKicking() === false &&
      isPlayerHighKicking() === false &&
      isPlayerLanding() === false &&
      isPlayerStunned() === false
    ) {
      movePlayer();
    }
    // Stop player from moving if landing
    if (isPlayerLanding()) {
      moveEntity(state.values.playerEntityID, {});
    }
    // Execute player punch
    executePlayerPunch();
    // Execute player kick
    executePlayerKick();
    // Execute player high kick
    executePlayerHighKick();
    // Execute enemies punches
    executeEnemiesPunches();
    // Execute enemies kicks
    executeEnemiesKicks();
    // Enemies behavior
    doEnemiesBehavior();
    // Y-sort characters
    [
      ...getEntityIDs({
        layerIDs: ["Characters"],
        levelIDs: [levelID],
      }),
    ]
      .sort((a: string, b: string): number => {
        const aPosition: EntityPosition = getEntityPosition(a);
        const bPosition: EntityPosition = getEntityPosition(b);
        if (aPosition.y < bPosition.y) {
          return -1;
        }
        if (aPosition.y > bPosition.y) {
          return 1;
        }
        return 0;
      })
      .forEach((entityID: string, entityIndex: number): void => {
        setEntityZIndex(entityID, entityIndex);
      });
  } else if (
    state.values.gameEndedAt === null &&
    state.values.titleAdvancedAt !== null &&
    currentTime - state.values.titleAdvancedAt >= titleFadeDuration
  ) {
    startGame();
  }
};
