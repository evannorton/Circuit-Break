export enum PunchHand {
  Left = "left",
  Right = "right",
}
export interface Punch {
  readonly createdAt: number;
  readonly hand: PunchHand;
  wasExecuted: boolean;
}
