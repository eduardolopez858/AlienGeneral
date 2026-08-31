import Konva from "konva";
import type { View } from "../../types.ts";
import { STAGE_HEIGHT, STAGE_WIDTH } from "../../constants.ts";

export class ModeScreenView implements View {
    private selectGroup: Konva.Group;

    constructor(onPlayClick: () => void, onLearnClick: () => void) {
        this.selectGroup = new Konva.Group({visible:true});
        const playButton = new Konva.Group();
        const learnButton = new Konva.Group();

        Konva.Image.fromURL("/Galaxy_Background.jpg", (image) => {
            image.width(STAGE_WIDTH);
            image.height(STAGE_HEIGHT);
            image.offsetX(image.width() / 2);
            image.offsetY(image.height() / 2);
            image.x(STAGE_WIDTH / 2);
            image.y(STAGE_HEIGHT / 2);
            
            this.selectGroup.add(image);
			image.moveToBottom();

			this.selectGroup.getLayer()?.draw();
        });

        const title = new Konva.Text({
            x: STAGE_WIDTH / 2,
            y: STAGE_HEIGHT / 5,
            text: "TIME-TRAVELING ALIEN GENERAL",
            fontStyle: "bold",
            fontSize: 48,
            stroke: "white",
            strokeWidth: 2,
            fill: "black",
            align: "center",
        });
        title.offsetX(title.width() / 2);
        title.offsetY(title.height() / 2);
        this.selectGroup.add(title);

        const playBox = new Konva.Rect({
            x: STAGE_WIDTH / 2,
            y: 2 * STAGE_HEIGHT / 5,
            width: STAGE_WIDTH / 2,
            height: STAGE_HEIGHT / 6,
            fill: "#D9D9D9",
        })
        playBox.offsetX(playBox.width() / 2);
        playBox.offsetY(playBox.height() / 2);
        playButton.add(playBox);
        
        const playText = new Konva.Text({
            x: STAGE_WIDTH / 2,
            y: 2 * STAGE_HEIGHT / 5,
            text: "PLAY MODE",
            fill: "black",
            fontStyle: "bold",
            fontSize: 36,
            align: "center",
        })
        playText.offsetX(playText.width()/2);
        playText.offsetY(playText.height()/2);
        playButton.add(playText);
        this.selectGroup.add(playButton);

        const learnBox = new Konva.Rect({
            x: STAGE_WIDTH / 2,
            y: 2 * STAGE_HEIGHT / 3,
            width: STAGE_WIDTH / 2,
            height: STAGE_HEIGHT / 6,
            fill: "#D9D9D9",
        })
        learnBox.offsetX(learnBox.width() / 2);
        learnBox.offsetY(learnBox.height() / 2);
        learnButton.add(learnBox);
        
        const learnText = new Konva.Text({
            x: STAGE_WIDTH / 2,
            y: 2 * STAGE_HEIGHT / 3,
            text: "LEARN MODE",
            fill: "black",
            fontStyle: "bold",
            fontSize: 36,
            align: "center",
        })
        learnText.offsetX(learnText.width()/2);
        learnText.offsetY(learnText.height()/2);
        learnButton.add(learnText);
        this.selectGroup.add(learnButton);
        playButton.on("mouseenter", () => {
            document.body.style.cursor = "pointer";
        });
        playButton.on("mouseleave", () => {
            document.body.style.cursor = "default";
        });
        learnButton.on("mouseenter", () => {
            document.body.style.cursor = "pointer";
        });
        learnButton.on("mouseleave", () => {
            document.body.style.cursor = "default";
        });
        playButton.on("click", onPlayClick);
        learnButton.on("click", onLearnClick);
    }

    /**
     * Show the screen
     */
    show(): void {
        this.selectGroup.visible(true);
        this.selectGroup.getLayer()?.draw();
    }

    /**
     * Hide the screen
     */
    hide(): void {
        this.selectGroup.visible(false);
        this.selectGroup.getLayer()?.draw();
    }

    getGroup(): Konva.Group {
        return this.selectGroup;
    }
}