import {
  EntityPosition,
  createEntity,
  createQuadrilateral,
  createSprite,
  getCurrentTime,
} from "pixel-pigeon";
import { PunchHand } from "../types/Punch";
import { XDirection } from "../types/Direction";
import {
  entityHitboxHeight,
  jumpDuration,
  jumpHeight,
  kickAfterDuration,
  kickBeforeDuration,
  levelID,
  playerHitboxWidth,
  playerSpriteHeight,
  playerSpriteWidth,
  punchAfterDuration,
  punchBeforeDuration,
  renderHitboxes,
} from "../constants";
import { isPlayerJumping } from "./isPlayerJumping";
import { isPlayerKicking } from "./isPlayerKicking";
import { isPlayerLanding } from "./isPlayerLanding";
import { isPlayerPunching } from "./isPlayerPunching";
import { isPlayerStunned } from "./isPlayerStunned";
import { state } from "../state";

export const createPlayer = (): void => {
  const position: EntityPosition = {
    x: 16,
    y: 160,
  };
  state.setValues({
    playerEntityID: createEntity({
      collidableEntityTypes: ["boundary", "destructible", "enemy"],
      collidesWithMap: true,
      height: entityHitboxHeight,
      layerID: "Characters",
      levelID,
      position,
      quadrilaterals: renderHitboxes
        ? [
            {
              quadrilateralID: createQuadrilateral({
                color: "#d59cfc",
                height: 1,
                width: playerHitboxWidth,
              }),
            },
            {
              quadrilateralID: createQuadrilateral({
                color: "#d59cfc",
                height: 1,
                width: playerHitboxWidth,
              }),
              y: entityHitboxHeight - 1,
            },
            {
              quadrilateralID: createQuadrilateral({
                color: "#d59cfc",
                height: entityHitboxHeight,
                width: 1,
              }),
            },
            {
              quadrilateralID: createQuadrilateral({
                color: "#d59cfc",
                height: entityHitboxHeight,
                width: 1,
              }),
              x: playerHitboxWidth - 1,
            },
          ]
        : undefined,
      sprites: [
        {
          spriteID: createSprite({
            animationID: (): string => {
              if (isPlayerJumping()) {
                return "jump";
              }
              return "default";
            },
            animations: [
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: 0,
                    width: playerSpriteWidth,
                  },
                ],
                id: "default",
              },
              {
                frames: [
                  {
                    duration: jumpDuration / 5,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth,
                    sourceY: 0,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: jumpDuration / 5,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 2,
                    sourceY: 0,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: jumpDuration / 5,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 3,
                    sourceY: 0,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: jumpDuration / 5,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 2,
                    sourceY: 0,
                    width: playerSpriteWidth,
                  },
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth,
                    sourceY: 0,
                    width: playerSpriteWidth,
                  },
                ],
                id: "jump",
              },
            ],
            imagePath: "shadow",
          }),
          x: (): number => {
            switch (state.values.facingDirection) {
              case XDirection.Left:
                return -18;
              case XDirection.Right:
                return -17;
            }
          },
          y: -playerSpriteHeight + entityHitboxHeight + 7,
        },
        {
          spriteID: createSprite({
            animationID: (): string => {
              const isMoving: boolean =
                state.values.movingXDirection !== null ||
                state.values.movingYDirection !== null;
              switch (state.values.facingDirection) {
                case XDirection.Left:
                  if (isPlayerKicking()) {
                    if (state.values.playerKick === null) {
                      throw new Error(
                        "Player is kicking but createdAt is null",
                      );
                    }
                    if (
                      getCurrentTime() - state.values.playerKick.createdAt <
                      kickBeforeDuration
                    ) {
                      return "charge-kick-left";
                    }
                    return "kick-left";
                  }
                  if (isPlayerPunching()) {
                    if (state.values.playerPunch === null) {
                      throw new Error(
                        "Player is punching but createdAt is null",
                      );
                    }
                    if (
                      getCurrentTime() - state.values.playerPunch.createdAt <
                      punchBeforeDuration
                    ) {
                      if (isPlayerJumping()) {
                        return "charge-jump-punch-left";
                      }
                      return "charge-punch-left";
                    }
                    if (state.values.playerPunch.hand === PunchHand.Left) {
                      if (isPlayerJumping()) {
                        return "jump-punch-left-left";
                      }
                      return "punch-left-left";
                    }
                    if (isPlayerJumping()) {
                      return "jump-punch-left-right";
                    }
                    return "punch-left-right";
                  }
                  if (isPlayerJumping()) {
                    return "jump-left";
                  }
                  if (isPlayerLanding()) {
                    return "land-left";
                  }
                  if (isPlayerStunned()) {
                    return "stunned-left";
                  }
                  if (isMoving) {
                    return "walk-left";
                  }
                  return "idle-left";
                case XDirection.Right:
                  if (isPlayerKicking()) {
                    if (state.values.playerKick === null) {
                      throw new Error(
                        "Player is kicking but createdAt is null",
                      );
                    }
                    if (
                      getCurrentTime() - state.values.playerKick.createdAt <
                      kickBeforeDuration
                    ) {
                      return "charge-kick-right";
                    }
                    return "kick-right";
                  }
                  if (isPlayerPunching()) {
                    if (state.values.playerPunch === null) {
                      throw new Error(
                        "Player is punching but createdAt is null",
                      );
                    }
                    if (
                      getCurrentTime() - state.values.playerPunch.createdAt <
                      punchBeforeDuration
                    ) {
                      if (isPlayerJumping()) {
                        return "charge-jump-punch-right";
                      }
                      return "charge-punch-right";
                    }
                    if (state.values.playerPunch.hand === PunchHand.Left) {
                      if (isPlayerJumping()) {
                        return "jump-punch-right-left";
                      }
                      return "punch-right-left";
                    }
                    if (isPlayerJumping()) {
                      return "jump-punch-right-right";
                    }
                    return "punch-right-right";
                  }
                  if (isPlayerJumping()) {
                    return "jump-right";
                  }
                  if (isPlayerLanding()) {
                    return "land-right";
                  }
                  if (isPlayerStunned()) {
                    return "stunned-right";
                  }
                  if (isMoving) {
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
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 17,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: 100,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth,
                    sourceY: playerSpriteHeight * 17,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: 200,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 2,
                    sourceY: playerSpriteHeight * 17,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: 100,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 3,
                    sourceY: playerSpriteHeight * 17,
                    width: playerSpriteWidth,
                  },
                ],
                id: "idle-left",
              },
              {
                frames: [
                  {
                    duration: 200,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: 0,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: 100,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth,
                    sourceY: 0,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: 200,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 2,
                    sourceY: 0,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: 100,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 2,
                    sourceY: 0,
                    width: playerSpriteWidth,
                  },
                ],
                id: "idle-right",
              },
              {
                frames: [
                  {
                    duration: 100,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 19,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: 100,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth,
                    sourceY: playerSpriteHeight * 19,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: 100,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 2,
                    sourceY: playerSpriteHeight * 19,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: 100,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 3,
                    sourceY: playerSpriteHeight * 19,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: 100,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 4,
                    sourceY: playerSpriteHeight * 19,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: 100,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 5,
                    sourceY: playerSpriteHeight * 19,
                    width: playerSpriteWidth,
                  },
                ],
                id: "walk-left",
              },
              {
                frames: [
                  {
                    duration: 100,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 2,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: 100,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth,
                    sourceY: playerSpriteHeight * 2,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: 100,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 2,
                    sourceY: playerSpriteHeight * 2,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: 100,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 3,
                    sourceY: playerSpriteHeight * 2,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: 100,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 4,
                    sourceY: playerSpriteHeight * 2,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: 100,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 5,
                    sourceY: playerSpriteHeight * 2,
                    width: playerSpriteWidth,
                  },
                ],
                id: "walk-right",
              },
              {
                frames: [
                  {
                    duration: jumpDuration / 2,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 26,
                    width: playerSpriteWidth,
                  },
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 27,
                    width: playerSpriteWidth,
                  },
                ],
                id: "jump-left",
              },
              {
                frames: [
                  {
                    duration: jumpDuration / 2,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 9,
                    width: playerSpriteWidth,
                  },
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 10,
                    width: playerSpriteWidth,
                  },
                ],
                id: "jump-right",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 28,
                    width: playerSpriteWidth,
                  },
                ],
                id: "land-left",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 11,
                    width: playerSpriteWidth,
                  },
                ],
                id: "land-right",
              },
              {
                frames: [
                  {
                    duration: punchAfterDuration / 3,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 21,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: punchAfterDuration / 3,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth,
                    sourceY: playerSpriteHeight * 21,
                    width: playerSpriteWidth,
                  },
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 2,
                    sourceY: playerSpriteHeight * 21,
                    width: playerSpriteWidth,
                  },
                ],
                id: "punch-left-right",
              },
              {
                frames: [
                  {
                    duration: punchAfterDuration / 3,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 22,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: punchAfterDuration / 3,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth,
                    sourceY: playerSpriteHeight * 22,
                    width: playerSpriteWidth,
                  },
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 2,
                    sourceY: playerSpriteHeight * 22,
                    width: playerSpriteWidth,
                  },
                ],
                id: "punch-left-left",
              },
              {
                frames: [
                  {
                    duration: punchAfterDuration / 3,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 5,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: punchAfterDuration / 3,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth,
                    sourceY: playerSpriteHeight * 5,
                    width: playerSpriteWidth,
                  },
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 2,
                    sourceY: playerSpriteHeight * 5,
                    width: playerSpriteWidth,
                  },
                ],
                id: "punch-right-right",
              },
              {
                frames: [
                  {
                    duration: punchAfterDuration / 3,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 4,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: punchAfterDuration / 3,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth,
                    sourceY: playerSpriteHeight * 4,
                    width: playerSpriteWidth,
                  },
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 2,
                    sourceY: playerSpriteHeight * 4,
                    width: playerSpriteWidth,
                  },
                ],
                id: "punch-right-left",
              },
              {
                frames: [
                  {
                    duration: punchAfterDuration / 3,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 30,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: punchAfterDuration / 3,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth,
                    sourceY: playerSpriteHeight * 30,
                    width: playerSpriteWidth,
                  },
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 2,
                    sourceY: playerSpriteHeight * 30,
                    width: playerSpriteWidth,
                  },
                ],
                id: "jump-punch-left-right",
              },
              {
                frames: [
                  {
                    duration: punchAfterDuration / 3,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 31,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: punchAfterDuration / 3,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth,
                    sourceY: playerSpriteHeight * 31,
                    width: playerSpriteWidth,
                  },
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 2,
                    sourceY: playerSpriteHeight * 31,
                    width: playerSpriteWidth,
                  },
                ],
                id: "jump-punch-left-left",
              },
              {
                frames: [
                  {
                    duration: punchAfterDuration / 3,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 13,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: punchAfterDuration / 3,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth,
                    sourceY: playerSpriteHeight * 13,
                    width: playerSpriteWidth,
                  },
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 2,
                    sourceY: playerSpriteHeight * 13,
                    width: playerSpriteWidth,
                  },
                ],
                id: "jump-punch-right-right",
              },
              {
                frames: [
                  {
                    duration: punchAfterDuration / 3,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 14,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: punchAfterDuration / 3,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth,
                    sourceY: playerSpriteHeight * 14,
                    width: playerSpriteWidth,
                  },
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 2,
                    sourceY: playerSpriteHeight * 14,
                    width: playerSpriteWidth,
                  },
                ],
                id: "jump-punch-right-left",
              },
              {
                frames: [
                  {
                    duration: kickAfterDuration / 3,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 24,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: kickAfterDuration / 3,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth,
                    sourceY: playerSpriteHeight * 24,
                    width: playerSpriteWidth,
                  },
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 2,
                    sourceY: playerSpriteHeight * 24,
                    width: playerSpriteWidth,
                  },
                ],
                id: "kick-left",
              },
              {
                frames: [
                  {
                    duration: kickAfterDuration / 3,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 7,
                    width: playerSpriteWidth,
                  },
                  {
                    duration: kickAfterDuration / 3,
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth,
                    sourceY: playerSpriteHeight * 7,
                    width: playerSpriteWidth,
                  },
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth * 2,
                    sourceY: playerSpriteHeight * 7,
                    width: playerSpriteWidth,
                  },
                ],
                id: "kick-right",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 23,
                    width: playerSpriteWidth,
                  },
                ],
                id: "charge-punch-left",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 6,
                    width: playerSpriteWidth,
                  },
                ],
                id: "charge-punch-right",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 26,
                    width: playerSpriteWidth,
                  },
                ],
                id: "charge-jump-punch-left",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 9,
                    width: playerSpriteWidth,
                  },
                ],
                id: "charge-jump-punch-right",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 23,
                    width: playerSpriteWidth,
                  },
                ],
                id: "charge-kick-left",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 6,
                    width: playerSpriteWidth,
                  },
                ],
                id: "charge-kick-right",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth,
                    sourceY: playerSpriteHeight * 33,
                    width: playerSpriteWidth,
                  },
                ],
                id: "stunned-left",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: playerSpriteWidth,
                    sourceY: playerSpriteHeight * 16,
                    width: playerSpriteWidth,
                  },
                ],
                id: "stunned-right",
              },
            ],
            imagePath: "player",
          }),
          x: (): number => {
            switch (state.values.facingDirection) {
              case XDirection.Left:
                return -34;
              case XDirection.Right:
                return -17;
            }
          },
          y: (): number => {
            const baseOffset: number =
              -playerSpriteHeight + entityHitboxHeight + 7;
            if (isPlayerJumping()) {
              if (state.values.jumpedAt === null) {
                throw new Error("Player is jumping but jumpedAt is null");
              }
              const x: number =
                (getCurrentTime() - state.values.jumpedAt) / (jumpDuration / 2);
              return (
                baseOffset - Math.floor(jumpHeight * (1 - Math.pow(x - 1, 2)))
              );
            }
            return baseOffset;
          },
        },
      ],
      type: "player",
      width: playerHitboxWidth,
    }),
  });
};
