import { ScreenController } from "../../types.ts";
import type { ScreenSwitcher } from "../../types.ts";
import { ModeScreenView } from "./ModeScreenView.ts";

export class ModeScreenController extends ScreenController {
    private view: ModeScreenView;
    private screenSwitcher: ScreenSwitcher;
    private clickSound: HTMLAudioElement

    constructor(screenSwitcher: ScreenSwitcher) {
        super();
        this.screenSwitcher = screenSwitcher;
        this.view = new ModeScreenView(
            () => this.handlePlayClick(),
            () => this.handleLearnClick()
        );
        const click = new Audio("../../Click.mp3");
        this.clickSound = click;
    }

    private handlePlayClick(): void {
        // Goes to Screen where user gets to select a level to play
        this.clickSound.play();
        this.screenSwitcher.switchToScreen({ type: "dodgeGame" }); 

    }

    private handleLearnClick(): void {
        // Goes to Screen where user gets to select a level to learn about
        this.clickSound.play();
        this.screenSwitcher.switchToScreen({ type: "learnLevels" }); 
    }

    /**
     * Get the view
     */
    getView(): ModeScreenView {
        return this.view;
    }
}
