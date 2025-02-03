import {
  NumLock,
  createInputCollection,
  createInputPressHandler,
  createInputTickHandler,
  getCurrentTime,
  moveEntity,
  playAudioSource,
  takeScreenshot,
} from "pixel-pigeon";
import { PunchHand } from "./types/Punch";
import { XDirection, YDirection } from "./types/Direction";
import { canHighKick } from "./functions/canHighKick";
import { directionComboThreshold } from "./constants";
import { getPowerLevelIndex } from "./functions/getPowerLevelIndex";
import { isGameOngoing } from "./functions/isGameOngoing";
import { isPlayerHadoukening } from "./functions/isPlayerHadoukening";
import { isPlayerHighKicking } from "./functions/isPlayerHighKicking";
import { isPlayerJumping } from "./functions/isPlayerJumping";
import { isPlayerKicking } from "./functions/isPlayerKicking";
import { isPlayerLanding } from "./functions/isPlayerLanding";
import { isPlayerPunching } from "./functions/isPlayerPunching";
import { sfxVolumeChannelID } from "./volumeChannels";
import { state } from "./state";

const screenshotInputCollectionID: string = createInputCollection({
  keyboardButtons: [{ value: "KeyP" }],
  name: "Screenshot",
});

export const startInputCollectionID: string = createInputCollection({
  gamepadButtons: [9],
  keyboardButtons: [{ value: "Space" }, { value: "Enter" }],
  name: "Start / retry",
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
const jumpInputCollectionID: string = createInputCollection({
  gamepadButtons: [0],
  keyboardButtons: [{ value: "KeyZ" }],
  name: "Jump",
});
const punchInputCollectionID: string = createInputCollection({
  gamepadButtons: [2],
  keyboardButtons: [{ value: "KeyX" }],
  name: "Light attack",
});
const kickInputCollectionID: string = createInputCollection({
  gamepadButtons: [3],
  keyboardButtons: [{ value: "KeyC" }],
  name: "Heavy attack",
});
createInputPressHandler({
  inputCollectionID: screenshotInputCollectionID,
  onInput: (): void => {
    takeScreenshot();
  },
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
createInputPressHandler({
  condition: (): boolean =>
    isGameOngoing() &&
    isPlayerJumping() === false &&
    isPlayerLanding() === false &&
    isPlayerPunching() === false &&
    isPlayerKicking() === false &&
    isPlayerHadoukening() === false &&
    isPlayerHighKicking() === false,
  inputCollectionID: jumpInputCollectionID,
  onInput: (): void => {
    playAudioSource("sfx/jump", {
      volumeChannelID: sfxVolumeChannelID,
    });
    state.setValues({
      jumpedAt: getCurrentTime(),
    });
  },
});
createInputPressHandler({
  condition: (): boolean =>
    isGameOngoing() &&
    isPlayerLanding() === false &&
    isPlayerPunching() === false &&
    isPlayerKicking() === false &&
    isPlayerHadoukening() === false &&
    isPlayerHighKicking() === false,
  inputCollectionID: punchInputCollectionID,
  onInput: (): void => {
    if (state.values.playerEntityID === null) {
      throw new Error("An attempt was made to punch with no player entity");
    }
    if (isPlayerJumping()) {
      state.setValues({
        playerPunch: {
          createdAt: getCurrentTime(),
          hand:
            state.values.playerPunch?.hand === PunchHand.Left
              ? PunchHand.Right
              : PunchHand.Left,
          isJumping: true,
          wasExecuted: false,
        },
      });
    } else {
      moveEntity(state.values.playerEntityID, {});
      const powerLevelIndex: number | null = getPowerLevelIndex();
      if (
        state.values.lastComboDirection !== null &&
        getCurrentTime() - state.values.lastComboDirection.pressedAt <
          directionComboThreshold &&
        (powerLevelIndex === null || powerLevelIndex >= 2) &&
        ((state.values.comboDirectionSequence[
          state.values.comboDirectionSequence.length - 2
        ] === YDirection.Down &&
          state.values.comboDirectionSequence[
            state.values.comboDirectionSequence.length - 1
          ] === XDirection.Right) ||
          state.values.comboDirectionSequence[
            state.values.comboDirectionSequence.length - 1
          ] === XDirection.Left)
      ) {
        state.setValues({
          playerHadouken: {
            createdAt: getCurrentTime(),
            wasExecuted: false,
          },
        });
      } else {
        state.setValues({
          playerPunch: {
            createdAt: getCurrentTime(),
            hand:
              state.values.playerPunch?.hand === PunchHand.Left
                ? PunchHand.Right
                : PunchHand.Left,
            isJumping: false,
            wasExecuted: false,
          },
        });
      }
    }
  },
});
createInputPressHandler({
  condition: (): boolean =>
    isGameOngoing() &&
    isPlayerLanding() === false &&
    isPlayerPunching() === false &&
    isPlayerKicking() === false &&
    isPlayerHadoukening() === false &&
    isPlayerHighKicking() === false,
  inputCollectionID: kickInputCollectionID,
  onInput: (): void => {
    if (state.values.playerEntityID === null) {
      throw new Error("An attempt was made to kick with no player entity");
    }
    if (isPlayerJumping()) {
      state.setValues({
        playerKick: {
          createdAt: getCurrentTime(),
          wasExecuted: false,
        },
      });
    } else {
      moveEntity(state.values.playerEntityID, {});
      if (canHighKick()) {
        state.setValues({
          playerHighKick: {
            createdAt: getCurrentTime(),
            wasExecuted: false,
          },
        });
      } else {
        state.setValues({
          playerKick: {
            createdAt: getCurrentTime(),
            wasExecuted: false,
          },
        });
      }
    }
  },
});
createInputPressHandler({
  inputCollectionID: moveLeftInputCollectionID,
  onInput: (): void => {
    const comboDirectionSequence: (XDirection | YDirection)[] =
      state.values.comboDirectionSequence;
    if (
      state.values.lastComboDirection !== null &&
      getCurrentTime() - state.values.lastComboDirection.pressedAt >=
        directionComboThreshold
    ) {
      comboDirectionSequence.length = 0;
    }
    comboDirectionSequence.push(XDirection.Left);
    state.setValues({
      comboDirectionSequence,
      lastComboDirection: {
        direction: XDirection.Left,
        pressedAt: getCurrentTime(),
      },
    });
  },
});
createInputPressHandler({
  inputCollectionID: moveRightInputCollectionID,
  onInput: (): void => {
    const comboDirectionSequence: (XDirection | YDirection)[] =
      state.values.comboDirectionSequence;
    if (
      state.values.lastComboDirection !== null &&
      getCurrentTime() - state.values.lastComboDirection.pressedAt >=
        directionComboThreshold
    ) {
      comboDirectionSequence.length = 0;
    }
    comboDirectionSequence.push(XDirection.Right);
    state.setValues({
      comboDirectionSequence,
      lastComboDirection: {
        direction: XDirection.Right,
        pressedAt: getCurrentTime(),
      },
    });
  },
});
createInputPressHandler({
  inputCollectionID: moveUpInputCollectionID,
  onInput: (): void => {
    const comboDirectionSequence: (XDirection | YDirection)[] =
      state.values.comboDirectionSequence;
    if (
      state.values.lastComboDirection !== null &&
      getCurrentTime() - state.values.lastComboDirection.pressedAt >=
        directionComboThreshold
    ) {
      comboDirectionSequence.length = 0;
    }
    comboDirectionSequence.push(YDirection.Up);
    state.setValues({
      comboDirectionSequence,
      lastComboDirection: {
        direction: YDirection.Up,
        pressedAt: getCurrentTime(),
      },
    });
  },
});
createInputPressHandler({
  inputCollectionID: moveDownInputCollectionID,
  onInput: (): void => {
    const comboDirectionSequence: (XDirection | YDirection)[] =
      state.values.comboDirectionSequence;
    if (
      state.values.lastComboDirection !== null &&
      getCurrentTime() - state.values.lastComboDirection.pressedAt >=
        directionComboThreshold
    ) {
      comboDirectionSequence.length = 0;
    }
    comboDirectionSequence.push(YDirection.Down);
    state.setValues({
      comboDirectionSequence,
      lastComboDirection: {
        direction: YDirection.Down,
        pressedAt: getCurrentTime(),
      },
    });
  },
});
