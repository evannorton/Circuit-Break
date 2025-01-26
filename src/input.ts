import {
  NumLock,
  createInputCollection,
  createInputPressHandler,
  createInputTickHandler,
  getCurrentTime,
} from "pixel-pigeon";
import { XDirection, YDirection } from "./types/Direction";
import { isPlayerJumping } from "./functions/isPlayerJumping";
import { state } from "./state";

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
  gamepadButtons: [0, 3],
  keyboardButtons: [{ value: "KeyZ" }],
  name: "Jump",
});
createInputPressHandler({
  condition: (): boolean => isPlayerJumping() === false,
  inputCollectionID: jumpInputCollectionID,
  onInput: (): void => {
    state.setValues({
      jumpedAt: getCurrentTime(),
    });
  },
});
