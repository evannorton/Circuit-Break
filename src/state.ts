import { Destructible } from "./types/Destructible";
import { Kick } from "./types/Kick";
import { Punch } from "./types/Punch";
import { State } from "pixel-pigeon";
import { XDirection, YDirection } from "./types/Direction";

interface StateSchema {
  destructible: Destructible | null;
  facingDirection: XDirection;
  jumpedAt: number | null;
  kick: Kick | null;
  movingXDirection: XDirection | null;
  movingYDirection: YDirection | null;
  playerEntityID: string | null;
  power: number;
  punch: Punch | null;
  spawnedEnemyAt: number | null;
}

export const state: State<StateSchema> = new State<StateSchema>({
  destructible: null,
  facingDirection: XDirection.Right,
  jumpedAt: null,
  kick: null,
  movingXDirection: null,
  movingYDirection: null,
  playerEntityID: null,
  power: 0,
  punch: null,
  spawnedEnemyAt: null,
});
