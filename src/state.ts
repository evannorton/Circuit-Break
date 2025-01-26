import { State } from "pixel-pigeon";
import { XDirection, YDirection } from "./types/Direction";

interface StateSchema {
  facingDirection: XDirection;
  movingXDirection: XDirection | null;
  movingYDirection: YDirection | null;
  playerEntityID: string | null;
}

export const state: State<StateSchema> = new State<StateSchema>({
  facingDirection: XDirection.Right,
  movingXDirection: null,
  movingYDirection: null,
  playerEntityID: null,
});
