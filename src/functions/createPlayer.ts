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
  kickBeforeDuration,
  levelID,
  playerHitboxWidth,
  playerSpriteHeight,
  playerSpriteWidth,
  punchBeforeDuration,
  renderHitboxes,
} from "../constants";
import { isPlayerJumping } from "./isPlayerJumping";
import { isPlayerKicking } from "./isPlayerKicking";
import { isPlayerPunching } from "./isPlayerPunching";
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
            animationID: "default",
            animations: [
              {
                frames: [
                  {
                    height: 15,
                    sourceHeight: 15,
                    sourceWidth: 38,
                    sourceX: 0,
                    sourceY: 0,
                    width: 38,
                  },
                ],
                id: "default",
              },
            ],
            imagePath: "shadow",
          }),
          x: -4,
          y: -6,
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
                    if (state.values.kick === null) {
                      throw new Error(
                        "Player is kicking but createdAt is null",
                      );
                    }
                    if (
                      getCurrentTime() - state.values.kick.createdAt <
                      kickBeforeDuration
                    ) {
                      return "charge-kick-left";
                    }
                    return "kick-left";
                  }
                  if (isPlayerPunching()) {
                    if (state.values.punch === null) {
                      throw new Error(
                        "Player is punching but createdAt is null",
                      );
                    }
                    if (
                      getCurrentTime() - state.values.punch.createdAt <
                      punchBeforeDuration
                    ) {
                      return "charge-punch-left";
                    }
                    if (state.values.punch.hand === PunchHand.Left) {
                      return "punch-left-left";
                    }
                    return "punch-left-right";
                  }
                  if (isPlayerJumping()) {
                    return "jump-left";
                  }
                  if (isMoving) {
                    return "walk-left";
                  }
                  return "idle-left";
                case XDirection.Right:
                  if (isPlayerKicking()) {
                    if (state.values.kick === null) {
                      throw new Error(
                        "Player is kicking but createdAt is null",
                      );
                    }
                    if (
                      getCurrentTime() - state.values.kick.createdAt <
                      kickBeforeDuration
                    ) {
                      return "charge-kick-right";
                    }
                    return "kick-right";
                  }
                  if (isPlayerPunching()) {
                    if (state.values.punch === null) {
                      throw new Error(
                        "Player is punching but createdAt is null",
                      );
                    }
                    if (
                      getCurrentTime() - state.values.punch.createdAt <
                      punchBeforeDuration
                    ) {
                      return "charge-punch-right";
                    }
                    if (state.values.punch.hand === PunchHand.Left) {
                      return "punch-right-left";
                    }
                    return "punch-right-right";
                  }
                  if (isPlayerJumping()) {
                    return "jump-right";
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
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 19,
                    width: playerSpriteWidth,
                  },
                ],
                id: "walk-left",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 2,
                    width: playerSpriteWidth,
                  },
                ],
                id: "walk-right",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 29,
                    width: playerSpriteWidth,
                  },
                ],
                id: "jump-left",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 12,
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
                    sourceY: playerSpriteHeight * 21,
                    width: playerSpriteWidth,
                  },
                ],
                id: "punch-left-right",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 22,
                    width: playerSpriteWidth,
                  },
                ],
                id: "punch-left-left",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 5,
                    width: playerSpriteWidth,
                  },
                ],
                id: "punch-right-right",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 4,
                    width: playerSpriteWidth,
                  },
                ],
                id: "punch-right-left",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
                    sourceY: playerSpriteHeight * 24,
                    width: playerSpriteWidth,
                  },
                ],
                id: "kick-left",
              },
              {
                frames: [
                  {
                    height: playerSpriteHeight,
                    sourceHeight: playerSpriteHeight,
                    sourceWidth: playerSpriteWidth,
                    sourceX: 0,
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
              const maxOffset: number = 12;
              const x: number =
                (getCurrentTime() - state.values.jumpedAt) / (jumpDuration / 2);
              return (
                baseOffset - Math.floor(maxOffset * (1 - Math.pow(x - 1, 2)))
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
