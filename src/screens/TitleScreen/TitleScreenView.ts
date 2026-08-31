import Konva from "konva";
import type { View } from "../../types.ts";
import { STAGE_HEIGHT, STAGE_WIDTH } from "../../constants.ts";

export class TitleScreenView implements View {
	private titleGroup: Konva.Group;
	private onStartClick: (() => void) | null = null;
	private canClick = false;

	constructor(onStartClick: () => void) {
		this.titleGroup = new Konva.Group({ visible: false });
		this.onStartClick = onStartClick;

		setTimeout(() => {
			this.canClick = true;
		}, 500);

		this.titleGroup.on("click", () => {
			if (this.canClick && this.onStartClick) {
				this.onStartClick();
			}
		});

		Konva.Image.fromURL("/Title_Screen_Background.png", (image) => {
			image.width(STAGE_WIDTH);
			image.height(STAGE_HEIGHT);
			image.offsetX(image.width() / 2);
			image.offsetY(image.height() / 2);
			image.x(STAGE_WIDTH / 2);
			image.y(STAGE_HEIGHT / 2);
			this.titleGroup.add(image);
			image.moveToBottom();

			this.titleGroup.getLayer()?.draw();
		});

		const titleBox = new Konva.Rect({
			x: STAGE_WIDTH / 2,
			y: STAGE_HEIGHT / 3,
			width: STAGE_WIDTH / 2,
			height: STAGE_HEIGHT / 3,
			fill: "#D9D9D9",
		});
		titleBox.offsetX(titleBox.width() / 2);
		titleBox.offsetY(titleBox.height() / 2);
		this.titleGroup.add(titleBox);

		const title = new Konva.Text({
			x: STAGE_WIDTH / 2,
			y: STAGE_HEIGHT / 3,
			text: "TIME-TRAVELING\nALIEN GENERAL",
			fontStyle: "bold",
			fontSize: 48,
			fill: "black",
			align: "center",
		});
		title.offsetX(title.width() / 2);
		title.offsetY(title.height() / 2);
		this.titleGroup.add(title);

		const continueText = new Konva.Text({
			x: STAGE_WIDTH / 2,
			y: (2 * STAGE_HEIGHT) / 3,
			text: "CLICK TO CONTINUE...",
			fill: "black",
			fontStyle: "bold",
			stroke: "white",
			fontSize: 48,
			strokeWidth: 2,
			align: "center",
		});
		continueText.offsetX(continueText.width() / 2);
		continueText.offsetY(continueText.height() / 2);
		this.titleGroup.add(continueText);
	}

	show(): void {
		this.titleGroup.visible(true);
		this.titleGroup.getLayer()?.draw();
	}

	hide(): void {
		this.titleGroup.visible(false);
		this.titleGroup.getLayer()?.draw();
	}

	getGroup(): Konva.Group {
		return this.titleGroup;
	}
}