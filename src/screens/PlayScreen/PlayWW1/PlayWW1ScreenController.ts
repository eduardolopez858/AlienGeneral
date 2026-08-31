// src/screens/PlayScreen/PlayWW1/PlayWW1ScreenController.ts

import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher, CoordinateMarkings } from "../../../types.ts";

import { PlayWW1Model } from "./PlayWW1Model.ts";
import { PlayWW1ScreenView } from "./PlayWW1ScreenView.ts";
import { PlayWW1FullMapView } from "./PlayWW1FullMapView.ts";
import { PlayWW1ZoomView } from "./PlayWW1ZoomView.ts";
import { PlayWW1SummaryView } from "./PlayWW1SummaryView.ts";
import { STAGE_HEIGHT } from "../../../constants.ts";

export class PlayWW1ScreenController extends ScreenController {

	private model: PlayWW1Model;

	private dialogueView: PlayWW1ScreenView;
	private fullMapView: PlayWW1FullMapView;

	private zoomOE: PlayWW1ZoomView;
	private zoomUS: PlayWW1ZoomView;
	private zoomEurope: PlayWW1ZoomView;
	private zoomRussia: PlayWW1ZoomView;

	private summary: PlayWW1SummaryView;

	private screenSwitcher: ScreenSwitcher;

	private dialogueLineIndex = 0;

	private alienCoordsOE: CoordinateMarkings = { 
		"Ottoman Empire": [450, 220],
	};
	private alienCoordsUS: CoordinateMarkings = { 
		"United States": [450, 330],
	};
	private alienCoordsEurope: CoordinateMarkings = { 
		"German Empire": [460, 260],
		"Kingdom of Italy": [470, 480],
		"United Kingdom": [250, 220],
		"French Republic": [320, 390],
		"Austria-Hungary": [580, 380],
		"Kingdom of Serbia": [635, 480],
		"Belgium": [350, 290],
	};
	private alienCoordsRussia: CoordinateMarkings = { 
		"Empire-of-Japan": [690, 520],
		"Republic-of-China": [530, 500],
		"Russian Empire": [480, 360],
	};

	constructor(screenSwitcher: ScreenSwitcher) {
		super();

		this.screenSwitcher = screenSwitcher;
		this.model = new PlayWW1Model();

		// Views
		this.dialogueView = new PlayWW1ScreenView();
		this.fullMapView = new PlayWW1FullMapView(this.model);

		this.zoomOE = new PlayWW1ZoomView("/WW1_Play_OE.png", this.alienCoordsOE, (country) => this.handleCountryClick(country), this.model);
		this.zoomUS = new PlayWW1ZoomView("/WW1_Play_US.png", this.alienCoordsUS, (country) => this.handleCountryClick(country), this.model);
		this.zoomEurope = new PlayWW1ZoomView("/WW1_Play_Europe.png", this.alienCoordsEurope, (country) => this.handleCountryClick(country), this.model);
		this.zoomRussia = new PlayWW1ZoomView("/WW1_Play_Russia.png", this.alienCoordsRussia, (country) => this.handleCountryClick(country), this.model);

		// --- Dialogue clicks ---
		this.dialogueView.onDialogueClick(() => this.advanceDialogue());

		// --- Full map zoom clicks ---
		this.fullMapView.onZoomClick((target) => {
			if (target === "OE") {
				this.screenSwitcher.switchToScreen({ type: "playWW1ZoomOE" });
			} else if (target === "US") {
				this.screenSwitcher.switchToScreen({ type: "playWW1ZoomUS" });
			} else if (target === "Europe") {
				this.screenSwitcher.switchToScreen({ type: "playWW1ZoomEurope" });
			} else if (target === "Russia") {
				this.screenSwitcher.switchToScreen({ type: "playWW1ZoomRussia" });
			}
		});

		// Back buttons -> back to play levels
		const backToLevels = () =>
			this.screenSwitcher.switchToScreen({ type: "playLevels" });
		this.dialogueView.onBackClick(backToLevels);
		this.fullMapView.onBackClick(backToLevels);

		// Back buttons -> back to main map
		const backToMainMap = () =>
			this.screenSwitcher.switchToScreen({ type: "playWW1FullMap" });		
		this.zoomOE.onBackClick(backToMainMap);
		this.zoomUS.onBackClick(backToMainMap);
		this.zoomEurope.onBackClick(backToMainMap);
		this.zoomRussia.onBackClick(backToMainMap);

		this.summary = new PlayWW1SummaryView(backToLevels ,() => this.handlePlayAgain(), this.model);
	}

	/** Starts the current stage's dialogue (stage 1, 2, 3, ...) */
	startStage(): void {
		const lines = this.model.getDialogueForStage(this.model.stage);
		this.dialogueLineIndex = 0;

		//Setting Mission Text to display in the MapView
		const missionLine = lines[lines.length - 1] ?? "";
        this.model.setCurrentMission(missionLine);

		this.dialogueView.setDialogue(lines[0]);
		this.screenSwitcher.switchToScreen({ type: "playWW1Dialogue" });
	}

	private advanceDialogue(): void {
		const lines = this.model.getDialogueForStage(this.model.stage);

		if (this.dialogueLineIndex < lines.length - 1) {
			this.dialogueLineIndex++;
			this.dialogueView.setDialogue(lines[this.dialogueLineIndex]);
			
		} else {
			// finished dialogue, set overlay text, show full map with zoom icons
			const mission = this.model.getCurrentMission();
			this.fullMapView.setMissionText(mission);
			this.zoomOE.setMissionText(mission);
			this.zoomUS.setMissionText(mission);
			this.zoomEurope.setMissionText(mission);
			this.zoomRussia.setMissionText(mission);

			const missionY = STAGE_HEIGHT/15;
			this.fullMapView.setMissionBoxY(missionY);
			this.zoomOE.setMissionBoxY(missionY);
			this.zoomUS.setMissionBoxY(missionY);
			this.zoomEurope.setMissionBoxY(missionY);
			this.zoomRussia.setMissionBoxY(missionY);

            this.screenSwitcher.switchToScreen({ type: "playWW1FullMap" });
		}
	}

	private finishZoomStage(): void {
		this.model.goToNextStage();
		// Update header for full map
		this.fullMapView.getHeader().updateCenterText("STAGE: " + this.model.stage);

		// Update header for all zoom views
		this.zoomOE.getHeader().updateCenterText("STAGE: " + this.model.stage);
		this.zoomUS.getHeader().updateCenterText("STAGE: " + this.model.stage);
		this.zoomEurope.getHeader().updateCenterText("STAGE: " + this.model.stage);
		this.zoomRussia.getHeader().updateCenterText("STAGE: " + this.model.stage);

		if(this.model.isEndStage()) {
			this.screenSwitcher.switchToScreen({ type: "playWW1Summary" });
		} else {
			this.startStage();
		}
	}

	// ✅ required by abstract ScreenController
	// (main.ts doesn't really use this; it uses getViews(), but TS needs it)
	getView(): PlayWW1ScreenView {
		return this.dialogueView;
	}

	// Expose all views to main.ts
	getViews() {
		return {
			dialogue: this.dialogueView,
			fullMap: this.fullMapView,
			zoomOE: this.zoomOE,
			zoomUS: this.zoomUS,
			zoomEurope: this.zoomEurope,
			zoomRussia: this.zoomRussia,
			summary: this.summary,
		};
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

	/**
	 * Handles player clicking on an alien to guess a country
	 */
	private handleCountryClick(country:string): void {
		// Determines which zoom view the country is from
		let zoomMap:PlayWW1ZoomView;
		if(country in this.alienCoordsOE) 
			zoomMap = this.zoomOE;
		else if (country in this.alienCoordsUS)
			zoomMap = this.zoomUS;
		else if(country in this.alienCoordsEurope)
			zoomMap = this.zoomEurope;
		else if(country in this.alienCoordsRussia)
			zoomMap = this.zoomRussia;
		else {
			console.log("Clicked on a country that isn't mapped");
			return;
		}
		
		// Plays animation depending on answer correctness
        if(this.model.makeGuess(country)) {
			zoomMap.playCorrectAnimation(country);
			setTimeout(() => this.finishZoomStage(), 1200);
			setTimeout(() => this.screenSwitcher.switchToScreen({ type: "abductionGameWW1" }), 1200);
        } else {
            zoomMap.playIncorrectAnimation();
        }
    }

	/**
	 * Handles player request to play ww1 level again
	 */
	private handlePlayAgain(): void {
		this.model.resetGame();

		this.fullMapView.getHeader().updateCenterText("STAGE: " + this.model.stage);
		this.zoomOE.getHeader().updateCenterText("STAGE: " + this.model.stage);
		this.zoomUS.getHeader().updateCenterText("STAGE: " + this.model.stage);
		this.zoomEurope.getHeader().updateCenterText("STAGE: " + this.model.stage);
		this.zoomRussia.getHeader().updateCenterText("STAGE: " + this.model.stage);
		this.screenSwitcher.switchToScreen({ type: "playLevels" });
	}
}
