import Konva from "konva";
import type { View } from "../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts";

/**
 * This is where we edit the setup of the base used for all level's main screen
 */

export interface LearnConfig {

    // To change based on Mode
    headerLeft: string;
    // To Change based on War
    headerRight: string;

    mapImageSrc: string;
    zoomButtons: {
        level: string;
        x: number;
        y: number;
    }[];
}

/**
 * BaseLearnLevelScreenView - Renders the Learn screen
 * 
 */
export abstract class BaseLearnLevelScreenView implements View {
    protected group: Konva.Group;
    protected bgGroup: Konva.Group;
    protected mapGroup: Konva.Group;
    protected zoomGroup: Konva.Group;
    protected uiGroup: Konva.Group;

    protected config: LearnConfig;

    constructor(onStartClick: (level: string) => void, config: LearnConfig) {

        this.config = config;
        // Layered structure for stacking, fixes issue of zoom icon not consistently showing up
        this.group = new Konva.Group({ visible: true });
        this.bgGroup = new Konva.Group();
        this.mapGroup = new Konva.Group();
        this.zoomGroup = new Konva.Group();
        this.uiGroup = new Konva.Group();

        // Add groups in visual order
        this.group.add(this.bgGroup);
        this.group.add(this.mapGroup);
        this.group.add(this.zoomGroup);
        this.group.add(this.uiGroup);

        // Build Screen
        this.createBackground();
        this.createMapImage();
        this.createUI(onStartClick);
        this.createZoomButtons(onStartClick);
    }

    // loads background image
    private createBackground() {
        const img = new Image();
        img.src = "/Space.jpg";
        img.onload = () => {
        this.bgGroup.add(
            new Konva.Image({
            x: 0,
            y: 0,
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            image: img,
            })
        );
        this.group.getLayer()?.batchDraw();
        };
    }

    // sets up and allows us to change the map image for each level
    private createMapImage() {
        const img = new Image();
        img.src = this.config.mapImageSrc;
        img.onload = () => {
        this.mapGroup.add(
            new Konva.Image({
            x: 145,
            y: 115,
            width: 675,
            height: 459,
            image: img,
            })
        );
        this.group.getLayer()?.batchDraw();
        };
    }

    // same zoom image for all zoom buttons, but allows us to have multiple buttons and place them where we want
    private createZoomButtons(onStartClick: (level: string) => void) {
        this.config.zoomButtons.forEach((btn) => {
        Konva.Image.fromURL("/uiZoom.jpg", (image) => {
            image.scale({ x: 0.075, y: 0.075 });
            image.position({ x: btn.x, y: btn.y });
            image.offsetX(image.width() / 2);
            image.offsetY(image.height() / 2);

            image.on("click", () => onStartClick(btn.level));
            this.addPointerCursor(image);

            this.zoomGroup.add(image);
            image.moveToTop();

            this.group.getLayer()?.batchDraw();
        });
        });
    }

    // Creates Header, Title, Back Button
    private createUI(onStartClick: (level: string) => void) {
        // Heading
        const HeadingGroup = new Konva.Group();
        const HeadingBlock = new Konva.Rect({
            x: -1,
            y: -1,
            width: STAGE_WIDTH +2,
            height: 47,
            fill: "#D9D9D9",
            cornerRadius: 3,
        });

        // game mode
        const LeftText = new Konva.Text({
            x: 100,
            y: 10,
            text: this.config.headerLeft,
            fontSize: 23,
            fontFamily: "Arial Black",
            fontStyle: "bold",
            fill: "black",
            stroke: "black",
            strokeWidth: 0,
            align: "left",
            verticalAlign: "top",
        });
        LeftText.offsetX(LeftText.width() / 2);

        // game level
        const RightText = new Konva.Text({
            y: 10,
            text: this.config.headerRight,
            fontSize: 23,
            fontFamily: "Arial Black",
            fontStyle: "bold",
            fill: "black",
            stroke: "black",
            strokeWidth: 0,
            align: "Right",
            verticalAlign: "top",
        });
        RightText.x(STAGE_WIDTH - 20 - RightText.width());

        HeadingGroup.add(HeadingBlock);
        HeadingGroup.add(RightText);
        HeadingGroup.add(LeftText);
        this.uiGroup.add(HeadingGroup);


        // Title
        const title = new Konva.Text({
            x: STAGE_WIDTH / 2,
            y: 80,
            text: "CLICK ON AREA YOU WANT TO ZOOM IN",
            lineHeight: 1.3,
            fontSize: 25,
            fontFamily: "Arial Black",
            fontStyle: "bold",
            fill: "black",
            stroke: "white",
            strokeWidth: 1.5,
            align: "center",
            verticalAlign: "top",
        });
        title.offsetX(title.width() / 2);
        this.uiGroup.add(title);

        // Back button
        const BackButtonGroup = new Konva.Group();
        const BackButton = new Konva.Rect({
            x: 30,
            y: 590,
            width: 140,
            height: 60,
            fill: "#D9D9D9",
            cornerRadius: 3,
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
        this.addPointerCursor(BackButtonGroup);

        this.uiGroup.add(BackButtonGroup);
    }

    // used for pointer to appear on clickable objects
    protected addPointerCursor(node: Konva.Node) {
        node.on("mouseenter", () => (document.body.style.cursor = "pointer"));
        node.on("mouseleave", () => (document.body.style.cursor = "default"));
    }

    /**
    * Show the screen
    */
    show() {
        this.group.visible(true);
        this.group.getLayer()?.draw();
    }

    /**
    * Hide the screen
    */
    hide() {
        this.group.visible(false);
        this.group.getLayer()?.draw();
    }

    getGroup() {
        return this.group;
    }
}
