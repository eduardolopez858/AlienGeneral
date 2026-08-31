
import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher, CoordinateMarkings } from "../../../types.ts";

import { PlayWW2Model } from "./PlayWW2Model.ts";
import { PlayWW2ScreenView } from "./PlayWW2ScreenView.ts";
import { PlayWW2FullMapView } from "./PlayWW2FullMapView.ts";
import { PlayWW2ZoomView } from "./PlayWW2ZoomView.ts";
import { PlayWW2SummaryView } from "./PlayWW2SummaryView.ts";

export class PlayWW2ScreenController extends ScreenController {

    private model: PlayWW2Model;

    private dialogueView: PlayWW2ScreenView;
    private fullMapView: PlayWW2FullMapView;

    private zoomAmerica: PlayWW2ZoomView;
    private zoomEurope: PlayWW2ZoomView;
    private zoomAsia: PlayWW2ZoomView;

    private summary: PlayWW2SummaryView;

    private screenSwitcher: ScreenSwitcher;

    private dialogueLineIndex = 0;

    private alienCoordsAmerica: CoordinateMarkings = {
        "United States": [520, 400],
    };

    private alienCoordsEurope: CoordinateMarkings = {
        "Norway": [340, 290],
        "United Kingdom": [260, 370],
        "Poland": [445, 410],
        "France": [305, 455],
        "Germany": [370, 420],
        "Italy": [380, 510],
        "Soviet Union": [600, 370],
    };

    private alienCoordsAsia: CoordinateMarkings = {
        "Soviet Union": [340, 170],
        "China": [540, 280],
        "Japan": [760, 270],
    };

    constructor(screenSwitcher: ScreenSwitcher) {
        super();

        this.screenSwitcher = screenSwitcher;
        this.model = new PlayWW2Model();

        // Views
        this.dialogueView = new PlayWW2ScreenView();
        this.fullMapView = new PlayWW2FullMapView(this.model);

        this.zoomAmerica = new PlayWW2ZoomView(
            "/WorldWar2America.png",
            this.alienCoordsAmerica,
            (country) => this.handleCountryClick(country),
            this.model
        );

        this.zoomEurope = new PlayWW2ZoomView(
            "/WorldWar2Europe.png",
            this.alienCoordsEurope,
            (country) => this.handleCountryClick(country),
            this.model
        );

        this.zoomAsia = new PlayWW2ZoomView(
            "/WorldWar2Asia.png",
            this.alienCoordsAsia,
            (country) => this.handleCountryClick(country),
            this.model
        );

        // --- Dialogue clicks ---
        this.dialogueView.onDialogueClick(() => this.advanceDialogue());

        // --- Full map zoom clicks ---
        this.fullMapView.onZoomClick((target) => {
            if (target === "America") {
                this.screenSwitcher.switchToScreen({ type: "playWW2ZoomAmerica" });
            } else if (target === "Europe") {
                this.screenSwitcher.switchToScreen({ type: "playWW2ZoomEurope" });
            } else if (target === "Asia") {
                this.screenSwitcher.switchToScreen({ type: "playWW2ZoomAsia" });
            }
        });

        // Back buttons -> back to play levels
        const backToLevels = () =>
            this.screenSwitcher.switchToScreen({ type: "playLevels" });
        this.dialogueView.onBackClick(backToLevels);
        this.fullMapView.onBackClick(backToLevels);

        // Back buttons -> back to main map
        const backToMainMap = () =>
            this.screenSwitcher.switchToScreen({ type: "playWW2FullMap" });
        this.zoomAmerica.onBackClick(backToMainMap);
        this.zoomEurope.onBackClick(backToMainMap);
        this.zoomAsia.onBackClick(backToMainMap);

        this.summary = new PlayWW2SummaryView(backToLevels ,() => this.handlePlayAgain(), this.model);
    }

    /** Starts the current stage's dialogue (stage 1, 2, 3, ...) */
    startStage(): void {
        const lines = this.model.getDialogueForStage(this.model.stage);
        this.dialogueLineIndex = 0;

        this.dialogueView.setDialogue(lines[0]);
        this.screenSwitcher.switchToScreen({ type: "playWW2Dialogue" });
    }

    private advanceDialogue(): void {
        const lines = this.model.getDialogueForStage(this.model.stage);

        if (this.dialogueLineIndex < lines.length - 1) {
            this.dialogueLineIndex++;
            this.dialogueView.setDialogue(lines[this.dialogueLineIndex]);
        } else {
            // finished dialogue for this stage -> show full map with zoom icons
            this.screenSwitcher.switchToScreen({ type: "playWW2FullMap" });
        }
    }

    private finishZoomStage(): void {
        this.model.goToNextStage();

        this.fullMapView.getHeader().updateCenterText("STAGE: " + this.model.stage);
		this.zoomAmerica.getHeader().updateCenterText("STAGE: " + this.model.stage);
		this.zoomEurope.getHeader().updateCenterText("STAGE: " + this.model.stage);
		this.zoomAsia.getHeader().updateCenterText("STAGE: " + this.model.stage);

        if(this.model.isEndStage()) {
			this.screenSwitcher.switchToScreen({ type: "playWW2Summary" });
		} else {
			this.startStage();
		}
    }

    // Required by abstract ScreenController
    getView(): PlayWW2ScreenView {
        return this.dialogueView;
    }

    /**
	 * Ensures that player sees summary screen if they leave play mode and reenter
	 */
	showDialogue() {
		if(this.model.isEndStage()) {
			this.summary.show();
		} else {
			this.dialogueView.show();
		}	
	}

    // Expose all views to main.ts
    getViews() {
        return {
            dialogue: this.dialogueView,
            fullMap: this.fullMapView,
            zoomAmerica: this.zoomAmerica,
            zoomEurope: this.zoomEurope,
            zoomAsia: this.zoomAsia,
            summary: this.summary,
        };
    }

    private handleCountryClick(country: string): void {
        let zoomMap: PlayWW2ZoomView | undefined;

        if (country in this.alienCoordsAmerica) {
            zoomMap = this.zoomAmerica;
        } else if (country in this.alienCoordsEurope) {
            zoomMap = this.zoomEurope;
        } else if (country in this.alienCoordsAsia) {
            zoomMap = this.zoomAsia;
        } else {
            console.log("Clicked on a country that isn't mapped (WW2)");
            return;
        }

        if (this.model.makeGuess(country)) {
            zoomMap.playCorrectAnimation(country);
            setTimeout(() => this.finishZoomStage(), 1200);
            setTimeout(() => this.screenSwitcher.switchToScreen({ type: "abductionGameWW2" }), 1200);
        } else {
            zoomMap.playIncorrectAnimation();
        }
    }

    private handlePlayAgain(): void {
		this.model.resetGame();
        this.fullMapView.getHeader().updateCenterText("STAGE: " + this.model.stage);
        this.zoomAmerica.getHeader().updateCenterText("STAGE: " + this.model.stage);
		this.zoomEurope.getHeader().updateCenterText("STAGE: " + this.model.stage);
		this.zoomAsia.getHeader().updateCenterText("STAGE: " + this.model.stage);
		this.screenSwitcher.switchToScreen({ type: "playLevels" });
	}
}
