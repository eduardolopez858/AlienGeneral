import Konva from "konva";

export interface BackButtonOptions {
	text?: string;
	onClick: () => void;
}

export class BackButton {
	private group: Konva.Group;

	constructor(options: BackButtonOptions) {
		const {
			text,
			onClick
		} = options;

		this.group = new Konva.Group();

		const rect = new Konva.Rect({
			x: 30,
			y: 590,
			width: 140,
			height: 60,
			fill: "#D9D9D9",
			cornerRadius: 3
		});

		const label = new Konva.Text({
			x: 100,
			y: 604,
			text,
			fontSize: 35,
			fontFamily: "Arial",
			fontStyle: "bold",
			fill: "black",
			align: "center"
		});
		label.offsetX(label.width() / 2);

		this.group.add(rect);
		this.group.add(label);

		// Shared click behavior
		this.group.on("click", () => onClick());

		// Shared hover behavior
		this.group.on("mouseenter", () => {
			document.body.style.cursor = "pointer";
		});
		this.group.on("mouseleave", () => {
			document.body.style.cursor = "default";
		});
	}

	getNode(): Konva.Group {
		return this.group;
	}
}
