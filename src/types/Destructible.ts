export interface Destructible {
  readonly entityID: string;
  hp: number;
  tookDamageAt: number | null;
}
