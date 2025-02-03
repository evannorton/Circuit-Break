import {
  createButton,
  createSprite,
  getGameHeight,
  getGameWidth,
  openURL,
} from "pixel-pigeon";
import { state } from "../../state";

interface CreditsEntry {
  height: number;
  width: number;
  x: number;
  y: number;
  url: string;
}

export const createVictoryScreen = (): void => {
  const width: number = getGameWidth();
  const height: number = getGameHeight();
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
        state.values.didWin && state.values.gameEndedAt !== null,
      x: 0,
      y: 0,
    },
    imagePath: "victory",
  });
  const creditsEntries: CreditsEntry[] = [
    {
      height: 18,
      url: "https://evanmmo.com",
      width: 110,
      x: 173,
      y: 2,
    },
    {
      height: 18,
      url: "https://twitter.com/bampikku",
      width: 124,
      x: 1,
      y: 176,
    },
    {
      height: 18,
      url: "https://twitter.com/RyuzachPixel",
      width: 108,
      x: 273,
      y: 173,
    },
    {
      height: 18,
      url: "https://twitter.com/gamekrazzy",
      width: 160,
      x: 221,
      y: 195,
    },
  ];
  for (const creditsEntry of creditsEntries) {
    createButton({
      coordinates: {
        condition: (): boolean =>
          state.values.didWin && state.values.gameEndedAt !== null,
        x: creditsEntry.x,
        y: creditsEntry.y,
      },
      height: creditsEntry.height,
      onClick: (): void => {
        openURL(creditsEntry.url);
      },
      width: creditsEntry.width,
    });
  }
};
