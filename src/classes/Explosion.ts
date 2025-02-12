import { Definable } from "definables";
import {
  EntityPosition,
  createEntity,
  createSprite,
  getCurrentTime,
  removeEntity,
} from "pixel-pigeon";
import {
  explosionDuration,
  explosionFramesCount,
  explosionSpriteHeight,
  explosionSpriteWidth,
  levelID,
} from "../constants";

export interface ExplosionOptions {
  position: EntityPosition;
}
export class Explosion extends Definable {
  public readonly createdAt: number = getCurrentTime();
  public constructor(options: ExplosionOptions) {
    const entityID: string = createEntity({
      height: 0,
      layerID: "Explosions",
      levelID,
      position: options.position,
      sprites: [
        {
          spriteID: createSprite({
            animationID: "default",
            animations: [
              {
                frames: [
                  {
                    duration: explosionDuration / explosionFramesCount,
                    height: explosionSpriteHeight,
                    sourceHeight: explosionSpriteHeight,
                    sourceWidth: explosionSpriteWidth,
                    sourceX: 0,
                    sourceY: 0,
                    width: explosionSpriteWidth,
                  },
                  {
                    duration: explosionDuration / explosionFramesCount,
                    height: explosionSpriteHeight,
                    sourceHeight: explosionSpriteHeight,
                    sourceWidth: explosionSpriteWidth,
                    sourceX: explosionSpriteWidth,
                    sourceY: 0,
                    width: explosionSpriteWidth,
                  },
                  {
                    duration: explosionDuration / explosionFramesCount,
                    height: explosionSpriteHeight,
                    sourceHeight: explosionSpriteHeight,
                    sourceWidth: explosionSpriteWidth,
                    sourceX: explosionSpriteWidth * 2,
                    sourceY: 0,
                    width: explosionSpriteWidth,
                  },
                  {
                    duration: explosionDuration / explosionFramesCount,
                    height: explosionSpriteHeight,
                    sourceHeight: explosionSpriteHeight,
                    sourceWidth: explosionSpriteWidth,
                    sourceX: explosionSpriteWidth * 3,
                    sourceY: 0,
                    width: explosionSpriteWidth,
                  },
                  {
                    duration: explosionDuration / explosionFramesCount,
                    height: explosionSpriteHeight,
                    sourceHeight: explosionSpriteHeight,
                    sourceWidth: explosionSpriteWidth,
                    sourceX: explosionSpriteWidth * 4,
                    sourceY: 0,
                    width: explosionSpriteWidth,
                  },
                  {
                    height: explosionSpriteHeight,
                    sourceHeight: explosionSpriteHeight,
                    sourceWidth: explosionSpriteWidth,
                    sourceX: explosionSpriteWidth * 5,
                    sourceY: 0,
                    width: explosionSpriteWidth,
                  },
                ],
                id: "default",
              },
            ],
            imagePath: "explosion",
          }),
        },
      ],
      width: 0,
    });
    super(entityID);
  }

  public remove(): void {
    super.remove();
    removeEntity(this._id);
  }
}
