import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";
import { LearnLevelsScreenView } from "./LearnLevelsScreenView.ts";

/**
 * LearnLevelsScreenController - Handles Learn Levels interactions
 */
export class LearnLevelsScreenController extends ScreenController {
    private view: LearnLevelsScreenView;
    private screenSwitcher: ScreenSwitcher;

    constructor(screenSwitcher: ScreenSwitcher) {
        super();
        this.screenSwitcher = screenSwitcher;
        this.view = new LearnLevelsScreenView((level) => this.handleStartClick(level));
    }

    /**
     * Handle start button click
     */
    private handleStartClick(level:string): void {
        // TODO: edit type: to be the proper level
        if (level === "WW1") {
        this.screenSwitcher.switchToScreen({ type: "learnWW1"});
        } else if (level === "WW2") {
        this.screenSwitcher.switchToScreen({ type: "learnWW2"});
        } else if (level === "BackButton") {
        this.screenSwitcher.switchToScreen({ type: "modeSelect"});
        } else {
        console.warn("Unknown level:");
        }
    }

    /**
     * Get the view
     */
    getView(): LearnLevelsScreenView {
        return this.view;
    }
}