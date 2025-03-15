import { createAchievement } from "pixel-pigeon";

export const allPoweredUpAchievementID: string = createAchievement({
  description: "Reach the maximum power level.",
  id: "all-powered-up",
  imagePath: "achievements/all-powered-up",
  name: "All Powered Up",
  newgroundsMedalID: 83385,
});
export const engagePowerHighKickAchievementID: string = createAchievement({
  description: "Damage  an enemy with the High Kick power.",
  id: "engage-power-high-kick",
  imagePath: "achievements/engage-power-high-kick",
  name: "Engage Power: High Kick",
  newgroundsMedalID: 83395,
});
export const engagePowerXWaveAchievementID: string = createAchievement({
  description: "Damage an enemy with the X-Wave power.",
  id: "engage-power-x-wave",
  imagePath: "achievements/engage-power-x-wave",
  name: "Engage Power: X-Wave",
  newgroundsMedalID: 83396,
});
export const systemsSecuredAchievementID: string = createAchievement({
  description: "Survive the final wave.",
  id: "systems-secured",
  imagePath: "achievements/systems-secured",
  name: "Systems Secured",
  newgroundsMedalID: 83394,
});
export const batterySaverModeAchievementID: string = createAchievement({
  description: "Survive the final wave with the minimum power level.",
  id: "battery-saver-mode",
  imagePath: "achievements/battery-saver-mode",
  name: "Battery Saver Mode",
  newgroundsMedalID: 83393,
});
export const safeModeAchievementID: string = createAchievement({
  description: "Survive the final wave without having taken any damage.",
  id: "safe-mode",
  imagePath: "achievements/safe-mode",
  name: "Safe Mode",
  newgroundsMedalID: 83392,
});
