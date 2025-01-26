import { XDirection, YDirection } from "./types/Direction";
import { getInputTickHandlerGroupID, moveEntity } from "pixel-pigeon";
import {
  movementXInputTickHandlerID,
  movementYInputTickHandlerID,
} from "./input";
import { playerMovementXSpeed, playerMovementYSpeed } from "./constants";
import { state } from "./state";

export const tick = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error(
      "An attempt was made to move the player with no player entity",
    );
  }
  const xDirection: XDirection | null = getInputTickHandlerGroupID<XDirection>(
    movementXInputTickHandlerID,
  );
  const yDirection: YDirection | null = getInputTickHandlerGroupID<YDirection>(
    movementYInputTickHandlerID,
  );
  const xVelocity: number =
    xDirection === XDirection.Left
      ? -playerMovementXSpeed
      : xDirection === XDirection.Right
        ? playerMovementXSpeed
        : 0;
  const yVelocity: number =
    yDirection === YDirection.Up
      ? -playerMovementYSpeed
      : yDirection === YDirection.Down
        ? playerMovementYSpeed
        : 0;
  if (xVelocity > 0) {
    state.setValues({
      direction: XDirection.Right,
    });
  }
  if (xVelocity < 0) {
    state.setValues({
      direction: XDirection.Left,
    });
  }
  moveEntity(state.values.playerEntityID, {
    xVelocity,
    yVelocity,
  });
};
