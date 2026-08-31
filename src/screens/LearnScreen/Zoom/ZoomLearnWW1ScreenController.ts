import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";
import type { View } from "../../../types.ts";

import {
  ZoomEuropeLearnWW1ScreenView,
  ZoomAmericaLearnWW1ScreenView,
  ZoomAsiaLearnWW1ScreenView,
} from "./ZoomLearnWW1ScreenView.ts";

/**
 * Controller file for any zoom screen of our WW1 level.
 */
export class ZoomLearnWW1ScreenController<T extends View> extends ScreenController {
  private view: T;
  private screenSwitcher: ScreenSwitcher;

  constructor(
    screenSwitcher: ScreenSwitcher,
    ViewClass: new (onStartClick: (level: string) => void) => T
  ) {
    super();
    this.screenSwitcher = screenSwitcher;
    this.view = new ViewClass((level) => this.handleStartClick(level));
  }

  private handleStartClick(level: string): void {
    if (level === "BackButton") {
      this.screenSwitcher.switchToScreen({ type: "learnWW1" });
    } else {
      console.warn("Unknown level", level);
    }
  }

  getView(): T {
    return this.view;
  }
}

/**
 * Creates controllers for each region
 */
export const EuropeController = (screenSwitcher: ScreenSwitcher) =>
  new ZoomLearnWW1ScreenController(screenSwitcher, ZoomEuropeLearnWW1ScreenView);

export const AmericaController = (screenSwitcher: ScreenSwitcher) =>
  new ZoomLearnWW1ScreenController(screenSwitcher, ZoomAmericaLearnWW1ScreenView);

export const AsiaController = (screenSwitcher: ScreenSwitcher) =>
  new ZoomLearnWW1ScreenController(screenSwitcher, ZoomAsiaLearnWW1ScreenView);
