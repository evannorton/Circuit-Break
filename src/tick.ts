import { Enemy, EnemyType } from "./classes/Enemy";
import {
  EntityPosition,
  getCurrentTime,
  getEntityIDs,
  getEntityPosition,
  getGameHeight,
  getGameWidth,
  moveEntity,
  setEntityZIndex,
} from "pixel-pigeon";
import { createDestructible } from "./functions/createDestructible";
import { createEnemies } from "./functions/createEnemies";
import { createFinalWave } from "./functions/createFinalWave";
import { doEnemiesBehavior } from "./functions/doEnemiesBehavior";
import { executeEnemiesKicks } from "./functions/executeEnemiesKicks";
import { executeEnemiesPummels } from "./functions/executeEnemiesPummels";
import { executeEnemiesPunches } from "./functions/executeEnemiesPunches";
import { executeEnemiesShoots } from "./functions/executeEnemiesShoots";
import { executeEnemiesSlams } from "./functions/executeEnemiesSlams";
import { executeEnemiesSwoops } from "./functions/executeEnemiesSwoops";
import { executePlayerHadouken } from "./functions/executePlayerHadouken";
import { executePlayerHighKick } from "./functions/executePlayerHighKick";
import { executePlayerKick } from "./functions/executePlayerKick";
import { executePlayerPunch } from "./functions/executePlayerPunch";
import {
  finalWaveStartsAt,
  flyingEnemyHitboxWidth,
  levelID,
  titleFadeDuration,
} from "./constants";
import { getDefinables, getDefinablesCount } from "definables";
import { handleExplosions } from "./functions/handleExplosions";
import { isGameOngoing } from "./functions/isGameOngoing";
import { isPlayerHadoukening } from "./functions/isPlayerHadoukening";
import { isPlayerHighKicking } from "./functions/isPlayerHighKicking";
import { isPlayerKicking } from "./functions/isPlayerKicking";
import { isPlayerLanding } from "./functions/isPlayerLanding";
import { isPlayerPunching } from "./functions/isPlayerPunching";
import { isPlayerStunned } from "./functions/isPlayerStunned";
import { landHadoukens } from "./functions/landHadoukens";
import { landShootProjectiles } from "./functions/landShootProjectiles";
import { movePlayer } from "./functions/movePlayer";
import { retry } from "./functions/retry";
import { startGame } from "./functions/startGame";
import { state } from "./state";

export const tick = (): void => {
  const currentTime: number = getCurrentTime();
  if (isGameOngoing()) {
    if (state.values.gameStartedAt === null) {
      throw new Error("Game started at is null.");
    }
    // Update first wave cleared
    if (
      state.values.enemiesStartedAt !== null &&
      state.values.firstWaveClearedAt === null
    ) {
      if (
        currentTime - state.values.enemiesStartedAt >= finalWaveStartsAt &&
        getDefinablesCount(Enemy) === 0
      ) {
        state.setValues({ firstWaveClearedAt: currentTime });
      }
    }
    // Create enemies
    createEnemies();
    // Create final wave
    createFinalWave();
    // Create destructible if we don't already have one
    if (state.values.destructible === null) {
      createDestructible();
    }
    if (state.values.isPlayerKilled === false) {
      // Move player if not punching or kicking
      if (
        isPlayerPunching() === false &&
        isPlayerKicking() === false &&
        isPlayerHadoukening() === false &&
        isPlayerHighKicking() === false &&
        isPlayerLanding() === false &&
        isPlayerStunned() === false
      ) {
        movePlayer();
      }
      // Stop player from moving if landing
      if (isPlayerLanding()) {
        if (state.values.playerEntityID === null) {
          throw new Error("Player entity ID is null.");
        }
        moveEntity(state.values.playerEntityID, {});
      }
      // Execute player punch
      executePlayerPunch();
      // Execute player kick
      executePlayerKick();
      // Execute player hadouken
      executePlayerHadouken();
      // Execute player high kick
      executePlayerHighKick();
    }
    // Execute enemies punches
    if (state.values.isPlayerKilled === false) {
      executeEnemiesPunches();
    }
    // Execute enemies pummels
    if (state.values.isPlayerKilled === false) {
      executeEnemiesPummels();
    }
    // Execute enemies slams
    if (state.values.isPlayerKilled === false) {
      executeEnemiesSlams();
    }
    // Execute enemies kicks
    if (state.values.isPlayerKilled === false) {
      executeEnemiesKicks();
    }
    // Execute enemies swoops
    if (state.values.isPlayerKilled === false) {
      executeEnemiesSwoops();
    }
    // Execute enemies shoots
    if (state.values.isPlayerKilled === false) {
      executeEnemiesShoots();
    }
    // Enemies behavior
    if (state.values.isPlayerKilled === false) {
      doEnemiesBehavior();
    }
    // Land shoot projectiles
    landShootProjectiles();
    // Clear flying enemies
    for (const enemy of getDefinables(Enemy).values()) {
      if (enemy.type === EnemyType.Flying && enemy.hasAttacked) {
        const enemyPosition: EntityPosition = getEntityPosition(enemy.id);
        if (
          enemyPosition.x < flyingEnemyHitboxWidth ||
          enemyPosition.x > getGameWidth() ||
          enemyPosition.y < flyingEnemyHitboxWidth ||
          enemyPosition.y > getGameHeight()
        ) {
          enemy.remove();
        }
      }
    }
    // Land hadoukens
    landHadoukens();
    // Handle explosions
    handleExplosions();
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
    state.values.isPlayerKilled === false &&
    state.values.gameEndedAt === null &&
    state.values.titleAdvancedAt !== null &&
    currentTime - state.values.titleAdvancedAt >= titleFadeDuration
  ) {
    startGame();
  } else if (
    state.values.defeatAdvancedAt !== null &&
    getCurrentTime() - state.values.defeatAdvancedAt >= 500
  ) {
    retry();
  }
};
