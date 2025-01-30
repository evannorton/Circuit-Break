import { Destructible } from "./types/Destructible";
import { Kick } from "./types/Kick";
import { Punch } from "./types/Punch";
import { State } from "pixel-pigeon";
import { XDirection, YDirection } from "./types/Direction";
import { playerMaxHP } from "./constants";

interface StateSchema {
  destructible: Destructible | null;
  facingDirection: XDirection;
  gameEndedAt: number | null;
  gameStartedAt: number | null;
  jumpedAt: number | null;
  lastEnemyDirection: XDirection | null;
  movingXDirection: XDirection | null;
  movingYDirection: YDirection | null;
  playerEntityID: string | null;
  playerHP: number;
  playerKick: Kick | null;
  playerPunch: Punch | null;
  playerStunDuration: number | null;
  playerTookDamageAt: number | null;
  power: number;
  spawnedEnemyAt: number | null;
}

export const state: State<StateSchema> = new State<StateSchema>({
  destructible: null,
  facingDirection: XDirection.Right,
  gameEndedAt: null,
  gameStartedAt: null,
  jumpedAt: null,
  lastEnemyDirection: null,
  movingXDirection: null,
  movingYDirection: null,
  playerEntityID: null,
  playerHP: playerMaxHP,
  playerKick: null,
  playerPunch: null,
  playerStunDuration: null,
  playerTookDamageAt: null,
  power: 0,
  spawnedEnemyAt: null,
});
