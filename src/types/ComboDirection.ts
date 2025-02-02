import { XDirection, YDirection } from "./Direction";

export interface ComboDirection {
  direction: XDirection | YDirection;
  pressedAt: number;
}
