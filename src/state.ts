import { State } from "pixel-pigeon";
import { XDirection } from "./types/Direction";

interface StateSchema {
  direction: XDirection;
  playerEntityID: string | null;
}

export const state: State<StateSchema> = new State<StateSchema>({
  direction: XDirection.Right,
  playerEntityID: null,
});
