import { XDirection } from "./Direction";

export interface Swoop {
  readonly createdAt: number;
  readonly direction: XDirection;
  wasExecuted: boolean;
}
