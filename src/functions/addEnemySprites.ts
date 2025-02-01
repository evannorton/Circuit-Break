import { Enemy } from "../classes/Enemy";
import { PunchHand } from "../types/Punch";
import { XDirection } from "../types/Direction";
import { addEntitySprite, createSprite, getCurrentTime } from "pixel-pigeon";
import {
  baseEnemySpriteHeight,
  baseEnemySpriteWidth,
  entityHitboxHeight,
  jumpDuration,
  kickAfterDuration,
  kickBeforeDuration,
  punchAfterDuration,
  punchBeforeDuration,
} from "../constants";
import { getDefinable } from "definables";
import { isEnemyKicking } from "./isEnemyKicking";
import { isEnemyMoving } from "./isEnemyMoving";
import { isEnemyPunching } from "./isEnemyPunching";
import { isEnemyStunned } from "./isEnemyStunned";
import { isEnemyTakingKnockback } from "./isEnemyTakingKnockback";

export const addEnemySprites = (enemyID: string): void => {
  const enemy: Enemy = getDefinable(Enemy, enemyID);
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
            if (isEnemyTakingKnockback(enemy.id) || isEnemyStunned(enemy.id)) {
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
            if (isEnemyTakingKnockback(enemy.id) || isEnemyStunned(enemy.id)) {
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
      imagePath: "base-enemy",
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
};
