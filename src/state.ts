import { State } from "pixel-pigeon";
import { XDirection, YDirection } from "./types/Direction";

interface StateSchema {
  facingDirection: XDirection;
  jumpedAt: number | null;
  movingXDirection: XDirection | null;
  movingYDirection: YDirection | null;
  playerEntityID: string | null;
}

export const state: State<StateSchema> = new State<StateSchema>({
  facingDirection: XDirection.Right,
  jumpedAt: null,
  movingXDirection: null,
  movingYDirection: null,
  playerEntityID: null,
});
