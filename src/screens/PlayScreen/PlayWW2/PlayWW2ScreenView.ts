
import Konva from "konva";
import type { View } from "../../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";
import { BackButton } from "../../../ui/BackButton.ts";

export class PlayWW2ScreenView implements View {

    private group: Konva.Group;

    private dialogueGroup: Konva.Group;
    private dialogueRect: Konva.Rect;
    private dialogueText: Konva.Text;
    private clickText: Konva.Text;
    private onDialogueClickHandlers: Array<() => void> = [];
    private onBackClickHandlers: Array<() => void> = [];

    private backButton: BackButton;

    constructor() {
        this.group = new Konva.Group({ visible: true });

        // White dialogue box
        this.dialogueGroup = new Konva.Group();

        this.dialogueRect = new Konva.Rect({
            x: 40,
            y: STAGE_HEIGHT - 650,
            width: STAGE_WIDTH - 80,
            height: 180,
            fill: "#D9D9D9",
            stroke: "black",
            strokeWidth: 2,
            cornerRadius: 8,
            opacity: 0.93
        });

        this.dialogueText = new Konva.Text({
            x: 60,
            y: STAGE_HEIGHT - 635,
            width: STAGE_WIDTH - 120,
            text: "",
            fontSize: 30,
            fontFamily: "Montserrat",
            fill: "black",
            lineHeight: 1.3,
            align: "center",
        });

        this.dialogueGroup.add(this.dialogueRect);
        this.dialogueGroup.add(this.dialogueText);

        this.clickText = new Konva.Text({
            x: 320,
            y: STAGE_HEIGHT - 505,
            width: STAGE_WIDTH - 100,
            text: "CLICK HERE TO CONTINUE",
            fontSize: 22,
            fontFamily: "Arial",
            fontStyle: "bold",
            fill: 'black',
            align: "center",
            
        });
        this.dialogueGroup.add(this.clickText);

        let opacity = 1;
        let direction = -1;
        setInterval(() => {
            opacity += direction * 0.05;
            if (opacity <= 0.1 || opacity >= 1) direction *= -1;
            this.clickText.opacity(opacity);
            this.group.getLayer()?.batchDraw();
        }, 50);

        this.dialogueGroup.on("click", () => {
            this.onDialogueClickHandlers.forEach(fn => fn());
        });

        this.group.add(this.dialogueGroup);
        this.dialogueGroup.on("mouseenter", () => {
            document.body.style.cursor = "pointer";
        });
        this.dialogueGroup.on("mouseleave", () => {
            document.body.style.cursor = "default";
        });


        // Back button
        this.backButton = new BackButton({
            text: "BACK",
            onClick: () => this.onBackClickHandlers.forEach(fn => fn())
        });

        this.group.add(this.backButton.getNode());
        this.createBackground();
    }

    /** Create background for the initial dialogue portion */
    private createBackground() {
        const alienImg = new Image();
        alienImg.src = "/alienGeneral.png";
        alienImg.onload = () => {
            const alien = new Konva.Image({
                // Center alien
                x: STAGE_WIDTH / 2,
                y: STAGE_HEIGHT / 2 - 5,
                width: 350,
                height: 450,
                offsetX: 175,
                offsetY: 100,
                image: alienImg,
            });
            this.group.add(alien);
            //alien.moveToBottom();
            this.group.getLayer()?.batchDraw();
        };

        const imageBg = new Image();
        imageBg.src = "/AlienSpaceShipDialogueBg.jpg";
        imageBg.onload = () => {
            const bg = new Konva.Image({
                x: 0,
                y: 0,
                width: STAGE_WIDTH,
                height: STAGE_HEIGHT,
                image: imageBg,
            });
            this.group.add(bg);
            bg.moveToBottom();
            this.group.getLayer()?.batchDraw();
        };
    }

    setDialogue(text: string) {
        this.dialogueText.text(text);
        this.group.getLayer()?.draw();
    }

    onDialogueClick(cb: () => void) {
        this.onDialogueClickHandlers.push(cb);
    }

    onBackClick(cb: () => void) {
        this.onBackClickHandlers.push(cb);
    }

    showDialogue() {
        this.dialogueGroup.visible(true);
    }

    hideDialogue() {
        this.dialogueGroup.visible(false);
    }

    // View interface
    getGroup() { return this.group; }
    show() { this.group.visible(true); this.group.getLayer()?.draw(); }
    hide() { this.group.visible(false); this.group.getLayer()?.draw(); }
}
