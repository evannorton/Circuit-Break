import { Destructible } from "./types/Destructible";
import { Punch } from "./types/Punch";
import { State } from "pixel-pigeon";
import { XDirection, YDirection } from "./types/Direction";

interface StateSchema {
  destructible: Destructible | null;
  facingDirection: XDirection;
  jumpedAt: number | null;
  movingXDirection: XDirection | null;
  movingYDirection: YDirection | null;
  playerEntityID: string | null;
  power: number;
  punch: Punch | null;
}

export const state: State<StateSchema> = new State<StateSchema>({
  destructible: null,
  facingDirection: XDirection.Right,
  jumpedAt: null,
  movingXDirection: null,
  movingYDirection: null,
  playerEntityID: null,
  power: 0,
  punch: null,
});
