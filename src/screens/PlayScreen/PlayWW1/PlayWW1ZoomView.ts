// src/screens/PlayScreen/PlayWW1/PlayWW1ZoomView.ts

import Konva from "konva";
import type { View, CoordinateMarkings } from "../../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";
import { BackButton } from "../../../ui/BackButton.ts";
import { PlayWW1Model } from "./PlayWW1Model.ts";
// Used for Hint
import { HintButton } from "../HintFeature.ts";

import { Header } from "../../../ui/Header.ts";

type alienEncoding = [number, number, Konva.Group | null, Konva.Animation | null]; // x, y, image, animation
interface alienDictionary {
    [key: string]: alienEncoding;
}

export class PlayWW1ZoomView implements View {

    private group: Konva.Group;
    private onMapClickHandlers: Array<() => void> = [];
    private onBackClickHandlers: Array<() => void> = [];
    private alienDict: alienDictionary = {};
    private incorrectPopup: Konva.Group;
    private incorrectSubtext: Konva.Text;
    private model: PlayWW1Model;
    private hintButton: HintButton;
    private header: Header;

    // Mission overlay
    private missionGroup: Konva.Group;
    private missionRect: Konva.Rect;
    private missionText: Konva.Text;

    constructor(imagePath: string, coords: CoordinateMarkings, onClick: (country: string) => void, playModel: PlayWW1Model) {
        this.group = new Konva.Group({ visible: true });
        this.model = playModel;
        this.incorrectPopup = new Konva.Group();

        // Header
        this.header = new Header(this.model, "PLAY MODE", "WORLD WAR 1");
        this.group.add(this.header.getNode());

        // Mission box overlay (box + text)
        this.missionGroup = new Konva.Group({
            x: 0,
            y: STAGE_HEIGHT - 170, // default; can be adjusted via setMissionBoxY()
        });

        this.missionRect = new Konva.Rect({
            x: 40,
            y: 0,
            width: STAGE_WIDTH - 80,
            height: 130,
            fill: "#D9D9D9",
            stroke: "black",
            strokeWidth: 2,
            cornerRadius: 8,
            opacity: 0.8,
        });

        this.missionText = new Konva.Text({
            x: 60,
            y: 15,
            width: STAGE_WIDTH - 120,
            text: "",
            fontSize: 26,
            fontFamily: "Montserrat",
            fill: "black",
            lineHeight: 1.2,
            align: "center",
        });

        this.missionGroup.add(this.missionRect);
        this.missionGroup.add(this.missionText);
        this.group.add(this.missionGroup);

        // Aliens
        for (let key in coords) {
            this.alienDict[key] = [coords[key][0], coords[key][1], null, null];
            Konva.Image.fromURL("/alien.png", (image) => {
                image.width(33);
                image.height(45);
                image.offsetX(image.width() / 2);
                image.offsetY(image.height() / 2);

                image.on("mouseenter", () => (document.body.style.cursor = "pointer"));
                image.on("mouseleave", () => (document.body.style.cursor = "default"));

                this.alienDict[key][2] = new Konva.Group();
                this.alienDict[key][2]!.x(this.alienDict[key][0]);
                this.alienDict[key][2]!.y(this.alienDict[key][1]);

                this.alienDict[key][2]!.add(image);
                this.alienDict[key][2]!.on("click", () => onClick(key));
                this.group.add(this.alienDict[key][2]!);

                // ensure mission box stays above aliens
                this.missionGroup.moveToTop();
                this.group.getLayer()?.draw();
            });

            const startY = this.alienDict[key][1];
            const amplitude = 25;
            const speed = 2;

            const anim = new Konva.Animation((frame) => {
                if (!frame) return;

                const newY = startY + Math.sin((frame.time * speed) / 100) * amplitude - amplitude / 2;
                if (this.alienDict[key][2] != null)
                    this.alienDict[key][2]!.y(newY);
            }, this.group.getLayer());
            this.alienDict[key][3] = anim;
        }

        const incorrectBox = new Konva.Rect({
            width: STAGE_WIDTH / 2,
            height: STAGE_HEIGHT / 4,
            fill: "red",
        });
        incorrectBox.x(STAGE_WIDTH / 2 - incorrectBox.width() / 2);
        incorrectBox.y(STAGE_HEIGHT / 4 - incorrectBox.height() / 2);
        this.incorrectPopup.add(incorrectBox);

        const incorrectText = new Konva.Text({
            text: "Incorrect!",
            fontStyle: "bold",
            fontSize: 48,
            fill: "black",
        });
        incorrectText.x(STAGE_WIDTH / 2 - incorrectText.width() / 2);
        incorrectText.y(STAGE_HEIGHT / 4 - incorrectText.height() / 2 - 20);
        this.incorrectPopup.add(incorrectText);

        this.incorrectSubtext = new Konva.Text({
            text: "",
            fontStyle: "bold",
            fontSize: 24,
            fill: "black",
            align: "center",
        });
        this.incorrectSubtext.x(STAGE_WIDTH / 2 - this.incorrectSubtext.width() / 2);
        this.incorrectSubtext.y(
            STAGE_HEIGHT / 4 - this.incorrectSubtext.height() / 2
            + incorrectText.height() + 10
        );
        this.incorrectPopup.add(this.incorrectSubtext);

        this.incorrectPopup.visible(false);
        this.group.add(this.incorrectPopup);

        // Load Zoom Image
        const imgObj = new Image();
        imgObj.src = imagePath;
        imgObj.onload = () => {
            const img = new Konva.Image({
                x: 145,
                y: 110,
                width: 675,
                height: 459,
                image: imgObj
            });

            this.group.add(img);
            img.moveToBottom();

            // keep mission box above the map
            this.missionGroup.moveToTop();
            this.group.getLayer()?.draw();
        };

        // Back
        const backBtn = new BackButton({
            text: "BACK",
            onClick: () => this.onBackClickHandlers.forEach(fn => fn())
        });

        this.group.add(backBtn.getNode());

        // Hint button
        this.hintButton = new HintButton(this.model);
        this.group.add(this.hintButton.getNode());
        this.group.add(...this.hintButton.getPopupNodes());

        // finally, ensure mission box is on top of everything
        this.missionGroup.moveToTop();
    }

    playCorrectAnimation(country: string): void {
        if (this.alienDict[country][3] != null)
            this.alienDict[country][3]!.start();
        setTimeout(() => this.stopCorrectAnimation(country), 1000);
    }

    stopCorrectAnimation(country: string): void {
        if (this.alienDict[country][3] != null)
            this.alienDict[country][3]!.stop();
        if (this.alienDict[country][2] != null)
            this.alienDict[country][2]!.y(this.alienDict[country][1]);
    }

    playIncorrectAnimation(): void {
        this.incorrectSubtext.text(this.model.getGuessInfo());
        this.incorrectSubtext.x(STAGE_WIDTH / 2 - this.incorrectSubtext.width() / 2);
        this.incorrectSubtext.y(STAGE_HEIGHT / 4 - this.incorrectSubtext.height() / 2 + 30);
        this.incorrectPopup.visible(true);
        this.incorrectPopup.moveToTop();
        this.group.getLayer()?.draw();
        setTimeout(() => this.stopIncorrectAnimation(), 1500);
    }

    stopIncorrectAnimation(): void {
        this.incorrectPopup.visible(false);
        this.group.getLayer()?.draw();
    }

    onMapClick(cb: () => void) {
        this.onMapClickHandlers.push(cb);
    }

    onBackClick(cb: () => void) {
        this.onBackClickHandlers.push(cb);
    }

    getHeader(): Header {
        return this.header;
    }

    getGroup() { return this.group; }
    show() { this.group.visible(true); this.group.getLayer()?.draw(); }
    hide() {
        this.hintButton.forceClose();
        this.group.visible(false);
        this.group.getLayer()?.draw();
    }

    // Called by controller when stage starts / dialogue finishes
    setMissionText(text: string) {
        this.missionText.text(text);
        this.missionGroup.moveToTop();
        this.group.getLayer()?.draw();
    }

    // Optional: adjust vertical position of mission box
    setMissionBoxY(y: number) {
        this.missionGroup.y(y);
        this.missionGroup.moveToTop();
        this.group.getLayer()?.draw();
    }
}
