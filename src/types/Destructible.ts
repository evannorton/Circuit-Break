import { XDirection } from "./Direction";

export interface Destructible {
  readonly batteryEntityID: string;
  readonly baseEntityID: string;
  readonly createdAt: number;
  damageDirection: XDirection | null;
  hp: number;
  stunDuration: number | null;
  tookDamageAt: number | null;
}
