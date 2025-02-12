import { ComboDirection } from "./types/ComboDirection";
import { Destructible } from "./types/Destructible";
import { Hadouken } from "./types/Hadouken";
import { HighKick } from "./types/HighKick";
import { Kick } from "./types/Kick";
import { Punch } from "./types/Punch";
import { State } from "pixel-pigeon";
import { XDirection, YDirection } from "./types/Direction";
import { playerStartMaxHP } from "./constants";

export interface StateSchema {
  comboDirectionSequence: (XDirection | YDirection)[];
  defeatAdvancedAt: number | null;
  destructible: Destructible | null;
  didWin: boolean;
  facingDirection: XDirection;
  finalWaveBaseEnemySpawnedAt: number | null;
  finalWaveBossEnemySpawnedAt: number | null;
  finalWaveFlyingEnemySpawnedAt: number | null;
  finalWaveShootingEnemySpawnedAt: number | null;
  firstWaveClearedAt: number | null;
  enemiesStartedAt: number | null;
  gameEndedAt: number | null;
  gameStartedAt: number | null;
  isPlayerKilled: boolean;
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
  playerMaxHP: number;
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
  didWin: false,
  enemiesStartedAt: null,
  facingDirection: XDirection.Right,
  finalWaveBaseEnemySpawnedAt: null,
  finalWaveBossEnemySpawnedAt: null,
  finalWaveFlyingEnemySpawnedAt: null,
  finalWaveShootingEnemySpawnedAt: null,
  firstWaveClearedAt: null,
  gameEndedAt: null,
  gameStartedAt: null,
  isPlayerKilled: false,
  jumpedAt: null,
  lastComboDirection: null,
  lastEnemyDirection: null,
  movingXDirection: null,
  movingYDirection: null,
  playerEntityID: null,
  playerHP: playerStartMaxHP,
  playerHadouken: null,
  playerHighKick: null,
  playerKick: null,
  playerMaxHP: playerStartMaxHP,
  playerPunch: null,
  playerStunDuration: null,
  playerTookDamageAt: null,
  power: 0,
  spawnedEnemyAt: null,
  titleAdvancedAt: null,
  titleStartedAt: null,
  unlockDisplayedAt: null,
});
