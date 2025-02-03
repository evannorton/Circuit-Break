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
  flyingEnemyHitboxWidth,
  levelID,
  titleFadeDuration,
} from "./constants";
import { getDefinables } from "definables";
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
    if (state.values.playerEntityID === null) {
      throw new Error("Player entity ID is null.");
    }
    // Create enemies
    createEnemies();
    // Create destructible if we don't already have one
    if (state.values.destructible === null) {
      createDestructible();
    }
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
    // Execute enemies punches
    executeEnemiesPunches();
    // Execute enemies pummels
    executeEnemiesPummels();
    // Execute enemies slams
    executeEnemiesSlams();
    // Execute enemies kicks
    executeEnemiesKicks();
    // Execute enemies swoops
    executeEnemiesSwoops();
    // Execute enemies shoots
    executeEnemiesShoots();
    // Enemies behavior
    doEnemiesBehavior();
    // Land hadoukens
    landHadoukens();
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
  } else if (
    state.values.defeatAdvancedAt !== null &&
    getCurrentTime() - state.values.defeatAdvancedAt >= 500
  ) {
    retry();
  }
};
