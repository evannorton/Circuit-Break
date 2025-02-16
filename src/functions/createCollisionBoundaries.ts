import { createEntity, createQuadrilateral, getGameWidth } from "pixel-pigeon";
import {
  entityHitboxHeight,
  levelID,
  maxY,
  minY,
  renderHitboxes,
} from "../constants";

export const createCollisionBoundaries = (): void => {
  const boundaryWidth: number = getGameWidth();
  const topBoundaryY: number = minY - 1 - entityHitboxHeight;
  const bottomBoundaryY: number = maxY + 1;
  createEntity({
    height: 1,
    layerID: "Boundaries",
    levelID,
    position: {
      x: 0,
      y: topBoundaryY,
    },
    quadrilaterals: renderHitboxes
      ? [
          {
            quadrilateralID: createQuadrilateral({
              color: "#8cd612",
              height: 1,
              width: boundaryWidth,
            }),
          },
        ]
      : undefined,
    type: "boundary",
    width: boundaryWidth,
  });
  createEntity({
    height: 1,
    layerID: "Boundaries",
    levelID,
    position: {
      x: 0,
      y: bottomBoundaryY,
    },
    quadrilaterals: renderHitboxes
      ? [
          {
            quadrilateralID: createQuadrilateral({
              color: "#8cd612",
              height: 1,
              width: boundaryWidth,
            }),
          },
        ]
      : undefined,
    type: "boundary",
    width: boundaryWidth,
  });
};
