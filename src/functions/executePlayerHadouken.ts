import { XDirection } from "../types/Direction";
import { getCurrentTime } from "pixel-pigeon";
import { hadoukenBeforeDuration } from "../constants";
import { state } from "../state";

export const executePlayerHadouken = (): void => {
  if (state.values.playerEntityID === null) {
    throw new Error(
      "An attempt was made to create a hadouken entity but no player entity exists",
    );
  }
  if (
    state.values.playerHadouken !== null &&
    state.values.playerHadouken.wasExecuted === false &&
    getCurrentTime() - state.values.playerHadouken.createdAt >=
      hadoukenBeforeDuration
  ) {
    switch (state.values.facingDirection) {
      case XDirection.Left:
        console.log("shoot hadouk lef");
        break;
      case XDirection.Right:
        console.log("shoot hadouk right");
        break;
    }
    state.values.playerHadouken.wasExecuted = true;
  }
};
