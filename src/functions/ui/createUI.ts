import {
  CreateLabelOptionsText,
  createLabel,
  createQuadrilateral,
  getGameWidth,
} from "pixel-pigeon";
import { state } from "../../state";

export const createUI = (): void => {
  const height: number = 11;
  const width: number = 88;
  const x: number = getGameWidth() - width - 2;
  const y: number = 2;
  createQuadrilateral({
    color: "#000000",
    coordinates: {
      x,
      y,
    },
    height,
    opacity: 0.8,
    width,
  });
  createLabel({
    color: "#ffffff",
    coordinates: {
      x: x + 2,
      y: y + 2,
    },
    horizontalAlignment: "left",
    text: {
      value: "Power level:",
    },
  });
  createLabel({
    color: "#ffffff",
    coordinates: {
      x: x + width - 2,
      y: y + 2,
    },
    horizontalAlignment: "right",
    text: (): CreateLabelOptionsText => ({
      value: String(state.values.power),
    }),
  });
};
