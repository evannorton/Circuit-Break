export interface Destructible {
  readonly createdAt: number;
  readonly entityID: string;
  hp: number;
  tookDamageAt: number | null;
}
