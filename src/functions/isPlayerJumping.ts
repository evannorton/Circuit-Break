import { getCurrentTime } from "pixel-pigeon";
import { state } from "../state";
import { jumpDuration } from "../constants";

export const isPlayerJumping = (): boolean =>state.values.jumpedAt !== null && getCurrentTime() - state.values.jumpedAt < jumpDuration