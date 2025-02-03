export enum PowerLevelType {
  Ability = "ability",
  Health = "health",
}
export interface PowerLevel {
  amount: number;
  unlockImagePath: string;
  type: PowerLevelType;
}
