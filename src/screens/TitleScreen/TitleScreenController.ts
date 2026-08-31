import { ScreenController } from "../../types.ts";
import type { ScreenSwitcher } from "../../types.ts";
import { TitleScreenView } from "./TitleScreenView.ts";

export class TitleScreenController extends ScreenController {
	private view: TitleScreenView;
	private screenSwitcher: ScreenSwitcher;

	constructor(screenSwitcher: ScreenSwitcher) {
		super();
		this.screenSwitcher = screenSwitcher;
		this.view = new TitleScreenView(() => this.handleStartClick());
	}

	private handleStartClick(): void {
		this.screenSwitcher.switchToScreen({type: "modeSelect"});
	}

	/**
	 * Get the view
	 */
	getView(): TitleScreenView {
		return this.view;
	}
}
