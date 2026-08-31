import Konva from "konva";
import { STAGE_HEIGHT, STAGE_WIDTH } from "./constants.ts";
import type { ScreenSwitcher, Screen } from "./types.ts";

import { TitleScreenController } from "./screens/TitleScreen/TitleScreenController.ts";
import { ModeScreenController } from "./screens/TitleScreen/ModeScreenController.ts";

// Play Mode
import { PlayLevelsScreenController } from "./screens/PlayScreen/PlayLevels/PlayLevelsScreenController.ts";
import { PlayWW1ScreenController } from "./screens/PlayScreen/PlayWW1/PlayWW1ScreenController.ts";

// main.ts (top of file with other imports)
import { PlayWW2ScreenController } from "./screens/PlayScreen/PlayWW2/PlayWW2ScreenController.ts";


// Learn Mode
import { LearnLevelsScreenController } from "./screens/LearnScreen/LearnLevels/LearnLevelsScreenController.ts";
import {
    LearnScreenController,
    LearnWW1Controller,
    LearnWW2Controller
} from "./screens/LearnScreen/LearnLevelScreenController.ts";

import {
    LearnWW1ScreenView,
    LearnWW2ScreenView
} from "./screens/LearnScreen/LearnLevelScreenView.ts";

import { ZoomLearnWW1ScreenController } from "./screens/LearnScreen/Zoom/ZoomLearnWW1ScreenController.ts";
import {
    ZoomEuropeLearnWW1ScreenView,
    ZoomAmericaLearnWW1ScreenView,
    ZoomAsiaLearnWW1ScreenView
} from "./screens/LearnScreen/Zoom/ZoomLearnWW1ScreenView.ts";

import { ZoomLearnWW2ScreenController } from "./screens/LearnScreen/Zoom/ZoomLearnWW2ScreenController.ts";
import {
    ZoomEuropeLearnWW2ScreenView,
    ZoomNorthAmericaLearnWW2ScreenView,
    ZoomAsia_MELearnWW2ScreenView
} from "./screens/LearnScreen/Zoom/ZoomLearnWW2ScreenView.ts";

// Mini Game 1
import { DodgeGameController } from "./screens/DodgeGame/DodgeGameController.ts";
import { AbductionGameController } from "./screens/AbductionGame/AbductionGameController.ts";


//////////////////////////////////////////////////////////////////////////

type PlayWW1Views = ReturnType<PlayWW1ScreenController["getViews"]>;
type PlayWW2Views = ReturnType<PlayWW2ScreenController["getViews"]>;

class App implements ScreenSwitcher {

    private stage: Konva.Stage;
    private layer: Konva.Layer;

    private titleController: TitleScreenController;
    private modeController: ModeScreenController;

    // Play Mode
    private playLevelsController: PlayLevelsScreenController;
    private playWW1Controller: PlayWW1ScreenController;
    private playWW2Controller: PlayWW2ScreenController;
    private playWW1Views: PlayWW1Views;
    private playWW2Views: PlayWW2Views;

    // Learn Mode
    private learnLevelsController: LearnLevelsScreenController;

    private learnWW1Controller: LearnScreenController<LearnWW1ScreenView>;
    private learnWW2Controller: LearnScreenController<LearnWW2ScreenView>;

    private ww1zoomEuropeController: ZoomLearnWW1ScreenController<ZoomEuropeLearnWW1ScreenView>;
    private ww1zoomAmericaController: ZoomLearnWW1ScreenController<ZoomAmericaLearnWW1ScreenView>;
    private ww1zoomAsiaController: ZoomLearnWW1ScreenController<ZoomAsiaLearnWW1ScreenView>;

    private ww2zoomEuropeController: ZoomLearnWW2ScreenController<ZoomEuropeLearnWW2ScreenView>;
    private ww2zoomNorthAmericaController: ZoomLearnWW2ScreenController<ZoomNorthAmericaLearnWW2ScreenView>;
    private ww2zoomAsiaMEController: ZoomLearnWW2ScreenController<ZoomAsia_MELearnWW2ScreenView>;

    // Mini Game 1
    private mGame1Controller: DodgeGameController;
    private mGame2ControllerWW1: AbductionGameController;
    private mGame2ControllerWW2: AbductionGameController;

    //////////////////////////////////////////////////////////////////////////

    constructor(container: string) {
        // Initialize Konva stage (the main canvas)
        this.stage = new Konva.Stage({
            container,
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT
        });

        // Create a layer (screens will be added to this layer)
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);

        // Initialize all screen controllers
        this.titleController = new TitleScreenController(this);
        this.modeController = new ModeScreenController(this);

        // Play Mode controllers
        this.playLevelsController = new PlayLevelsScreenController(this);
        this.playWW1Controller = new PlayWW1ScreenController(this);
        this.playWW2Controller = new PlayWW2ScreenController(this);

        // Get all Play views (dialogue + full map + 4 zoom maps)
        this.playWW1Views = this.playWW1Controller.getViews();
        this.playWW2Views = this.playWW2Controller.getViews();

        // Learn Mode controllers
        this.learnLevelsController = new LearnLevelsScreenController(this);

        this.learnWW1Controller = LearnWW1Controller(this);
        this.learnWW2Controller = LearnWW2Controller(this);

        this.ww1zoomEuropeController = new ZoomLearnWW1ScreenController(this, ZoomEuropeLearnWW1ScreenView);
        this.ww1zoomAmericaController = new ZoomLearnWW1ScreenController(this, ZoomAmericaLearnWW1ScreenView);
        this.ww1zoomAsiaController = new ZoomLearnWW1ScreenController(this, ZoomAsiaLearnWW1ScreenView);

        this.ww2zoomEuropeController = new ZoomLearnWW2ScreenController(this, ZoomEuropeLearnWW2ScreenView);
        this.ww2zoomNorthAmericaController = new ZoomLearnWW2ScreenController(this, ZoomNorthAmericaLearnWW2ScreenView);
        this.ww2zoomAsiaMEController = new ZoomLearnWW2ScreenController(this, ZoomAsia_MELearnWW2ScreenView);

        //Mini Game 1
        this.mGame1Controller = new DodgeGameController(this);
        this.mGame2ControllerWW1 = new AbductionGameController(this, 1);
        this.mGame2ControllerWW2 = new AbductionGameController(this, 2);

        // Add all screen groups to the layer
        // Title + Mode
        this.layer.add(this.titleController.getView().getGroup());
        this.layer.add(this.modeController.getView().getGroup());

        // Play Mode
        this.layer.add(this.playLevelsController.getView().getGroup());

        // All PlayWW1 views
        this.layer.add(this.playWW1Views.dialogue.getGroup());
        this.layer.add(this.playWW1Views.fullMap.getGroup());
        this.layer.add(this.playWW1Views.zoomOE.getGroup());
        this.layer.add(this.playWW1Views.zoomUS.getGroup());
        this.layer.add(this.playWW1Views.zoomEurope.getGroup());
        this.layer.add(this.playWW1Views.zoomRussia.getGroup());
        this.layer.add(this.playWW1Views.summary.getGroup());

        // All PlayWW2 views
        this.layer.add(this.playWW2Views.dialogue.getGroup());
        this.layer.add(this.playWW2Views.fullMap.getGroup());
        this.layer.add(this.playWW2Views.zoomAmerica.getGroup());
        this.layer.add(this.playWW2Views.zoomEurope.getGroup());
        this.layer.add(this.playWW2Views.zoomAsia.getGroup());
        this.layer.add(this.playWW2Views.summary.getGroup());

        // Learn Levels
        this.layer.add(this.learnLevelsController.getView().getGroup());

        // Learn WW1/WW2 base maps
        this.layer.add(this.learnWW1Controller.getView().getGroup());
        this.layer.add(this.learnWW2Controller.getView().getGroup());

        // WW1 zoom screens
        this.layer.add(this.ww1zoomEuropeController.getView().getGroup());
        this.layer.add(this.ww1zoomAmericaController.getView().getGroup());
        this.layer.add(this.ww1zoomAsiaController.getView().getGroup());

        // WW2 zoom screens
        this.layer.add(this.ww2zoomEuropeController.getView().getGroup());
        this.layer.add(this.ww2zoomNorthAmericaController.getView().getGroup());
        this.layer.add(this.ww2zoomAsiaMEController.getView().getGroup());

        //Mini Game 1
        this.layer.add(this.mGame1Controller.getView().getGroup());
        this.layer.add(this.mGame2ControllerWW1.getView().getGroup());
        this.layer.add(this.mGame2ControllerWW2.getView().getGroup());

        // Draw the layer (render everything to the canvas)
        this.layer.draw();

        // Initial visibility
        this.titleController.getView().show();
        this.modeController.getView().hide();

        // Play Mode initial hide
        this.playLevelsController.getView().hide();

        this.playWW1Views.dialogue.hide();
        this.playWW1Views.fullMap.hide();
        this.playWW1Views.zoomOE.hide();
        this.playWW1Views.zoomUS.hide();
        this.playWW1Views.zoomEurope.hide();
        this.playWW1Views.zoomRussia.hide();
        this.playWW1Views.summary.hide();

        this.playWW2Views.dialogue.hide();
        this.playWW2Views.fullMap.hide();
        this.playWW2Views.zoomAmerica.hide();
        this.playWW2Views.zoomEurope.hide();
        this.playWW2Views.zoomAsia.hide();
        this.playWW2Views.summary.hide();

        // Learn initial hide
        this.learnLevelsController.getView().hide();

        this.learnWW1Controller.getView().hide();
        this.learnWW2Controller.getView().hide();

        this.ww1zoomEuropeController.getView().hide();
        this.ww1zoomAmericaController.getView().hide();
        this.ww1zoomAsiaController.getView().hide();

        this.ww2zoomEuropeController.getView().hide();
        this.ww2zoomNorthAmericaController.getView().hide();
        this.ww2zoomAsiaMEController.getView().hide();

        //Mini Game 1
        this.mGame1Controller.getView().hide();
        
        this.mGame2ControllerWW1.getView().hide();
        this.mGame2ControllerWW2.getView().hide();
    }

    /**
     * Switch to a different screen
     */
    switchToScreen(screen: Screen): void {
        // Hide all screens first
        this.titleController.getView().hide();
        this.modeController.getView().hide();

        // Play Mode
        this.playLevelsController.getView().hide();

        this.playWW1Views.dialogue.hide();
        this.playWW1Views.fullMap.hide();
        this.playWW1Views.zoomOE.hide();
        this.playWW1Views.zoomUS.hide();
        this.playWW1Views.zoomEurope.hide();
        this.playWW1Views.zoomRussia.hide();
        this.playWW1Views.summary.hide();

        this.playWW2Views.dialogue.hide();
        this.playWW2Views.fullMap.hide();
        this.playWW2Views.zoomAmerica.hide();
        this.playWW2Views.zoomEurope.hide();
        this.playWW2Views.zoomAsia.hide();
        this.playWW2Views.summary.hide();

        // Learn Mode
        this.learnLevelsController.getView().hide();

        this.learnWW1Controller.getView().hide();
        this.learnWW2Controller.getView().hide();

        this.ww1zoomEuropeController.getView().hide();
        this.ww1zoomAmericaController.getView().hide();
        this.ww1zoomAsiaController.getView().hide();

        this.ww2zoomEuropeController.getView().hide();
        this.ww2zoomNorthAmericaController.getView().hide();
        this.ww2zoomAsiaMEController.getView().hide();

        this.mGame1Controller.getView().hide();
        this.mGame2ControllerWW1.getView().hide();
        this.mGame2ControllerWW2.getView().hide();

        // Show the requested screen based on the screen type
        switch (screen.type) {
            // Title / Mode
            case "title":
                this.titleController.getView().show();
                break;

            case "modeSelect":
                this.modeController.getView().show();
                break;

            // Play Levels menu
            case "playLevels":
                this.playLevelsController.getView().show();
                break;

            // OLD entry point used by Play Levels: start WW1 stage 1
            case "playWW1":
                this.playWW1Controller.startStage();
                break;

            // New PlayWW1 screen types
            case "playWW1Dialogue":
                this.playWW1Controller.showDialogue();
                break;

            case "playWW1FullMap":
                this.playWW1Views.fullMap.show();
                break;

            case "playWW1ZoomOE":
                this.playWW1Views.zoomOE.show();
                break;

            case "playWW1ZoomUS":
                this.playWW1Views.zoomUS.show();
                break;

            case "playWW1ZoomEurope":
                this.playWW1Views.zoomEurope.show();
                break;

            case "playWW1ZoomRussia":
                this.playWW1Views.zoomRussia.show();
                break;

            case "playWW1Summary":
                this.playWW1Views.summary.show();
                break;

            // Play WW2
            case "playWW2":
                this.playWW2Controller.startStage();
                break;

            case "playWW2Dialogue":
                this.playWW2Controller.showDialogue();
                break;

            case "playWW2FullMap":
                this.playWW2Views.fullMap.show();
                break;

            case "playWW2ZoomAmerica":
                this.playWW2Views.zoomAmerica.show();
                break;

            case "playWW2ZoomEurope":
                this.playWW2Views.zoomEurope.show();
                break;

            case "playWW2ZoomAsia":
                this.playWW2Views.zoomAsia.show();
                break;

            case "playWW2Summary":
                this.playWW2Views.summary.show();
                break;


            // Learn Levels
            case "learnLevels":
                this.learnLevelsController.getView().show();
                break;

            // Learn WW1 / WW2 base
            case "learnWW1":
                this.learnWW1Controller.getView().show();
                break;

            case "learnWW2":
                this.learnWW2Controller.getView().show();
                break;

            // WW1 Zoom screens
            case "zoomEuropelearnWW1":
                this.ww1zoomEuropeController.getView().show();
                break;

            case "zoomAmericalearnWW1":
                this.ww1zoomAmericaController.getView().show();
                break;

            case "zoomAsialearnWW1":
                this.ww1zoomAsiaController.getView().show();
                break;

            // WW2 Zoom screens
            case "zoomEuropelearnWW2":
                this.ww2zoomEuropeController.getView().show();
                break;

            case "zoomNorthAmericalearnWW2":
                this.ww2zoomNorthAmericaController.getView().show();
                break;

            case "zoomAsia_MElearnWW2":
                this.ww2zoomAsiaMEController.getView().show();
                break;

            //Mini Game screens
            case "dodgeGame":
                this.mGame1Controller.showInstructionsPopup();
                break;

            case "abductionGameWW1":
                this.mGame2ControllerWW1 = new AbductionGameController(this, 1);
                this.layer.add(this.mGame2ControllerWW1.getView().getGroup());
                this.mGame2ControllerWW1.getView().show();
                break;

            case "abductionGameWW2":
                this.mGame2ControllerWW2 = new AbductionGameController(this, 2);
                this.layer.add(this.mGame2ControllerWW2.getView().getGroup());
                this.mGame2ControllerWW2.getView().show();
                break;
        }
    }
}

// Initialize the application
    new App("container");
