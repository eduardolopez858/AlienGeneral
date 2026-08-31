import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";
import type { View } from "../../../types.ts";

import {
  ZoomEuropeLearnWW2ScreenView,
  ZoomNorthAmericaLearnWW2ScreenView,
  ZoomAsia_MELearnWW2ScreenView,
} from "./ZoomLearnWW2ScreenView.ts";

/**
 * Controller file for any zoom screen of our WW2 level.
 */
export class ZoomLearnWW2ScreenController<T extends View> extends ScreenController {
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
      this.screenSwitcher.switchToScreen({ type: "learnWW2" });
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
  new ZoomLearnWW2ScreenController(screenSwitcher, ZoomEuropeLearnWW2ScreenView);

export const NorthAmericaController = (screenSwitcher: ScreenSwitcher) =>
  new ZoomLearnWW2ScreenController(screenSwitcher, ZoomNorthAmericaLearnWW2ScreenView);

export const Asia_MEController = (screenSwitcher: ScreenSwitcher) =>
  new ZoomLearnWW2ScreenController(screenSwitcher, ZoomAsia_MELearnWW2ScreenView);
