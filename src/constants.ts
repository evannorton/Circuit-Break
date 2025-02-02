import { PowerLevel } from "./types/PowerLevel";

export const titleFadeDuration: number = 1500;
export const renderHitboxes: boolean = false;
export const playerMovementXSpeed: number = 80;
export const playerMovementYSpeed: number = (playerMovementXSpeed * 2) / 3;
export const baseEnemyMovementXSpeed: number = 40;
export const baseEnemyMovementYSpeed: number =
  (baseEnemyMovementXSpeed * 2) / 3;
export const flyingEnemyMovementXSpeed: number = 50;
export const flyingEnemyMovementYSpeed: number =
  (flyingEnemyMovementXSpeed * 2) / 3;
export const minY: number = 114;
export const maxY: number = 216;
export const levelID: string = "Level_0";
export const playerSpriteHeight: number = 64;
export const playerSpriteWidth: number = 80;
export const playerHitboxWidth: number = 29;
export const baseEnemySpriteHeight: number = 64;
export const baseEnemySpriteWidth: number = 80;
export const baseEnemyHitboxWidth: number = 29;
export const flyingEnemySpriteHeight: number = 29;
export const flyingEnemySpriteWidth: number = 27;
export const flyingEnemyHitboxWidth: number = 27;
export const jumpDuration: number = 500;
export const landDuration: number = 167;
export const punchBeforeDuration: number = 83;
export const kickBeforeDuration: number = 167;
export const swoopBeforeDuration: number = 200;
export const highKickBeforeDuration: number = 200;
export const swoopAfterDuration: number = 150;
export const punchAfterDuration: number = 167;
export const kickAfterDuration: number = 250;
export const highKickAfterDuration: number = 300;
export const destructibleHitboxWidth: number = 10;
export const destructibleSpriteWidth: number = 16;
export const destructibleSpriteHeight: number = 31;
export const punchHitboxWidth: number = 17;
export const jumpPunchHitboxWidth: number = 19;
export const kickHitboxWidth: number = 21;
export const highKickHitboxWidth: number = 22;
export const jumpKickHitboxWidth: number = 23;
export const swoopHitboxWidth: number = 15;
export const entityHitboxHeight: number = 5;
export const playerDamageDuration: number = 50;
export const enemyDamageDuration: number = 50;
export const playerSwoopedStunDuration: number = 100;
export const playerPunchedStunDuration: number = 250;
export const playerKickedStunDuration: number = 333;
export const enemyPunchedStunDuration: number = 500;
export const enemyKickedStunDuration: number = 667;
export const enemyHighKickedStunDuration: number = 667;
export const enemyJumpPunchedStunDuration: number = 883;
export const enemyJumpKickedStunDuration: number = 1000;
export const playerPunchDamage: number = 1;
export const playerKickDamage: number = 1.5;
export const playerHighKickDamage: number = 1.5;
export const enemyPunchDamage: number = 1;
export const enemyKickDamage: number = 1;
export const enemySwoopDamage: number = 1;
export const enemySpawnTime: number = 7500;
export const destructibleRisingFrames: number = 17;
export const destructibleRisingFrameDuration: number = 100;
export const destructibleIdleFrameDuration: number = 100;
export const playerMaxHP: number = 12;
export const heartsAmount: number = 6;
export const jumpHeight: number = 18;
export const comboThreshold: number = 250;
export const highKickKnockbackDuration: number = 375;
export const knockbackVelocity: number = 175;
export const powerLevels: PowerLevel[] = [
  {
    amount: 2,
    unlockImagePath: "unlocks/high-kick",
    unlockName: "High Kick",
  },
  {
    amount: 5,
    unlockImagePath: "unlocks/high-kick",
    unlockName: "High Kick",
  },
  {
    amount: 10,
    unlockImagePath: "unlocks/high-kick",
    unlockName: "High Kick",
  },
  {
    amount: 20,
    unlockImagePath: "unlocks/high-kick",
    unlockName: "High Kick",
  },
];
export const flyingEnemiesStartAt: number = 30000;
