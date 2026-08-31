// src/screens/PlayScreen/PlayWW1/PlayWW1FullMapView.ts

import Konva from "konva";
import type { View } from "../../../types.ts";
import { BackButton } from "../../../ui/BackButton.ts";
// Used for Hint
import { HintButton } from "../HintFeature.ts";
import { PlayWW1Model } from "./PlayWW1Model.ts";

import { Header } from "../../../ui/Header.ts";
import { STAGE_HEIGHT } from "../../../constants.ts";
import { STAGE_WIDTH } from "../../../constants.ts";

export class PlayWW1FullMapView implements View {

    private group: Konva.Group;
    private onZoomClickHandlers: Array<(target: string) => void> = [];
    private onBackClickHandlers: Array<() => void> = [];

    // Mission overlay
    private missionGroup: Konva.Group;
    private missionRect: Konva.Rect;
    private missionText: Konva.Text;

    // Used for hint
    private hintButton: HintButton;
    private model: PlayWW1Model;
    private header: Header;

    // Needed to add model for hint
    constructor(model: PlayWW1Model) {
        this.model = model;
        this.group = new Konva.Group({ visible: true });

        // Header
        this.header = new Header(this.model, "PLAY MODE", "WORLD WAR 1");
        this.group.add(this.header.getNode());

        // Mission box overlay (box + text)
        this.missionGroup = new Konva.Group({
            x: 0,
            y: STAGE_HEIGHT - 170, // default Y; can be adjusted with setMissionBoxY()
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

        // Load Full Map
        const mapObj = new Image();
        mapObj.src = "/WorldWar1Map.png";
        mapObj.onload = () => {
            const img = new Konva.Image({
                x: 145,
                y: 110,
                width: 675,
                height: 459,
                image: mapObj
            });
            this.group.add(img);
            img.moveToBottom();

            // ✅ keep mission box above the map
            this.missionGroup.moveToTop();
            this.group.getLayer()?.batchDraw();

            // ✅ create zoom icons AFTER the map is added, so they stack above the map
            this.createZoomIcon(540, 320, "OE");
            this.createZoomIcon(250, 300, "US");
            this.createZoomIcon(500, 300, "Europe");
            this.createZoomIcon(650, 230, "Russia");
        };

        // Back button
        const backBtn = new BackButton({
            text: "BACK",
            onClick: () => this.onBackClickHandlers.forEach(fn => fn())
        });

        this.group.add(backBtn.getNode());

        // Hint button
        this.hintButton = new HintButton(this.model);
        this.group.add(this.hintButton.getNode());
        this.group.add(...this.hintButton.getPopupNodes());

        // Make sure mission box stays above everything just added
        this.missionGroup.moveToTop();
    }

    private createZoomIcon(x: number, y: number, target: string) {
        Konva.Image.fromURL("/uiZoom.jpg", (img) => {
            img.scale({ x: 0.07, y: 0.07 });
            img.x(x);
            img.y(y);
            img.offsetX(img.width() / 2);
            img.offsetY(img.height() / 2);

            img.on("click", () =>
                this.onZoomClickHandlers.forEach(fn => fn(target))
            );

            img.on("mouseenter", () => (document.body.style.cursor = "pointer"));
            img.on("mouseleave", () => (document.body.style.cursor = "default"));

            this.group.add(img);

            // ✅ ensure mission box stays over zoom icons
            this.missionGroup.moveToTop();
            this.group.getLayer()?.batchDraw();
        });
    }

    onZoomClick(cb: (target: string) => void) {
        this.onZoomClickHandlers.push(cb);
    }

    onBackClick(cb: () => void) {
        this.onBackClickHandlers.push(cb);
    }

    // Expose header to controller
    getHeader(): Header {
        return this.header;
    }

    // View interface
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
