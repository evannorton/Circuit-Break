import {
  boxHitboxWidth,
  boxSpriteHeight,
  entityHitboxHeight,
  levelID,
  maxY,
  minY,
  renderHitboxes,
} from "../constants";
import {
  createEntity,
  createQuadrilateral,
  createSprite,
  getGameWidth,
} from "pixel-pigeon";
import { state } from "../state";

export const createBox = (): void => {
  const x: number = Math.floor(
    Math.random() * (getGameWidth() - boxHitboxWidth),
  );
  const minBoxY: number = minY;
  const maxBoxY: number = maxY - entityHitboxHeight + 1;
  const y: number = Math.floor(Math.random() * (maxBoxY - minBoxY)) + minBoxY;
  const boxEntityID: string = createEntity({
    height: entityHitboxHeight,
    layerID: "Entities",
    levelID,
    position: {
      x,
      y,
    },
    quadrilaterals: renderHitboxes
      ? [
          {
            quadrilateralID: createQuadrilateral({
              color: "#d59cfc",
              height: 1,
              width: boxHitboxWidth,
            }),
          },
          {
            quadrilateralID: createQuadrilateral({
              color: "#d59cfc",
              height: 1,
              width: boxHitboxWidth,
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
            x: boxHitboxWidth - 1,
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
                  height: boxSpriteHeight,
                  sourceHeight: boxSpriteHeight,
                  sourceWidth: 16,
                  sourceX: 0,
                  sourceY: 0,
                  width: 16,
                },
              ],
              id: "default",
            },
          ],
          imagePath: "box",
        }),
        y: -boxSpriteHeight + entityHitboxHeight,
      },
    ],
    width: 16,
  });
  state.setValues({
    boxEntityID,
  });
};
