import {
  destructibleRisingFrameDuration,
  destructibleRisingFrames,
} from "../constants";
import { getCurrentTime } from "pixel-pigeon";
import { state } from "../state";

export const isDestructibleRising = (): boolean => {
  if (state.values.destructible === null) {
    throw new Error(
      "An attempt was made to check if a destructible is rising but no box exists",
    );
  }
  return (
    getCurrentTime() - state.values.destructible.createdAt <
    destructibleRisingFrameDuration * destructibleRisingFrames
  );
};
