import {
  CreateLabelOptionsText,
  createInputPressHandler,
  createLabel,
  createSprite,
  getGameHeight,
  getGameWidth,
  removeEntity,
} from "pixel-pigeon";
import { Enemy } from "../../classes/Enemy";
import { XDirection } from "../../types/Direction";
import { getDefinables } from "definables";
import { playerMaxHP } from "../../constants";
import { startGame } from "../startGame";
import { startInputCollectionID } from "../../input";
import { state } from "../../state";

export const createGameOverScreen = (): void => {
  const width: number = getGameWidth();
  const height: number = getGameHeight();
  createSprite({
    animationID: "default",
    animations: [
      {
        frames: [
          {
            height,
            sourceHeight: height,
            sourceWidth: width,
            sourceX: 0,
            sourceY: 0,
            width,
          },
        ],
        id: "default",
      },
    ],
    coordinates: {
      condition: (): boolean => state.values.gameEndedAt !== null,
      x: 0,
      y: 0,
    },
    imagePath: "game-over",
  });
  createInputPressHandler({
    condition: (): boolean => state.values.gameEndedAt !== null,
    inputCollectionID: startInputCollectionID,
    onInput: (): void => {
      if (state.values.playerEntityID === null) {
        throw new Error("Player entity ID is null.");
      }
      removeEntity(state.values.playerEntityID);
      if (state.values.destructible !== null) {
        removeEntity(state.values.destructible.batteryEntityID);
        removeEntity(state.values.destructible.baseEntityID);
      }
      state.setValues({
        destructible: null,
        facingDirection: XDirection.Right,
        gameEndedAt: null,
        jumpedAt: null,
        playerKick: null,
        lastEnemyDirection: null,
        movingXDirection: null,
        movingYDirection: null,
        playerEntityID: null,
        playerHP: playerMaxHP,
        playerPunch: null,
        playerTookDamageAt: null,
        power: 0,
        spawnedEnemyAt: null,
      });
      for (const enemy of getDefinables(Enemy).values()) {
        enemy.remove();
      }
      startGame();
    },
  });
  createLabel({
    color: "#ffffff",
    coordinates: {
      condition: (): boolean => state.values.gameEndedAt !== null,
      x: Math.floor(getGameWidth() / 2),
      y: 12,
    },
    horizontalAlignment: "center",
    text: (): CreateLabelOptionsText => {
      if (state.values.gameStartedAt === null) {
        throw new Error("Game started at is null.");
      }
      if (state.values.gameEndedAt === null) {
        throw new Error("Game ended at is null.");
      }
      return {
        value: `You survived ${Math.floor(
          (state.values.gameEndedAt - state.values.gameStartedAt) / 1000,
        )} seconds and collected ${state.values.power} power.`,
      };
    },
  });
};
