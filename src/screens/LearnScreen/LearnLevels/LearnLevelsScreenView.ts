import Konva from "konva";
import type { View } from "../../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";

/**
 * LearnLevelsScreenView - Renders the Learn Levels screen
 */
export class LearnLevelsScreenView implements View {
    private group: Konva.Group;

    constructor(onStartClick: (level: string) => void) {
        this.group = new Konva.Group({ visible: true });

        // Background image
        const imageObj = new Image();
        imageObj.src = "/Space.jpg";
        imageObj.onload = () => {
            const bg = new Konva.Image({
                x: 0,
                y: 0,
                width: STAGE_WIDTH,
                height: STAGE_HEIGHT,
                image: imageObj,
            });
            this.group.add(bg);
            bg.moveToBottom();
        };


        // Title text
        const title = new Konva.Text({
            x: STAGE_WIDTH / 2,
            y: 40,
            text: "LEARN MODE\nLEVELS",
            lineHeight: 1.3, //space between lines
            fontSize: 70,
            fontFamily: "Arial Black",
            fontStyle: "bold",
            fill: "black",
            stroke: "white",
            strokeWidth: 2,
            align: "center",
            verticalAlign: "top",
        });
        // Center the text using offsetX
        title.offsetX(title.width() / 2);
        this.group.add(title);

        // World War 1 Button
        const WW1ButtonGroup = new Konva.Group();
        const WW1Button = new Konva.Rect({
            x: STAGE_WIDTH / 2,
            y: 300,
            width: STAGE_WIDTH / 2,
            height: STAGE_WIDTH / 9 ,
            fill: "#D9D9D9",
        });
        WW1Button.offsetX(WW1Button.width() /2);
        WW1Button.offsetY(WW1Button.height() /2);

        const WW1Text = new Konva.Text({
            x: STAGE_WIDTH / 2,
            y: 280,
            text: "WORLD WAR 1",
            fontSize: 40,
            fontFamily: "Arial",
            fontStyle: "bold",
            fill: "black",
            align: "center",
        });
        WW1Text.offsetX(WW1Text.width() / 2);
        WW1ButtonGroup.add(WW1Button);
        WW1ButtonGroup.add(WW1Text);
        WW1ButtonGroup.on("click", () => onStartClick("WW1"));

        // Get pointer while on button
        WW1ButtonGroup.on("mouseenter", () => {
            document.body.style.cursor = "pointer";
        });
        WW1ButtonGroup.on("mouseleave", () => {
            document.body.style.cursor = "default";
        });

        this.group.add(WW1ButtonGroup);

        // World War 2 Button
        const WW2ButtonGroup = new Konva.Group();
        const WW2Button = new Konva.Rect({
            x: STAGE_WIDTH / 2,
            y: 470,
            width: STAGE_WIDTH / 2,
            height: STAGE_WIDTH / 9 ,
            fill: "#D9D9D9",
        });
        WW2Button.offsetX(WW2Button.width() /2);
        WW2Button.offsetY(WW2Button.height() /2);

        const WW2Text = new Konva.Text({
            x: STAGE_WIDTH / 2,
            y: 450,
            text: "WORLD WAR 2",
            fontSize: 40,
            fontFamily: "Arial",
            fontStyle: "bold",
            fill: "black",
            align: "center",
        });
        WW2Text.offsetX(WW2Text.width() / 2);
        WW2ButtonGroup.add(WW2Button);
        WW2ButtonGroup.add(WW2Text);
        WW2ButtonGroup.on("click", () => onStartClick("WW2"));

        // Get pointer while on button
        WW2ButtonGroup.on("mouseenter", () => {
            document.body.style.cursor = "pointer";
        });
        WW2ButtonGroup.on("mouseleave", () => {
            document.body.style.cursor = "default";
        });

        this.group.add(WW2ButtonGroup);

        // Back Button
        const BackButtonGroup = new Konva.Group();
        const BackButton = new Konva.Rect({
            x: 30,
            y: 590,
            width: 140,
            height: 60,
            fill: "#D9D9D9",
        });
        const BackButtonText = new Konva.Text({
            x: 100,
            y: 604,
            text: "BACK",
            fontSize: 35,
            fontFamily: "Arial",
            fontStyle: "bold",
            fill: "black",
            align: "center",
        });
        BackButtonText.offsetX(BackButtonText.width() / 2);
        BackButtonGroup.add(BackButton);
        BackButtonGroup.add(BackButtonText);
        BackButtonGroup.on("click", () => onStartClick("BackButton"));

        // Get pointer while on button
        BackButtonGroup.on("mouseenter", () => {
            document.body.style.cursor = "pointer";
        });
        BackButtonGroup.on("mouseleave", () => {
            document.body.style.cursor = "default";
        });

        this.group.add(BackButtonGroup);

    }


    /**
     * Show the screen
     */
    show(): void {
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

}

