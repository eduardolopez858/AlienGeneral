import Konva from "konva";
import { PlayWW1Model } from "./PlayWW1/PlayWW1Model.ts";
import { PlayWW2Model } from "./PlayWW2/PlayWW2Model.ts";
// Will edit later to make it work for WW2

export class HintButton {
    private group: Konva.Group;
    private popupGroup: Konva.Group;
    private popupTopGroup: Konva.Group;
    private model: PlayWW1Model | PlayWW2Model;

    constructor(model: PlayWW1Model | PlayWW2Model) {
        this.model = model;

        this.group = new Konva.Group();
        this.popupGroup = new Konva.Group({ visible: false });
        this.popupTopGroup = new Konva.Group({ visible: false });


        // Main Button
        const rect = new Konva.Rect({
            x: 800,
            y: 590,
            width: 140,
            height: 60,
            fill: "#D9D9D9",
            cornerRadius: 3,
        });

        const label = new Konva.Text({
            x: 870,
            y: 604,
            text: "HINT",
            fontSize: 35,
            fontFamily: "Arial",
            fontStyle: "bold",
            fill: "black",
            align: "center"
        });
        label.offsetX(label.width() / 2);

        this.group.add(rect, label);

        // click opens popup
        this.group.on("click", () => this.showPopup());
        this.addPointer(this.group);
    }

    // expose nodes to view
    getNode() {
        return this.group;
    }
    getPopupNodes() {
        return [this.popupGroup, this.popupTopGroup];
    }

    // Closes popup (used to also close when change screen)
    forceClose() {
        this.popupGroup.visible(false);
        this.popupTopGroup.visible(false);
        this.group.getLayer()?.batchDraw();
    }

    /**
     *  Main Popup with options
     */ 
    private showPopup() {
        this.popupGroup.destroyChildren();
        this.popupTopGroup.destroyChildren();

        this.popupGroup.visible(true);
        this.popupTopGroup.visible(true);

        // Bring to front
        this.popupGroup.moveToTop();
        this.popupTopGroup.moveToTop();


        // Base
        const width = 300;
        const height = 300;

        const rect = new Konva.Rect({
            x: 645,
            y: 275,
            width,
            height,
            fill: "#292929",
            stroke: "white",
            strokeWidth: 3,
            cornerRadius: 10,
            shadowColor: "black",
            shadowBlur: 10,
            shadowOffset: { x: 5, y: 5 },
            shadowOpacity: 0.3,
        });
        this.popupGroup.add(rect);

        const text = new Konva.Text({
            x: rect.x() +30,
            y: rect.y()+60,
            text: "CHOOSE A HINT:",
            fontSize: 30,
            fontFamily: "Arial",
            fontStyle: "bold",
            fill: "white",
            align: "left",
            lineHeight: 1.4,
        });
        this.popupGroup.add(text);

        // Flag button Set Up
        const flagButton = new Konva.Rect({
            x: 670,
            y: 400,
            width: 250,
            height: 60,
            fill: "#D9D9D9",
            cornerRadius: 3,
        });
        this.popupGroup.add(flagButton);
        this.addPointer(flagButton);

        const flagText = new Konva.Text({
            x: flagButton.x() +130,
            y: flagButton.y()+14,
            text: "FLAG",
            fontSize: 35,
            fontFamily: "Arial",
            fontStyle: "bold",
            fill: "black",
        });
        flagText.offsetX(flagText.width() / 2);
        this.popupGroup.add(flagText);
        this.addPointer(flagText);  
        
        flagButton.on("click", () => {
            this.openSecondaryPopup("Country's Flag Then:");
        });
        flagText.on("click", () => {
            this.openSecondaryPopup("Country's Flag Then:");
        });


        // Fact Button Setup
        const factButton = new Konva.Rect({
            x: 670,
            y: 490,
            width: 250,
            height: 60,
            fill: "#D9D9D9",
            cornerRadius: 3,
        });
        this.popupGroup.add(factButton);
        this.addPointer(factButton);

        const factText = new Konva.Text({
            x: factButton.x() +130,
            y: factButton.y()+14,
            text: "FACT",
            fontSize: 35,
            fontFamily: "Arial",
            fontStyle: "bold",
            fill: "black",
        });
        factText.offsetX(factText.width() / 2);
        this.popupGroup.add(factText);
        this.addPointer(factText);

        factButton.on("click", () => {
            this.openSecondaryPopup("Fact:");
        });
        factText.on("click", () => {
            this.openSecondaryPopup("Fact:");
        });

        // CLOSE BUTTON
        this.createCloseButton(rect.x() + width - 30, rect.y() + 10);
        this.group.getLayer()?.batchDraw();
    }

    /**
     *  Flag and Fact Popup
     */ 
    private openSecondaryPopup(title: string) {
        const stageIndex = this.model.stage - 1;
        const fact = this.model.factHints[stageIndex];
        const flag = this.model.flagImages[stageIndex];

        // Close the main popup
        this.forceClose();

        // Clear old secondary content
        this.popupGroup.destroyChildren();
        this.popupTopGroup.destroyChildren();

        this.popupGroup.visible(true);
        this.popupTopGroup.visible(true);

        const width = 370;
        const height = 380;

        const bg = new Konva.Rect({
            x: 575,
            y: 195,
            width,
            height,
            fill: "#D0D0D0",
            stroke: "white",
            strokeWidth: 3,
            cornerRadius: 10,
            shadowColor: "black",
            shadowBlur: 10,
            shadowOffset: { x: 5, y: 5 },
            shadowOpacity: 0.3,
        });
        this.popupGroup.add(bg);

        const titleText = new Konva.Text({
            x: bg.x() + 20,
            y: bg.y() + 40,
            width: 300,
            text: title,
            fontSize: 30,
            fontFamily: "Arial",
            fontStyle: "bold",
            fill: "black",
            align: "left",
            lineHeight: 1.2,
        });
        this.popupGroup.add(titleText);

        // Popup Content
        if (title === "Country's Flag Then:") {
            const flagImageObj = new Image();
            flagImageObj.src = flag;

            flagImageObj.onload = () => {
                const flagImage = new Konva.Image({
                    x: bg.x() + 90,
                    y: bg.y() + 140,
                    width: 200,
                    height: 120,
                    image: flagImageObj,
                });

                this.popupGroup.add(flagImage);
                this.group.getLayer()?.batchDraw();
            };
        }

        if (title === "Fact:") {
            const factNode = new Konva.Text({
                x: bg.x() + 20,
                y: bg.y() + 90,
                width: 330,
                text: fact,
                fontSize: 25,
                fontFamily: "Arial",
                fontStyle: "bold",
                fill: "black",
                align: "left",
                lineHeight: 1.2,
            });
            this.popupGroup.add(factNode);
        }

        // Close button
        this.createCloseButton(bg.x() + width - 30, bg.y() + 10);

        this.group.getLayer()?.batchDraw();
    }

    // creates 'X' button for closing
    private createCloseButton(x: number, y: number): Konva.Text {
        const close = new Konva.Text({
            x,
            y,
            text: "X",
            fontSize: 28,
            fontFamily: "Arial Black",
            fill: "red",
        });

        close.on("click", () => this.forceClose());
        this.addPointer(close);
        this.popupTopGroup.add(close);

        return close;
    }

    // Makes buttons have pointer
    private addPointer(node: Konva.Node) {
        node.on("mouseenter", () => (document.body.style.cursor = "pointer"));
        node.on("mouseleave", () => (document.body.style.cursor = "default"));
    }
}
