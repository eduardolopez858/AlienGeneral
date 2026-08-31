import Konva from "konva";
import type { View } from "../../../types.ts";
import { STAGE_HEIGHT, STAGE_WIDTH } from "../../../constants.ts";
import { PlayWW1Model } from "./PlayWW1Model.ts";

/**
 * Summary screen to display the player's performance on the WW1 play level
 */
export class PlayWW1SummaryView implements View {
	private group: Konva.Group;
    private model: PlayWW1Model;
    private rankStars: Konva.Text;

	constructor(onHomeClick: () => void, onPlayClick: () => void, ww1Model: PlayWW1Model) {
		this.group = new Konva.Group({visible:true});
        this.model = ww1Model;
		const playButton = new Konva.Group();
		const homeButton = new Konva.Group();

		Konva.Image.fromURL("/Completion_Background.png", (image) => {
			image.width(STAGE_WIDTH);
			image.height(STAGE_HEIGHT);
			image.offsetX(image.width() / 2);
			image.offsetY(image.height() / 2);
			image.x(STAGE_WIDTH / 2);
			image.y(STAGE_HEIGHT / 2);
			
			this.group.add(image);
			image.moveToBottom();

			this.group.getLayer()?.draw();
		});

		const successText = new Konva.Text({
			x: STAGE_WIDTH / 2,
			y: STAGE_HEIGHT / 3 - 25,
			text: "SUCCESS!",
			fontStyle: "bold",
			stroke: "white",
			fontSize: 72,
			strokeWidth: 1,
			fill: "black",
			align: "center",
		});
		successText.offsetX(successText.width() / 2);
		successText.offsetY(successText.height() / 2);
		this.group.add(successText);

		const subtext = new Konva.Text({
			x: STAGE_WIDTH / 2,
			y: STAGE_HEIGHT / 3 + 50,
			text: "Well done! You've completed the WWI level",
			fill: "black",
			fontStyle: "bold",
			stroke: "white",
			fontSize: 28,
			strokeWidth: 0.5,
			align: "center",
		});
		subtext.offsetX(subtext.width() / 2);
		subtext.offsetY(subtext.height() / 2);
		this.group.add(subtext);

		const rankText = new Konva.Text({
			x: STAGE_WIDTH / 2,
			y: 3 * STAGE_HEIGHT / 5,
			text: "RANK",
			fill: "black",
			fontStyle: "bold",
			stroke: "white",
			fontSize: 56,
			strokeWidth: 1,
			align: "center",
		});
		rankText.offsetX(rankText.width() / 2);
		rankText.offsetY(rankText.height() / 2);
		this.group.add(rankText);

		this.rankStars = new Konva.Text({
			x: STAGE_WIDTH / 2,
			y: 2 * STAGE_HEIGHT / 3 + 25,
			text: "☆".repeat(5),
			fill: "black",
			fontSize: 48,
			align: "center",
		});
		this.rankStars.offsetX(this.rankStars.width() / 2);
		this.rankStars.offsetY(this.rankStars.height() / 2);
		this.group.add(this.rankStars);

		const playBox = new Konva.Rect({
			x: 760,
			y: 600,
			width: 230,
			height: 65,
			fill: "#D9D9D9",
		})
		playBox.offsetX(playBox.width() / 2);
		playBox.offsetY(playBox.height() / 2);
		playButton.add(playBox);
		
		const playText = new Konva.Text({
			x: 760,
			y: 600,
			text: "PLAY AGAIN",
			fill: "black",
			fontStyle: "bold",
			fontSize: 24,
			align: "center",
		})
		playText.offsetX(playText.width()/2);
		playText.offsetY(playText.height()/2);
		playButton.add(playText);

		this.group.add(playButton);
		playButton.on("mouseenter", () => {
			document.body.style.cursor = "pointer";
		});
		playButton.on("mouseleave", () => {
			document.body.style.cursor = "default";
		});

		const homeBox = new Konva.Rect({
			x: 200,
			y: 600,
			width: 230,
			height: 65,
			fill: "#D9D9D9",
		})
		homeBox.offsetX(homeBox.width() / 2);
		homeBox.offsetY(homeBox.height() / 2);
		homeButton.add(homeBox);
		
		const homeText = new Konva.Text({
			x: 200,
			y: 600,
			text: "MAIN MENU",
			fill: "black",
			fontStyle: "bold",
			fontSize: 24,
			align: "center",
		})
		homeText.offsetX(homeText.width()/2);
		homeText.offsetY(homeText.height()/2);
		homeButton.add(homeText);
		
		this.group.add(homeButton);
		homeButton.on("mouseenter", () => {
			document.body.style.cursor = "pointer";
		});
		homeButton.on("mouseleave", () => {
			document.body.style.cursor = "default";
		});

		playButton.on("click", onPlayClick);
		homeButton.on("click", onHomeClick);
	}

	/**
	 * Show the screen
	 */
	show(): void {
        this.rankStars.text(this.buildStars());
		this.group.visible(true);
		this.group.getLayer()?.draw();
	}

	/**
	 * Hide the screen
	 */
	hide(): void {
		this.group.visible(false);
		this.group.getLayer()?.draw();
	}

	getGroup(): Konva.Group {
		return this.group;
	}

    /**
     * Builds the string of stars depending on player's ranking
     */
    private buildStars(): string {
        const starCount = this.model.getRank();
        const filled = "★".repeat(starCount);
        const empty = "☆".repeat(5 - starCount);
        return filled + empty;
    }
}