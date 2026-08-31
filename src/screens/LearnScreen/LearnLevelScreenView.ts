
import { BaseLearnLevelScreenView, type LearnConfig } from "./BaseLearnLevelScreenView";

/**
 * This is where we add the specifics for the main screen for all learn levels
 */

// WW1 Level
const learnWW1Config: LearnConfig = {
  // Game mode
  headerLeft: "LEARN MODE",

  // Game Level
  headerRight: "WORLD WAR 1",

  mapImageSrc: "/WorldWar1Map.png",
  zoomButtons: [
      { level: "ZoomEurope", x: 500, y: 305 },
      { level: "ZoomAsia", x: 650, y: 320 },
      { level: "ZoomAmerica", x: 260, y: 320 },
  ],
};

export class LearnWW1ScreenView extends BaseLearnLevelScreenView {
  constructor(onStartClick: (level: string) => void) {
    super(onStartClick, learnWW1Config);
  }
}

// WW2 Level
const learnWW2Config: LearnConfig = {
  // Game Mode
  headerLeft: "LEARN MODE",
  // Game Level
  headerRight: "WORLD WAR 2",
  mapImageSrc: "/WorldWar2Map.png",
  zoomButtons: [
      { level: "ZoomEurope", x: 490, y: 320 },
      { level: "ZoomAsia_ME", x: 625, y: 370 },
      { level: "ZoomNorthAmerica", x: 280, y: 360 },
  ],
};

export class LearnWW2ScreenView extends BaseLearnLevelScreenView {
  constructor(onStartClick: (level: string) => void) {
    super(onStartClick, learnWW2Config);
  }
}
