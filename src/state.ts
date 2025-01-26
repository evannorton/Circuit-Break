import { State } from "pixel-pigeon";
import { XDirection, YDirection } from "./types/Direction";

interface StateSchema {
  boxEntityID: string | null;
  facingDirection: XDirection;
  jumpedAt: number | null;
  movingXDirection: XDirection | null;
  movingYDirection: YDirection | null;
  playerEntityID: string | null;
  punchedAt: number | null;
}

export const state: State<StateSchema> = new State<StateSchema>({
  boxEntityID: null,
  facingDirection: XDirection.Right,
  jumpedAt: null,
  movingXDirection: null,
  movingYDirection: null,
  playerEntityID: null,
  punchedAt: null,
});
