import {
  EntityPosition,
  getEntityIDs,
  getEntityPosition,
  removeEntity,
  setEntityZIndex,
} from "pixel-pigeon";
import { isPlayerPunching } from "./functions/isPlayerPunching";
import { levelID } from "./constants";
import { movePlayer } from "./functions/movePlayer";
import { state } from "./state";

export const tick = (): void => {
  if (state.values.punch !== null && state.values.punch.entityID !== null) {
    removeEntity(state.values.punch.entityID);
    state.values.punch.entityID = null;
  }
  if (isPlayerPunching() === false) {
    movePlayer();
  }
  [
    ...getEntityIDs({
      layerIDs: ["Characters"],
      levelIDs: [levelID],
    }),
  ]
    .sort((a: string, b: string): number => {
      const aPosition: EntityPosition = getEntityPosition(a);
      const bPosition: EntityPosition = getEntityPosition(b);
      if (aPosition.y < bPosition.y) {
        return -1;
      }
      if (aPosition.y > bPosition.y) {
        return 1;
      }
      return 0;
    })
    .forEach((entityID: string, entityIndex: number): void => {
      setEntityZIndex(entityID, entityIndex);
    });
};
