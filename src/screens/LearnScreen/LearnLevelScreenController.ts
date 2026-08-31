import { ScreenController } from "../../types.ts";
import type { ScreenSwitcher, View } from "../../types.ts";
import { LearnWW2ScreenView, LearnWW1ScreenView } from "./LearnLevelScreenView.ts";
/**This is where all the controllers for the main screens for all learn levels can be found
 * - Controls what screen each zoom leads to
 */
export class LearnScreenController<T extends View> extends ScreenController {
  private view: T;
  private screenSwitcher: ScreenSwitcher;

  constructor(
    screenSwitcher: ScreenSwitcher,
    ViewClass: new (onClick: (lvl: string) => void) => T,
    handleClick: (level: string, switcher: ScreenSwitcher) => void 
  ) {
    super();
    this.screenSwitcher = screenSwitcher;
    this.view = new ViewClass((lvl) => handleClick(lvl, this.screenSwitcher));
  }

  getView() {
    return this.view;
  }
}

// WW1 Controller
export const LearnWW1Controller = (switcher: ScreenSwitcher) =>
  new LearnScreenController(
    switcher,
    LearnWW1ScreenView,
    (level, switcher) => {
      switch (level) {
        case "BackButton":
          switcher.switchToScreen({ type: "learnLevels" });
          break;
        case "ZoomEurope":
          switcher.switchToScreen({ type: "zoomEuropelearnWW1" });
          break;
        case "ZoomAsia":
          switcher.switchToScreen({ type: "zoomAsialearnWW1" });
          break;
        case "ZoomAmerica":
          switcher.switchToScreen({ type: "zoomAmericalearnWW1" });
          break;
        default:
          console.warn("Unknown level:", level);
      }
    }
  );

// WW2 Controller
export const LearnWW2Controller = (switcher: ScreenSwitcher) =>
  new LearnScreenController(
    switcher,
    LearnWW2ScreenView,
    (level, switcher) => {
      switch (level) {
        case "BackButton":
          switcher.switchToScreen({ type: "learnLevels" });
          break;
        case "ZoomEurope":
          switcher.switchToScreen({ type: "zoomEuropelearnWW2" });
          break;
        case "ZoomAsia_ME":
          switcher.switchToScreen({ type: "zoomAsia_MElearnWW2" });
          break;
        case "ZoomNorthAmerica":
          switcher.switchToScreen({ type: "zoomNorthAmericalearnWW2" });
          break;
        default:
          console.warn("Unknown level:", level);
      }
    }
  );
