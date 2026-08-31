import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";
import { PlayLevelsScreenView } from "./PlayLevelsScreenView.ts";

/**
 * PlayLevelsScreenController - Handles Play Levels interactions
 */
export class PlayLevelsScreenController extends ScreenController {
	private view: PlayLevelsScreenView;
	private screenSwitcher: ScreenSwitcher;

	constructor(screenSwitcher: ScreenSwitcher) {
		super();
		this.screenSwitcher = screenSwitcher;
		this.view = new PlayLevelsScreenView((level) => this.handleStartClick(level));
	}

	/**
	 * Handle start button click
	 */
	private handleStartClick(level:string): void {
		// TODO: edit type: to be the proper level
		if (level === "WW1") {
		this.screenSwitcher.switchToScreen({ type: "playWW1"});
		} else if (level === "WW2") {
		this.screenSwitcher.switchToScreen({ type: "playWW2"});
        } else if (level === "BackButton") {
		this.screenSwitcher.switchToScreen({ type: "modeSelect"});
		} else {
		console.warn("Unknown level:");
		}
	}

	/**
	 * Get the view
	 */
	getView(): PlayLevelsScreenView {
		return this.view;
	}
}