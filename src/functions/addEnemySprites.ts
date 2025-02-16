import { Enemy, EnemyType } from "../classes/Enemy";
import { PunchHand } from "../types/Punch";
import { XDirection } from "../types/Direction";
import { addEntitySprite, createSprite, getCurrentTime } from "pixel-pigeon";
import {
  baseEnemySpriteHeight,
  baseEnemySpriteWidth,
  bossEnemySpriteHeight,
  bossEnemySpriteWidth,
  entityHitboxHeight,
  flyingEnemySpriteHeight,
  flyingEnemySpriteWidth,
  jumpDuration,
  kickAfterDuration,
  kickBeforeDuration,
  pummelAfterDuration,
  pummelBeforeDuration,
  punchAfterDuration,
  punchBeforeDuration,
  shootBeforeDuration,
  shootingEnemySpriteHeight,
  shootingEnemySpriteWidth,
  slamAfterDuration,
  slamBeforeDuration,
  swoopAfterDuration,
  swoopBeforeDuration,
} from "../constants";
import { getDefinable } from "definables";
import { isEnemyKicking } from "./isEnemyKicking";
import { isEnemyMoving } from "./isEnemyMoving";
import { isEnemyPummeling } from "./isEnemyPummeling";
import { isEnemyPunching } from "./isEnemyPunching";
import { isEnemyShooting } from "./isEnemyShooting";
import { isEnemySlamming } from "./isEnemySlamming";
import { isEnemyStunned } from "./isEnemyStunned";
import { isEnemyTakingKnockback } from "./isEnemyTakingKnockback";

const getBaseEnemyImagePath = (): string => {
  const randomNumber: number = Math.random() * 4;
  if (randomNumber < 1) {
    return "enemies/base-enemy-1";
  }
  if (randomNumber < 2) {
    return "enemies/base-enemy-2";
  }
  if (randomNumber < 3) {
    return "enemies/base-enemy-3";
  }
  return "enemies/base-enemy-4";
};
const getFlyingEnemyImagePath = (): string => {
  const randomNumber: number = Math.random() * 4;
  if (randomNumber < 1) {
    return "enemies/flying-enemy-1";
  }
  if (randomNumber < 2) {
    return "enemies/flying-enemy-2";
  }
  if (randomNumber < 3) {
    return "enemies/flying-enemy-3";
  }
  return "enemies/flying-enemy-4";
};

export const addEnemySprites = (enemyID: string): void => {
  const enemy: Enemy = getDefinable(Enemy, enemyID);
  const opacity = (): number => {
    if (enemy.hasTookDamageAt()) {
      const diff: number = getCurrentTime() - enemy.tookDamageAt;
      const amount: number = 40;
      if (diff < amount) {
        return 0;
      }
      if (diff < amount * 2) {
        return 1;
      }
      if (diff < amount * 3) {
        return 0;
      }
      if (diff < amount * 4) {
        return 1;
      }
      if (diff < amount * 5) {
        return 0;
      }
      return 1;
    }
    return 1;
  };
  switch (enemy.type) {
    case EnemyType.Base:
      addEntitySprite(enemyID, {
        spriteID: createSprite({
          animationID: "default",
          animations: [
            {
              frames: [
                {
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: 0,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "default",
            },
            {
              frames: [
                {
                  duration: jumpDuration / 5,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth,
                  sourceY: 0,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: jumpDuration / 5,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 2,
                  sourceY: 0,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: jumpDuration / 5,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 3,
                  sourceY: 0,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: jumpDuration / 5,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 2,
                  sourceY: 0,
                  width: baseEnemySpriteWidth,
                },
                {
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth,
                  sourceY: 0,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "jump",
            },
          ],
          imagePath: "shadow",
        }),
        x: (): number => {
          switch (enemy.facingDirection) {
            case XDirection.Left:
              return -18;
            case XDirection.Right:
              return -17;
          }
        },
        y: -baseEnemySpriteHeight + entityHitboxHeight + 7,
      });
      addEntitySprite(enemyID, {
        spriteID: createSprite({
          animationID: (): string => {
            switch (enemy.facingDirection) {
              case XDirection.Left:
                if (isEnemyPunching(enemy.id)) {
                  if (
                    getCurrentTime() - enemy.punch.createdAt <
                    punchBeforeDuration
                  ) {
                    return "charge-punch-left";
                  }
                  if (enemy.punch.hand === PunchHand.Left) {
                    return "punch-left-left";
                  }
                  return "punch-left-right";
                }
                if (isEnemyKicking(enemy.id)) {
                  if (
                    getCurrentTime() - enemy.kick.createdAt <
                    kickBeforeDuration
                  ) {
                    return "charge-kick-left";
                  }
                  return "kick-left";
                }
                if (
                  isEnemyTakingKnockback(enemy.id) ||
                  isEnemyStunned(enemy.id)
                ) {
                  return "stunned-left";
                }
                if (isEnemyMoving(enemy.id)) {
                  return "walk-left";
                }
                return "idle-left";
              case XDirection.Right:
                if (isEnemyPunching(enemy.id)) {
                  if (
                    getCurrentTime() - enemy.punch.createdAt <
                    punchBeforeDuration
                  ) {
                    return "charge-punch-right";
                  }
                  if (enemy.punch.hand === PunchHand.Left) {
                    return "punch-right-left";
                  }
                  return "punch-right-right";
                }
                if (isEnemyKicking(enemy.id)) {
                  if (
                    getCurrentTime() - enemy.kick.createdAt <
                    kickBeforeDuration
                  ) {
                    return "charge-kick-right";
                  }
                  return "kick-right";
                }
                if (
                  isEnemyTakingKnockback(enemy.id) ||
                  isEnemyStunned(enemy.id)
                ) {
                  return "stunned-right";
                }
                if (isEnemyMoving(enemy.id)) {
                  return "walk-right";
                }
                return "idle-right";
            }
          },
          animations: [
            {
              frames: [
                {
                  duration: 200,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: baseEnemySpriteHeight * 17,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth,
                  sourceY: baseEnemySpriteHeight * 17,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: 200,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 2,
                  sourceY: baseEnemySpriteHeight * 17,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 3,
                  sourceY: baseEnemySpriteHeight * 17,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "idle-left",
            },
            {
              frames: [
                {
                  duration: 200,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: 0,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth,
                  sourceY: 0,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: 200,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 2,
                  sourceY: 0,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 2,
                  sourceY: 0,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "idle-right",
            },
            {
              frames: [
                {
                  duration: 100,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: baseEnemySpriteHeight * 19,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth,
                  sourceY: baseEnemySpriteHeight * 19,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 2,
                  sourceY: baseEnemySpriteHeight * 19,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 3,
                  sourceY: baseEnemySpriteHeight * 19,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 4,
                  sourceY: baseEnemySpriteHeight * 19,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 5,
                  sourceY: baseEnemySpriteHeight * 19,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "walk-left",
            },
            {
              frames: [
                {
                  duration: 100,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: baseEnemySpriteHeight * 2,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth,
                  sourceY: baseEnemySpriteHeight * 2,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 2,
                  sourceY: baseEnemySpriteHeight * 2,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 3,
                  sourceY: baseEnemySpriteHeight * 2,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 4,
                  sourceY: baseEnemySpriteHeight * 2,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 5,
                  sourceY: baseEnemySpriteHeight * 2,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "walk-right",
            },
            {
              frames: [
                {
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: baseEnemySpriteHeight * 29,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "jump-left",
            },
            {
              frames: [
                {
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: baseEnemySpriteHeight * 12,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "jump-right",
            },
            {
              frames: [
                {
                  duration: punchAfterDuration / 3,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: baseEnemySpriteHeight * 21,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: punchAfterDuration / 3,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth,
                  sourceY: baseEnemySpriteHeight * 21,
                  width: baseEnemySpriteWidth,
                },
                {
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 2,
                  sourceY: baseEnemySpriteHeight * 21,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "punch-left-right",
            },
            {
              frames: [
                {
                  duration: punchAfterDuration / 3,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: baseEnemySpriteHeight * 22,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: punchAfterDuration / 3,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth,
                  sourceY: baseEnemySpriteHeight * 22,
                  width: baseEnemySpriteWidth,
                },
                {
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 2,
                  sourceY: baseEnemySpriteHeight * 22,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "punch-left-left",
            },
            {
              frames: [
                {
                  duration: punchAfterDuration / 3,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: baseEnemySpriteHeight * 5,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: punchAfterDuration / 3,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth,
                  sourceY: baseEnemySpriteHeight * 5,
                  width: baseEnemySpriteWidth,
                },
                {
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 2,
                  sourceY: baseEnemySpriteHeight * 5,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "punch-right-right",
            },
            {
              frames: [
                {
                  duration: punchAfterDuration / 3,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: baseEnemySpriteHeight * 4,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: punchAfterDuration / 3,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth,
                  sourceY: baseEnemySpriteHeight * 4,
                  width: baseEnemySpriteWidth,
                },
                {
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 2,
                  sourceY: baseEnemySpriteHeight * 4,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "punch-right-left",
            },
            {
              frames: [
                {
                  duration: kickAfterDuration / 3,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: baseEnemySpriteHeight * 24,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: kickAfterDuration / 3,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth,
                  sourceY: baseEnemySpriteHeight * 24,
                  width: baseEnemySpriteWidth,
                },
                {
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 2,
                  sourceY: baseEnemySpriteHeight * 24,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "kick-left",
            },
            {
              frames: [
                {
                  duration: kickAfterDuration / 3,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: baseEnemySpriteHeight * 7,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: kickAfterDuration / 3,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth,
                  sourceY: baseEnemySpriteHeight * 7,
                  width: baseEnemySpriteWidth,
                },
                {
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 2,
                  sourceY: baseEnemySpriteHeight * 7,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "kick-right",
            },
            {
              frames: [
                {
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: baseEnemySpriteHeight * 23,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "charge-punch-left",
            },
            {
              frames: [
                {
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: baseEnemySpriteHeight * 6,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "charge-punch-right",
            },
            {
              frames: [
                {
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: baseEnemySpriteHeight * 23,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "charge-kick-left",
            },
            {
              frames: [
                {
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: baseEnemySpriteHeight * 6,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "charge-kick-right",
            },
            {
              frames: [
                {
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth,
                  sourceY: baseEnemySpriteHeight * 33,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "stunned-left",
            },
            {
              frames: [
                {
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth,
                  sourceY: baseEnemySpriteHeight * 16,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "stunned-right",
            },
          ],
          imagePath: getBaseEnemyImagePath(),
          opacity,
        }),
        x: (): number => {
          switch (enemy.facingDirection) {
            case XDirection.Left:
              return -34;
            case XDirection.Right:
              return -17;
          }
        },
        y: (): number => {
          const baseOffset: number =
            -baseEnemySpriteHeight + entityHitboxHeight + 7;
          return baseOffset;
        },
      });
      break;
    case EnemyType.Boss:
      addEntitySprite(enemyID, {
        spriteID: createSprite({
          animationID: (): string => {
            if (
              isEnemyMoving(enemy.id) ||
              (isEnemySlamming(enemy.id) &&
                getCurrentTime() - enemy.slam.createdAt >= slamBeforeDuration)
            ) {
              return "walking";
            }
            return "default";
          },
          animations: [
            {
              frames: [
                {
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: 0,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "default",
            },
            {
              frames: [
                {
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "walking",
            },
          ],
          imagePath: "shadow",
        }),
        x: (): number => {
          switch (enemy.facingDirection) {
            case XDirection.Left:
              if (
                isEnemyMoving(enemy.id) ||
                (isEnemySlamming(enemy.id) &&
                  getCurrentTime() - enemy.slam.createdAt >= slamBeforeDuration)
              ) {
                return -28;
              }
              return -18;
            case XDirection.Right:
              if (
                isEnemyMoving(enemy.id) ||
                (isEnemySlamming(enemy.id) &&
                  getCurrentTime() - enemy.slam.createdAt >= slamBeforeDuration)
              ) {
                return -15;
              }
              return -17;
          }
        },
        y: -bossEnemySpriteHeight + entityHitboxHeight + 7,
      });
      addEntitySprite(enemyID, {
        spriteID: createSprite({
          animationID: (): string => {
            switch (enemy.facingDirection) {
              case XDirection.Left:
                if (isEnemyPunching(enemy.id)) {
                  if (
                    getCurrentTime() - enemy.punch.createdAt <
                    punchBeforeDuration
                  ) {
                    return "charge-punch-left";
                  }
                  if (enemy.punch.hand === PunchHand.Left) {
                    return "punch-left-left";
                  }
                  return "punch-left-right";
                }
                if (isEnemyKicking(enemy.id)) {
                  if (
                    getCurrentTime() - enemy.kick.createdAt <
                    kickBeforeDuration
                  ) {
                    return "charge-kick-left";
                  }
                  return "kick-left";
                }
                if (isEnemyPummeling(enemy.id)) {
                  if (
                    getCurrentTime() - enemy.pummel.createdAt <
                    pummelBeforeDuration
                  ) {
                    return "charge-pummel-left";
                  }
                  return "pummel-left";
                }
                if (isEnemySlamming(enemy.id)) {
                  if (
                    getCurrentTime() - enemy.slam.createdAt <
                    slamBeforeDuration
                  ) {
                    return "charge-slam-left";
                  }
                  return "slam-left";
                }
                if (
                  isEnemyTakingKnockback(enemy.id) ||
                  isEnemyStunned(enemy.id)
                ) {
                  return "stunned-left";
                }
                if (isEnemyMoving(enemy.id)) {
                  return "walk-left";
                }
                return "idle-left";
              case XDirection.Right:
                if (isEnemyPunching(enemy.id)) {
                  if (
                    getCurrentTime() - enemy.punch.createdAt <
                    punchBeforeDuration
                  ) {
                    return "charge-punch-right";
                  }
                  if (enemy.punch.hand === PunchHand.Left) {
                    return "punch-right-left";
                  }
                  return "punch-right-right";
                }
                if (isEnemyKicking(enemy.id)) {
                  if (
                    getCurrentTime() - enemy.kick.createdAt <
                    kickBeforeDuration
                  ) {
                    return "charge-kick-right";
                  }
                  return "kick-right";
                }
                if (isEnemyPummeling(enemy.id)) {
                  if (
                    getCurrentTime() - enemy.pummel.createdAt <
                    pummelBeforeDuration
                  ) {
                    return "charge-pummel-right";
                  }
                  return "pummel-right";
                }
                if (isEnemySlamming(enemy.id)) {
                  if (
                    getCurrentTime() - enemy.slam.createdAt <
                    slamBeforeDuration
                  ) {
                    return "charge-slam-right";
                  }
                  return "slam-right";
                }
                if (
                  isEnemyTakingKnockback(enemy.id) ||
                  isEnemyStunned(enemy.id)
                ) {
                  return "stunned-right";
                }
                if (isEnemyMoving(enemy.id)) {
                  return "walk-right";
                }
                return "idle-right";
            }
          },
          animations: [
            {
              frames: [
                {
                  duration: 200,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 17,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth,
                  sourceY: bossEnemySpriteHeight * 17,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: 200,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: bossEnemySpriteHeight * 17,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 3,
                  sourceY: bossEnemySpriteHeight * 17,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "idle-left",
            },
            {
              frames: [
                {
                  duration: 200,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: 0,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth,
                  sourceY: 0,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: 200,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: 0,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: 0,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "idle-right",
            },
            {
              frames: [
                {
                  duration: 100,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 19,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth,
                  sourceY: bossEnemySpriteHeight * 19,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: bossEnemySpriteHeight * 19,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 3,
                  sourceY: bossEnemySpriteHeight * 19,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 4,
                  sourceY: bossEnemySpriteHeight * 19,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 5,
                  sourceY: bossEnemySpriteHeight * 19,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "walk-left",
            },
            {
              frames: [
                {
                  duration: 100,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 2,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth,
                  sourceY: bossEnemySpriteHeight * 2,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: bossEnemySpriteHeight * 2,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 3,
                  sourceY: bossEnemySpriteHeight * 2,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 4,
                  sourceY: bossEnemySpriteHeight * 2,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 5,
                  sourceY: bossEnemySpriteHeight * 2,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "walk-right",
            },
            {
              frames: [
                {
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 29,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "jump-left",
            },
            {
              frames: [
                {
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 12,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "jump-right",
            },
            {
              frames: [
                {
                  duration: punchAfterDuration / 3,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 21,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: punchAfterDuration / 3,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth,
                  sourceY: bossEnemySpriteHeight * 21,
                  width: bossEnemySpriteWidth,
                },
                {
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: bossEnemySpriteHeight * 21,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "punch-left-right",
            },
            {
              frames: [
                {
                  duration: punchAfterDuration / 3,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 22,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: punchAfterDuration / 3,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth,
                  sourceY: bossEnemySpriteHeight * 22,
                  width: bossEnemySpriteWidth,
                },
                {
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: bossEnemySpriteHeight * 22,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "punch-left-left",
            },
            {
              frames: [
                {
                  duration: punchAfterDuration / 3,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 5,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: punchAfterDuration / 3,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth,
                  sourceY: bossEnemySpriteHeight * 5,
                  width: bossEnemySpriteWidth,
                },
                {
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: bossEnemySpriteHeight * 5,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "punch-right-right",
            },
            {
              frames: [
                {
                  duration: punchAfterDuration / 3,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 4,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: punchAfterDuration / 3,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth,
                  sourceY: bossEnemySpriteHeight * 4,
                  width: bossEnemySpriteWidth,
                },
                {
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: bossEnemySpriteHeight * 4,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "punch-right-left",
            },
            {
              frames: [
                {
                  duration: kickAfterDuration / 3,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 24,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: kickAfterDuration / 3,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth,
                  sourceY: bossEnemySpriteHeight * 24,
                  width: bossEnemySpriteWidth,
                },
                {
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: bossEnemySpriteHeight * 24,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "kick-left",
            },
            {
              frames: [
                {
                  duration: kickAfterDuration / 3,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 7,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: kickAfterDuration / 3,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth,
                  sourceY: bossEnemySpriteHeight * 7,
                  width: bossEnemySpriteWidth,
                },
                {
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: bossEnemySpriteHeight * 7,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "kick-right",
            },
            {
              frames: [
                {
                  duration: pummelAfterDuration / 3,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 21,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: pummelAfterDuration / 3,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth,
                  sourceY: bossEnemySpriteHeight * 21,
                  width: bossEnemySpriteWidth,
                },
                {
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: bossEnemySpriteHeight * 21,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "pummel-left",
            },
            {
              frames: [
                {
                  duration: pummelAfterDuration / 3,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 4,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: pummelAfterDuration / 3,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth,
                  sourceY: bossEnemySpriteHeight * 4,
                  width: bossEnemySpriteWidth,
                },
                {
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: bossEnemySpriteHeight * 4,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "pummel-right",
            },
            {
              frames: [
                {
                  duration: slamAfterDuration / 6,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 23,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: slamAfterDuration / 6,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth,
                  sourceY: bossEnemySpriteHeight * 23,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: slamAfterDuration / 6,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: bossEnemySpriteHeight * 23,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: slamAfterDuration / 6,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 3,
                  sourceY: bossEnemySpriteHeight * 23,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: slamAfterDuration / 6,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 4,
                  sourceY: bossEnemySpriteHeight * 23,
                  width: bossEnemySpriteWidth,
                },
                {
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 5,
                  sourceY: bossEnemySpriteHeight * 23,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "slam-left",
            },
            {
              frames: [
                {
                  duration: slamAfterDuration / 6,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 6,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: slamAfterDuration / 6,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth,
                  sourceY: bossEnemySpriteHeight * 6,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: slamAfterDuration / 6,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: bossEnemySpriteHeight * 6,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: slamAfterDuration / 6,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 3,
                  sourceY: bossEnemySpriteHeight * 6,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: slamAfterDuration / 6,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 4,
                  sourceY: bossEnemySpriteHeight * 6,
                  width: bossEnemySpriteWidth,
                },
                {
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 5,
                  sourceY: bossEnemySpriteHeight * 6,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "slam-right",
            },
            {
              frames: [
                {
                  height: bossEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 23,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "charge-punch-left",
            },
            {
              frames: [
                {
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 6,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "charge-punch-right",
            },
            {
              frames: [
                {
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 23,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "charge-kick-left",
            },
            {
              frames: [
                {
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 6,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "charge-kick-right",
            },
            {
              frames: [
                {
                  duration: pummelBeforeDuration / 8,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 20,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: pummelBeforeDuration / 8,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth,
                  sourceY: bossEnemySpriteHeight * 20,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: pummelBeforeDuration / 8,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: bossEnemySpriteHeight * 20,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: pummelBeforeDuration / 8,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: bossEnemySpriteHeight * 20,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "charge-pummel-left",
            },
            {
              frames: [
                {
                  duration: pummelBeforeDuration / 8,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 3,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: pummelBeforeDuration / 8,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth,
                  sourceY: bossEnemySpriteHeight * 3,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: pummelBeforeDuration / 8,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: bossEnemySpriteHeight * 3,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: pummelBeforeDuration / 8,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 3,
                  sourceY: bossEnemySpriteHeight * 3,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "charge-pummel-right",
            },
            {
              frames: [
                {
                  duration: slamBeforeDuration / 8,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 22,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: slamBeforeDuration / 8,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth,
                  sourceY: bossEnemySpriteHeight * 22,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: slamBeforeDuration / 8,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: bossEnemySpriteHeight * 22,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: slamBeforeDuration / 8,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: bossEnemySpriteHeight * 22,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "charge-slam-left",
            },
            {
              frames: [
                {
                  duration: slamBeforeDuration / 8,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: bossEnemySpriteHeight * 5,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: slamBeforeDuration / 8,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth,
                  sourceY: bossEnemySpriteHeight * 5,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: slamBeforeDuration / 8,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 2,
                  sourceY: bossEnemySpriteHeight * 5,
                  width: bossEnemySpriteWidth,
                },
                {
                  duration: slamBeforeDuration / 8,
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth * 3,
                  sourceY: bossEnemySpriteHeight * 5,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "charge-slam-right",
            },
            {
              frames: [
                {
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth,
                  sourceY: bossEnemySpriteHeight * 33,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "stunned-left",
            },
            {
              frames: [
                {
                  height: bossEnemySpriteHeight,
                  sourceHeight: bossEnemySpriteHeight,
                  sourceWidth: bossEnemySpriteWidth,
                  sourceX: bossEnemySpriteWidth,
                  sourceY: bossEnemySpriteHeight * 16,
                  width: bossEnemySpriteWidth,
                },
              ],
              id: "stunned-right",
            },
          ],
          imagePath: "enemies/boss-enemy",
          opacity,
        }),
        x: (): number => {
          switch (enemy.facingDirection) {
            case XDirection.Left:
              return -34;
            case XDirection.Right:
              return -17;
          }
        },
        y: (): number => {
          const bossOffset: number =
            -bossEnemySpriteHeight + entityHitboxHeight + 7;
          return bossOffset;
        },
      });
      break;
    case EnemyType.Shooting:
      addEntitySprite(enemyID, {
        spriteID: createSprite({
          animationID: "default",
          animations: [
            {
              frames: [
                {
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: 0,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "default",
            },
            {
              frames: [
                {
                  duration: jumpDuration / 5,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth,
                  sourceY: 0,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: jumpDuration / 5,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 2,
                  sourceY: 0,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: jumpDuration / 5,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 3,
                  sourceY: 0,
                  width: baseEnemySpriteWidth,
                },
                {
                  duration: jumpDuration / 5,
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 2,
                  sourceY: 0,
                  width: baseEnemySpriteWidth,
                },
                {
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth,
                  sourceY: 0,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "jump",
            },
          ],
          imagePath: "shadow",
        }),
        x: (): number => {
          switch (enemy.facingDirection) {
            case XDirection.Left:
              return -18;
            case XDirection.Right:
              return -17;
          }
        },
        y: -baseEnemySpriteHeight + entityHitboxHeight + 7,
      });
      addEntitySprite(enemyID, {
        spriteID: createSprite({
          animationID: (): string => {
            switch (enemy.facingDirection) {
              case XDirection.Left:
                if (
                  isEnemyTakingKnockback(enemy.id) ||
                  isEnemyStunned(enemy.id)
                ) {
                  return "stunned-left";
                }
                if (isEnemyMoving(enemy.id)) {
                  return "walk-left";
                }
                if (isEnemyShooting(enemy.id)) {
                  if (
                    getCurrentTime() - enemy.shoot.createdAt <
                    shootBeforeDuration
                  ) {
                    return "charge-shoot-left";
                  }
                  return "shoot-left";
                }
                return "shoot-left";
              case XDirection.Right:
                if (
                  isEnemyTakingKnockback(enemy.id) ||
                  isEnemyStunned(enemy.id)
                ) {
                  return "stunned-right";
                }
                if (isEnemyMoving(enemy.id)) {
                  return "walk-right";
                }
                if (isEnemyShooting(enemy.id)) {
                  if (
                    getCurrentTime() - enemy.shoot.createdAt <
                    shootBeforeDuration
                  ) {
                    return "charge-shoot-right";
                  }
                  return "shoot-right";
                }
                return "shoot-right";
            }
          },
          animations: [
            {
              frames: [
                {
                  duration: 200,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: shootingEnemySpriteHeight * 17,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth,
                  sourceY: shootingEnemySpriteHeight * 17,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: 200,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth * 2,
                  sourceY: shootingEnemySpriteHeight * 17,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth * 3,
                  sourceY: shootingEnemySpriteHeight * 17,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "idle-left",
            },
            {
              frames: [
                {
                  duration: 200,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: 0,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth,
                  sourceY: 0,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: 200,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth * 2,
                  sourceY: 0,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth * 2,
                  sourceY: 0,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "idle-right",
            },
            {
              frames: [
                {
                  duration: 100,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: shootingEnemySpriteHeight * 19,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth,
                  sourceY: shootingEnemySpriteHeight * 19,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth * 2,
                  sourceY: shootingEnemySpriteHeight * 19,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth * 3,
                  sourceY: shootingEnemySpriteHeight * 19,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth * 4,
                  sourceY: shootingEnemySpriteHeight * 19,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth * 5,
                  sourceY: shootingEnemySpriteHeight * 19,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "walk-left",
            },
            {
              frames: [
                {
                  duration: 100,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: shootingEnemySpriteHeight * 2,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth,
                  sourceY: shootingEnemySpriteHeight * 2,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth * 2,
                  sourceY: shootingEnemySpriteHeight * 2,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth * 3,
                  sourceY: shootingEnemySpriteHeight * 2,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth * 4,
                  sourceY: shootingEnemySpriteHeight * 2,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: 100,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth * 5,
                  sourceY: shootingEnemySpriteHeight * 2,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "walk-right",
            },
            {
              frames: [
                {
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: shootingEnemySpriteHeight * 29,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "jump-left",
            },
            {
              frames: [
                {
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: shootingEnemySpriteHeight * 12,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "jump-right",
            },
            {
              frames: [
                {
                  duration: punchAfterDuration / 3,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: shootingEnemySpriteHeight * 21,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: punchAfterDuration / 3,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth,
                  sourceY: shootingEnemySpriteHeight * 21,
                  width: shootingEnemySpriteWidth,
                },
                {
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth * 2,
                  sourceY: shootingEnemySpriteHeight * 21,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "punch-left-right",
            },
            {
              frames: [
                {
                  duration: punchAfterDuration / 3,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: shootingEnemySpriteHeight * 22,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: punchAfterDuration / 3,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth,
                  sourceY: shootingEnemySpriteHeight * 22,
                  width: shootingEnemySpriteWidth,
                },
                {
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth * 2,
                  sourceY: shootingEnemySpriteHeight * 22,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "punch-left-left",
            },
            {
              frames: [
                {
                  duration: punchAfterDuration / 3,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: shootingEnemySpriteHeight * 5,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: punchAfterDuration / 3,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth,
                  sourceY: shootingEnemySpriteHeight * 5,
                  width: shootingEnemySpriteWidth,
                },
                {
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth * 2,
                  sourceY: shootingEnemySpriteHeight * 5,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "punch-right-right",
            },
            {
              frames: [
                {
                  duration: punchAfterDuration / 3,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: shootingEnemySpriteHeight * 4,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: punchAfterDuration / 3,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth,
                  sourceY: shootingEnemySpriteHeight * 4,
                  width: shootingEnemySpriteWidth,
                },
                {
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth * 2,
                  sourceY: shootingEnemySpriteHeight * 4,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "punch-right-left",
            },
            {
              frames: [
                {
                  duration: kickAfterDuration / 3,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: shootingEnemySpriteHeight * 24,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: kickAfterDuration / 3,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth,
                  sourceY: shootingEnemySpriteHeight * 24,
                  width: shootingEnemySpriteWidth,
                },
                {
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth * 2,
                  sourceY: shootingEnemySpriteHeight * 24,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "kick-left",
            },
            {
              frames: [
                {
                  duration: kickAfterDuration / 3,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: shootingEnemySpriteHeight * 7,
                  width: shootingEnemySpriteWidth,
                },
                {
                  duration: kickAfterDuration / 3,
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth,
                  sourceY: shootingEnemySpriteHeight * 7,
                  width: shootingEnemySpriteWidth,
                },
                {
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth * 2,
                  sourceY: shootingEnemySpriteHeight * 7,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "kick-right",
            },
            {
              frames: [
                {
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: shootingEnemySpriteHeight * 23,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "charge-punch-left",
            },
            {
              frames: [
                {
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: shootingEnemySpriteHeight * 6,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "charge-punch-right",
            },
            {
              frames: [
                {
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: shootingEnemySpriteHeight * 23,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "charge-kick-left",
            },
            {
              frames: [
                {
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: shootingEnemySpriteHeight * 6,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "charge-kick-right",
            },
            {
              frames: [
                {
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth,
                  sourceY: shootingEnemySpriteHeight * 33,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "stunned-left",
            },
            {
              frames: [
                {
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: shootingEnemySpriteWidth,
                  sourceY: shootingEnemySpriteHeight * 16,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "stunned-right",
            },
            {
              frames: [
                {
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: shootingEnemySpriteHeight * 20,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "charge-shoot-left",
            },
            {
              frames: [
                {
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: shootingEnemySpriteHeight * 20,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "shoot-left",
            },
            {
              frames: [
                {
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: shootingEnemySpriteHeight * 3,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "charge-shoot-right",
            },
            {
              frames: [
                {
                  height: shootingEnemySpriteHeight,
                  sourceHeight: shootingEnemySpriteHeight,
                  sourceWidth: shootingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: shootingEnemySpriteHeight * 3,
                  width: shootingEnemySpriteWidth,
                },
              ],
              id: "shoot-right",
            },
          ],
          imagePath: "enemies/shooting-enemy",
          opacity,
        }),
        x: (): number => {
          switch (enemy.facingDirection) {
            case XDirection.Left:
              return -34;
            case XDirection.Right:
              return -17;
          }
        },
        y: (): number => {
          const baseOffset: number =
            -shootingEnemySpriteHeight + entityHitboxHeight + 7;
          return baseOffset;
        },
      });
      break;
    case EnemyType.Flying:
      addEntitySprite(enemyID, {
        spriteID: createSprite({
          animationID: (): string => {
            if (
              enemy.hasSwoop() &&
              getCurrentTime() - enemy.swoop.createdAt >= swoopBeforeDuration &&
              getCurrentTime() - enemy.swoop.createdAt <
                swoopBeforeDuration + swoopAfterDuration
            ) {
              return "swoop";
            }
            return "default";
          },
          animations: [
            {
              frames: [
                {
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 3,
                  sourceY: 0,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "default",
            },
            {
              frames: [
                {
                  height: baseEnemySpriteHeight,
                  sourceHeight: baseEnemySpriteHeight,
                  sourceWidth: baseEnemySpriteWidth,
                  sourceX: baseEnemySpriteWidth * 2,
                  sourceY: 0,
                  width: baseEnemySpriteWidth,
                },
              ],
              id: "swoop",
            },
          ],
          imagePath: "shadow",
        }),
        x: -18,
        y: (): number => {
          const flyingOffset: number =
            -flyingEnemySpriteHeight - entityHitboxHeight - 24;
          return flyingOffset;
        },
      });
      addEntitySprite(enemyID, {
        spriteID: createSprite({
          animationID: (): string => {
            switch (enemy.facingDirection) {
              case XDirection.Left:
                return "left";
              case XDirection.Right:
                return "right";
            }
          },
          animations: [
            {
              frames: [
                {
                  height: flyingEnemySpriteHeight,
                  sourceHeight: flyingEnemySpriteHeight,
                  sourceWidth: flyingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: 0,
                  width: flyingEnemySpriteWidth,
                },
              ],
              id: "left",
            },
            {
              frames: [
                {
                  height: flyingEnemySpriteHeight,
                  sourceHeight: flyingEnemySpriteHeight,
                  sourceWidth: flyingEnemySpriteWidth,
                  sourceX: 0,
                  sourceY: flyingEnemySpriteHeight,
                  width: flyingEnemySpriteWidth,
                },
              ],
              id: "right",
            },
          ],
          imagePath: getFlyingEnemyImagePath(),
          opacity,
        }),
        y: (): number => {
          const flyingOffset: number =
            -flyingEnemySpriteHeight - entityHitboxHeight - 24;
          if (
            enemy.hasSwoop() &&
            getCurrentTime() - enemy.swoop.createdAt >= swoopBeforeDuration &&
            getCurrentTime() - enemy.swoop.createdAt <
              swoopBeforeDuration + swoopAfterDuration
          ) {
            const x: number =
              (getCurrentTime() -
                (enemy.swoop.createdAt + swoopBeforeDuration)) /
              (swoopAfterDuration / 2);
            const swoopHeight: number = 18;
            return (
              flyingOffset + Math.floor(swoopHeight * (1 - Math.pow(x - 1, 2)))
            );
          }
          return flyingOffset;
        },
      });
      break;
  }
};
