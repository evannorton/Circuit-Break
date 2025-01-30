import { Destructible } from "./types/Destructible";
import { Kick } from "./types/Kick";
import { Punch } from "./types/Punch";
import { State } from "pixel-pigeon";
import { XDirection, YDirection } from "./types/Direction";
import { playerMaxHP } from "./constants";

interface StateSchema {
  destructible: Destructible | null;
  facingDirection: XDirection;
  jumpedAt: number | null;
  kick: Kick | null;
  lastEnemyDirection: XDirection | null;
  movingXDirection: XDirection | null;
  movingYDirection: YDirection | null;
  playerEntityID: string | null;
  playerHP: number;
  playerPunch: Punch | null;
  playerTookDamageAt: number | null;
  power: number;
  spawnedEnemyAt: number | null;
}

export const state: State<StateSchema> = new State<StateSchema>({
  destructible: null,
  facingDirection: XDirection.Right,
  jumpedAt: null,
  kick: null,
  lastEnemyDirection: null,
  movingXDirection: null,
  movingYDirection: null,
  playerEntityID: null,
  playerHP: playerMaxHP,
  playerPunch: null,
  playerTookDamageAt: null,
  power: 0,
  spawnedEnemyAt: null,
});
