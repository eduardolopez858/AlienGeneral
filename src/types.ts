import type { Group } from "konva/lib/Group";

export interface View {
	getGroup(): Group;
	show(): void;
	hide(): void;
}

/**
 * Screen types for navigation
 *
 */
export type Screen =
	| { type: "title" }
	| { type: "modeSelect" }

	// Play Mode
	| { type: "playLevels" }
	| { type: "playWW1" }
	| { type: "playWW2" }

	// 🔹 New Play WW1 internal screens
	| { type: "playWW1Dialogue" }
	| { type: "playWW1FullMap" }
	| { type: "playWW1ZoomOE" }
	| { type: "playWW1ZoomUS" }
	| { type: "playWW1ZoomEurope" }
	| { type: "playWW1ZoomRussia" }
	| { type: "playWW1Summary" }

	// Play WW2 internal screens
	| { type: "playWW2Dialogue" }
	| { type: "playWW2FullMap" }
	| { type: "playWW2ZoomAmerica" }
	| { type: "playWW2ZoomEurope" }
	| { type: "playWW2ZoomAsia" }
	| { type: "playWW2Summary" }

	// Learn Mode
	| { type: "learnLevels" }
	| { type: "learnWW1" }
	| { type: "learnWW2" }

	// Learn WW1 zooms
	| { type: "zoomEuropelearnWW1" }
	| { type: "zoomAmericalearnWW1" }
	| { type: "zoomAsialearnWW1" }

	// Learn WW2 zooms
	| { type: "zoomEuropelearnWW2" }
	| { type: "zoomNorthAmericalearnWW2" }
	| { type: "zoomAsia_MElearnWW2" }

	// Mini Game 1
	| { type: "dodgeGame" }
	| { type: "abductionGameWW1" }
	| { type: "abductionGameWW2" };


export abstract class ScreenController {
	abstract getView(): View;

	show(): void {
		this.getView().show();
	}

	hide(): void {
		this.getView().hide();
	}
}

export interface ScreenSwitcher {
	switchToScreen(screen: Screen): void;
}

export interface CoordinateMarkings {
  [key: string]: number[]; // Keys are strings, values are arrays of numbers
}