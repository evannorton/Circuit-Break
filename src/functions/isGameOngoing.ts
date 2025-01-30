import { state } from "../state";

export const isGameOngoing = (): boolean =>
  state.values.gameStartedAt !== null && state.values.gameEndedAt === null;
