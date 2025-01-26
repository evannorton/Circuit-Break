import {
  XDirection,
  YDirection,
} from "./types/Direction";
import {
  NumLock,
  createInputCollection,
  createInputTickHandler,
} from "pixel-pigeon";

const moveLeftInputCollectionID: string = createInputCollection({
  gamepadButtons: [14],
  keyboardButtons: [
    { value: "ArrowLeft" },
    { value: "KeyA" },
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
    { value: "KeyD" },
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
    { value: "KeyW" },
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
    { value: "KeyS" },
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
