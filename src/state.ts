import { ComboDirection } from "./types/ComboDirection";
import { Destructible } from "./types/Destructible";
import { Hadouken } from "./types/Hadouken";
import { HighKick } from "./types/HighKick";
import { Kick } from "./types/Kick";
import { Punch } from "./types/Punch";
import { State } from "pixel-pigeon";
import { XDirection, YDirection } from "./types/Direction";
import { playerMaxHP } from "./constants";

interface StateSchema {
  comboDirectionSequence: (XDirection | YDirection)[];
  defeatAdvancedAt: number | null;
  destructible: Destructible | null;
  facingDirection: XDirection;
  enemiesStartedAt: number | null;
  gameEndedAt: number | null;
  gameStartedAt: number | null;
  jumpedAt: number | null;
  lastComboDirection: ComboDirection | null;
  lastEnemyDirection: XDirection | null;
  movingXDirection: XDirection | null;
  movingYDirection: YDirection | null;
  playerEntityID: string | null;
  playerHP: number;
  playerHadouken: Hadouken | null;
  playerHighKick: HighKick | null;
  playerKick: Kick | null;
  playerPunch: Punch | null;
  playerStunDuration: number | null;
  playerTookDamageAt: number | null;
  power: number;
  spawnedEnemyAt: number | null;
  titleAdvancedAt: number | null;
  titleStartedAt: number | null;
  unlockDisplayedAt: number | null;
}

export const state: State<StateSchema> = new State<StateSchema>({
  comboDirectionSequence: [],
  defeatAdvancedAt: null,
  destructible: null,
  enemiesStartedAt: null,
  facingDirection: XDirection.Right,
  gameEndedAt: null,
  gameStartedAt: null,
  jumpedAt: null,
  lastComboDirection: null,
  lastEnemyDirection: null,
  movingXDirection: null,
  movingYDirection: null,
  playerEntityID: null,
  playerHP: playerMaxHP,
  playerHadouken: null,
  playerHighKick: null,
  playerKick: null,
  playerPunch: null,
  playerStunDuration: null,
  playerTookDamageAt: null,
  power: 0,
  spawnedEnemyAt: null,
  titleAdvancedAt: null,
  titleStartedAt: null,
  unlockDisplayedAt: null,
});
