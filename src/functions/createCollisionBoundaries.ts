import { createEntity, getGameWidth } from "pixel-pigeon";
import { levelID, maxY, minY, playerHeight } from "../constants";

export const createCollisionBoundaries = (): void => {
  createEntity({
    height: 1,
    layerID: "Collision",
    levelID,
    position: {
      x: 0,
      y: minY - 1 - playerHeight,
    },
    type: "boundary",
    width: getGameWidth(),
  });
  createEntity({
    height: 1,
    layerID: "Collision",
    levelID,
    position: {
      x: 0,
      y: maxY + 1,
    },
    type: "boundary",
    width: getGameWidth(),
  });
};
