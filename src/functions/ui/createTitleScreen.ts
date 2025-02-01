import {
  CreateSpriteOptionsAnimationFrame,
  createButton,
  createInputPressHandler,
  createQuadrilateral,
  createSprite,
  getCurrentTime,
  getGameHeight,
  getGameWidth,
} from "pixel-pigeon";
import { startInputCollectionID } from "../../input";
import { state } from "../../state";
import { titleFadeDuration } from "../../constants";

export const createTitleScreen = (): void => {
  const width: number = getGameWidth();
  const height: number = getGameHeight();
  const nothingDuration: number = 500;
  const logoDuration: number = 2000;
  const buttonSlideDuration: number = 500;
  const opacity = (): number => {
    if (state.values.titleAdvancedAt === null) {
      return 1;
    }
    const time: number = getCurrentTime() - state.values.titleAdvancedAt;
    return 1 - Math.min(time / (titleFadeDuration * 0.875), 1);
  };
  // Solid color
  createQuadrilateral({
    color: "#A675FE",
    coordinates: {
      condition: (): boolean => state.values.gameStartedAt === null,
      x: 0,
      y: 0,
    },
    height,
    width,
  });
  // Pattern
  const patternWidth: number = 160;
  const patternHeight: number = 164;
  const frameDuration: number = 50;
  for (let x: number = 0; x < 4; x++) {
    for (let y: number = 0; y < 3; y++) {
      createSprite({
        animationID: "default",
        animations: [
          {
            frames: [
              {
                height: patternHeight,
                sourceHeight: patternHeight,
                sourceWidth: patternWidth,
                sourceX: 0,
                sourceY: 0,
                width: patternWidth,
              },
            ],
            id: "default",
          },
        ],
        coordinates: {
          condition: (): boolean => state.values.gameStartedAt === null,
          x: (): number =>
            Math.floor(
              (getCurrentTime() % (patternWidth * frameDuration)) /
                frameDuration,
            ) +
            patternWidth * x -
            patternWidth,
          y: (): number =>
            Math.floor(
              (getCurrentTime() % (patternHeight * frameDuration)) /
                frameDuration,
            ) +
            patternHeight * y -
            patternHeight,
        },
        imagePath: "title/pattern",
        opacity,
      });
    }
  }
  // Character
  const characterSlideDuration: number = 500;
  const characterFrameCount: number = 8;
  const characterBreakDuration: number = 3500;
  const characterFrames: CreateSpriteOptionsAnimationFrame[] = [];
  const shakeOffsets: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 2],
    [-1, 2],
    [-1, 1],
    [-1, 0],
    [0, 0],
    [1, 0],
  ];
  const shakeDuration: number = 250;
  for (let i: number = 0; i < characterFrameCount; i++) {
    characterFrames.push({
      duration: i === 0 ? characterBreakDuration : 25,
      height,
      sourceHeight: height,
      sourceWidth: width,
      sourceX: width * i,
      sourceY: 0,
      width,
    });
  }
  createSprite({
    animationID: "default",
    animations: [
      {
        frames: characterFrames,
        id: "default",
      },
    ],
    coordinates: {
      condition: (): boolean => state.values.gameStartedAt === null,
      x: (): number => {
        if (state.values.titleStartedAt === null) {
          throw new Error(
            "An attempt was made to render the title screen character without a start time",
          );
        }
        if (state.values.titleAdvancedAt !== null) {
          const percent: number = Math.min(
            (getCurrentTime() - state.values.titleAdvancedAt) / shakeDuration,
            1,
          );
          const index: number = Math.min(
            Math.floor(percent * shakeOffsets.length),
            shakeOffsets.length - 1,
          );
          const offset: [number, number] | undefined = shakeOffsets[index];
          if (typeof offset === "undefined") {
            throw new Error(
              "An attempt was made to shake the character with an invalid offset",
            );
          }
          return offset[0];
        }
        const time: number =
          getCurrentTime() -
          (state.values.titleStartedAt + buttonSlideDuration + logoDuration);
        const percent: number = Math.min(time / characterSlideDuration, 1);
        let total: number = Math.floor(percent * width) + 20;
        if (total > width + 10) {
          const diff: number = total - (width + 10);
          total -= diff * 2;
        }
        return width - total;
      },
      y: (): number => {
        if (state.values.titleAdvancedAt !== null) {
          const percent: number = Math.min(
            (getCurrentTime() - state.values.titleAdvancedAt) / shakeDuration,
            1,
          );
          const index: number = Math.min(
            Math.floor(percent * shakeOffsets.length),
            shakeOffsets.length - 1,
          );
          const offset: [number, number] | undefined = shakeOffsets[index];
          if (typeof offset === "undefined") {
            throw new Error(
              "An attempt was made to shake the character with an invalid offset",
            );
          }
          return offset[1];
        }
        return 0;
      },
    },
    imagePath: "title/character",
    opacity,
  });
  // Logo
  const logoSlideDuration: number = 500;
  createSprite({
    animationID: "default",
    animations: [
      {
        frames: [
          {
            height,
            sourceHeight: height,
            sourceWidth: width,
            sourceX: 0,
            sourceY: 0,
            width,
          },
        ],
        id: "default",
      },
    ],
    coordinates: {
      condition: (): boolean => state.values.gameStartedAt === null,
      x: 0,
      y: (): number => {
        if (state.values.titleStartedAt === null) {
          throw new Error(
            "An attempt was made to render the title screen logo without a start time",
          );
        }
        const time: number =
          getCurrentTime() - (state.values.titleStartedAt + nothingDuration);
        const percent: number = Math.min(time / logoSlideDuration, 1);
        let total: number = Math.floor(percent * height) + 20;
        if (total > height + 10) {
          const diff: number = total - (height + 10);
          total -= diff * 2;
        }
        return height - total;
      },
    },
    imagePath: "title/logo",
    opacity,
  });
  // Button
  const buttonWidth: number = 90;
  const buttonHeight: number = 41;
  createSprite({
    animationID: "default",
    animations: [
      {
        frames: [
          {
            height: buttonHeight,
            sourceHeight: buttonHeight,
            sourceWidth: buttonWidth,
            sourceX: 0,
            sourceY: 0,
            width: buttonWidth,
          },
        ],
        id: "default",
      },
    ],
    coordinates: {
      condition: (): boolean => state.values.gameStartedAt === null,
      x: (): number => {
        if (state.values.titleStartedAt === null) {
          throw new Error(
            "An attempt was made to render the title screen button without a start time",
          );
        }
        const time: number =
          getCurrentTime() -
          (state.values.titleStartedAt +
            characterSlideDuration +
            logoSlideDuration +
            logoDuration +
            nothingDuration);
        const finalX: number = 117;
        const bounceX: number = 10;
        const percent: number = Math.min(time / buttonSlideDuration, 1);
        let total: number = Math.floor(percent * (finalX + bounceX * 2));
        if (total > finalX + bounceX) {
          total -= (total - finalX - bounceX) * 2;
        }
        return total - buttonWidth;
      },
      y: (): number => (state.values.titleAdvancedAt !== null ? 29 : 27),
    },
    imagePath: (): string =>
      state.values.titleAdvancedAt !== null
        ? "title/button-pressed"
        : "title/button",
    opacity,
  });
  createButton({
    coordinates: {
      condition: (): boolean => {
        if (state.values.titleStartedAt === null) {
          throw new Error(
            "An attempt was made to render the title screen button without a start time",
          );
        }
        return (
          state.values.gameStartedAt === null &&
          getCurrentTime() - state.values.titleStartedAt >=
            buttonSlideDuration +
              characterSlideDuration +
              logoSlideDuration +
              logoDuration +
              nothingDuration &&
          state.values.titleAdvancedAt === null
        );
      },
      x: 27,
      y: 27,
    },
    height: buttonHeight,
    onClick: (): void => {
      state.setValues({
        titleAdvancedAt: getCurrentTime(),
      });
    },
    width: buttonWidth,
  });
  // Glass
  createSprite({
    animationID: "default",
    animations: [
      {
        frames: [
          {
            height,
            sourceHeight: height,
            sourceWidth: width,
            sourceX: 0,
            sourceY: 0,
            width,
          },
        ],
        id: "default",
      },
    ],
    coordinates: {
      condition: (): boolean =>
        state.values.gameStartedAt === null &&
        state.values.titleAdvancedAt !== null,
      x: 0,
      y: 0,
    },
    imagePath: "title/glass",
    opacity,
  });
  // Input handler
  createInputPressHandler({
    condition: (): boolean => state.values.gameStartedAt === null,
    inputCollectionID: startInputCollectionID,
    onInput: (): void => {
      state.setValues({
        titleAdvancedAt: getCurrentTime(),
      });
    },
  });
};
