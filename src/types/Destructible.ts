import { XDirection } from "./Direction";

export interface Destructible {
  readonly createdAt: number;
  readonly entityID: string;
  hp: number;
  tookDamageAt: number | null;
  damageDirection: XDirection | null;
}
