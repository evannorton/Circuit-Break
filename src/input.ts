import {
  EntityCollidable,
  EntityPosition,
  NumLock,
  OverlapData,
  createEntity,
  createInputCollection,
  createInputPressHandler,
  createInputTickHandler,
  createQuadrilateral,
  getCurrentTime,
  getEntityPosition,
  moveEntity,
  takeScreenshot,
} from "pixel-pigeon";
import { XDirection, YDirection } from "./types/Direction";
import { createDestructible } from "./functions/createDestructible";
import {
  entityHitboxHeight,
  levelID,
  maxPowerLevel,
  playerHitboxWidth,
  punchHitboxWidth,
  renderHitboxes,
} from "./constants";
import { isPlayerJumping } from "./functions/isPlayerJumping";
import { isPlayerPunching } from "./functions/isPlayerPunching";
import { state } from "./state";

const screenshotInputCollectionID: string = createInputCollection({
  keyboardButtons: [{ value: "KeyP" }],
  name: "Screenshot",
});
createInputPressHandler({
  inputCollectionID: screenshotInputCollectionID,
  onInput: (): void => {
    takeScreenshot();
  },
});
const moveLeftInputCollectionID: string = createInputCollection({
  gamepadButtons: [14],
  keyboardButtons: [
    { value: "ArrowLeft" },
    {
      numLock: NumLock.Without,
      value: "Numpad4",
    },
  ],
  name: "Move left",
});
const moveRightInputCollectionID: string = createInputCollection({
  gamepadButtons: [15],
  keyboardButtons: [
    { value: "ArrowRight" },
    {
      numLock: NumLock.Without,
      value: "Numpad6",
    },
  ],
  name: "Move right",
});
const moveUpInputCollectionID: string = createInputCollection({
  gamepadButtons: [12],
  keyboardButtons: [
    { value: "ArrowUp" },
    {
      numLock: NumLock.Without,
      value: "Numpad8",
    },
  ],
  name: "Move up",
});
const moveDownInputCollectionID: string = createInputCollection({
  gamepadButtons: [13],
  keyboardButtons: [
    { value: "ArrowDown" },
    {
      numLock: NumLock.Without,
      value: "Numpad2",
    },
  ],
  name: "Move down",
});

export const movementXInputTickHandlerID: string =
  createInputTickHandler<XDirection>({
    groups: [
      {
        id: XDirection.Left,
        inputCollectionID: moveLeftInputCollectionID,
      },
      {
        id: XDirection.Right,
        inputCollectionID: moveRightInputCollectionID,
      },
    ],
  });
export const movementYInputTickHandlerID: string =
  createInputTickHandler<YDirection>({
    groups: [
      {
        id: YDirection.Up,
        inputCollectionID: moveUpInputCollectionID,
      },
      {
        id: YDirection.Down,
        inputCollectionID: moveDownInputCollectionID,
      },
    ],
  });
const jumpInputCollectionID: string = createInputCollection({
  gamepadButtons: [0],
  keyboardButtons: [{ value: "KeyZ" }],
  name: "Jump",
});
createInputPressHandler({
  condition: (): boolean =>
    isPlayerJumping() === false && isPlayerPunching() === false,
  inputCollectionID: jumpInputCollectionID,
  onInput: (): void => {
    state.setValues({
      jumpedAt: getCurrentTime(),
    });
  },
});
const punchInputCollectionID: string = createInputCollection({
  gamepadButtons: [2],
  keyboardButtons: [{ value: "KeyX" }],
  name: "Punch",
});
createInputPressHandler({
  condition: (): boolean =>
    isPlayerJumping() === false && isPlayerPunching() === false,
  inputCollectionID: punchInputCollectionID,
  onInput: (): void => {
    if (state.values.playerEntityID === null) {
      throw new Error("An attempt was made to punch with no player entity");
    }
    moveEntity(state.values.playerEntityID, {});
    const playerPosition: EntityPosition = getEntityPosition(
      state.values.playerEntityID,
    );
    let position: EntityPosition | undefined;
    switch (state.values.facingDirection) {
      case XDirection.Left:
        position = {
          x: playerPosition.x - punchHitboxWidth,
          y: playerPosition.y,
        };
        break;
      case XDirection.Right:
        position = {
          x: playerPosition.x + playerHitboxWidth,
          y: playerPosition.y,
        };
        break;
    }
    state.setValues({
      punch: {
        createdAt: getCurrentTime(),
        entityID: createEntity({
          height: entityHitboxHeight,
          layerID: "Projectiles",
          levelID,
          onOverlap: (overlapData: OverlapData): void => {
            const punchedEntityCollidable: EntityCollidable | undefined =
              overlapData.entityCollidables.find(
                (entityCollidable: EntityCollidable): boolean =>
                  entityCollidable.type === "destructible",
              );
            if (typeof punchedEntityCollidable !== "undefined") {
              switch (punchedEntityCollidable.type) {
                case "destructible":
                  if (state.values.destructible === null) {
                    throw new Error(
                      "An attempt was made to punch a destructible but no box exists",
                    );
                  }
                  if (state.values.punch === null) {
                    throw new Error(
                      "An attempt was made to punch a destructible but no punch exists",
                    );
                  }
                  state.values.destructible.hp--;
                  state.values.destructible.tookDamageAt = getCurrentTime();
                  if (state.values.destructible.hp === 0) {
                    state.setValues({
                      power: Math.min(state.values.power + 1, maxPowerLevel),
                    });
                    createDestructible();
                  }
                  break;
              }
            }
          },
          position,
          quadrilaterals: renderHitboxes
            ? [
                {
                  quadrilateralID: createQuadrilateral({
                    color: "#bdffca",
                    height: 1,
                    width: punchHitboxWidth,
                  }),
                },
                {
                  quadrilateralID: createQuadrilateral({
                    color: "#bdffca",
                    height: 1,
                    width: punchHitboxWidth,
                  }),
                  y: entityHitboxHeight - 1,
                },
                {
                  quadrilateralID: createQuadrilateral({
                    color: "#bdffca",
                    height: entityHitboxHeight,
                    width: 1,
                  }),
                },
                {
                  quadrilateralID: createQuadrilateral({
                    color: "#bdffca",
                    height: entityHitboxHeight,
                    width: 1,
                  }),
                  x: punchHitboxWidth - 1,
                },
              ]
            : undefined,
          width: punchHitboxWidth,
        }),
      },
    });
  },
});
