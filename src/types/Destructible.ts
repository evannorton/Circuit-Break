import { XDirection } from "./Direction";

export interface Destructible {
  readonly batteryEntityID: string;
  readonly baseEntityID: string;
  readonly createdAt: number;
  hp: number;
  tookDamageAt: number | null;
  damageDirection: XDirection | null;
}
