import Konva from "konva";
import { STAGE_WIDTH } from "../constants.ts";
import { PlayWW1Model } from "../screens/PlayScreen/PlayWW1/PlayWW1Model.ts";
import { PlayWW2Model } from "../screens/PlayScreen/PlayWW2/PlayWW2Model.ts";
// Will edit later to make it work for WW2

export class Header {
    private group: Konva.Group;
    private model: PlayWW1Model | PlayWW2Model;

    constructor(model: PlayWW1Model | PlayWW2Model, leftText: string, rightText: string) {
        this.group = new Konva.Group({ x: 0, y: 0 });
        this.model = model;

        const centerText = "STAGE: " + this.model.stage;

        // Background bar
        const bg = new Konva.Rect({
            x: 0,
            y: 0,
            width: STAGE_WIDTH,
            height: 47,
            fill: "#D9D9D9",
            cornerRadius: 3
        });

        // Left text (game mode)
        const left = new Konva.Text({
            x: 100,
            y: 10,
            text: leftText,
            fontSize: 23,
            fontFamily: "Arial Black",
            fontStyle: "bold",
            fill: "black"
        });
        left.offsetX(left.width() / 2);

        // Right text (War)
        const right = new Konva.Text({
            y: 10,
            text: rightText,
            fontSize: 23,
            fontFamily: "Arial Black",
            fontStyle: "bold",
            fill: "black",
        });
        right.x(STAGE_WIDTH - 20 - right.width());

        // Center Text (Stage)
        const center = new Konva.Text({
            y: 10,
            text: centerText,
            fontSize: 23,
            fontFamily: "Arial Black",
            fontStyle: "bold",
            fill: "black",
            name: "centerText"
        });
        center.x(STAGE_WIDTH / 2);
        center.offsetX(center.width() / 2);

        this.group.add(bg, left, right, center);
    }

    updateCenterText(newText: string) {
        const center = this.group.findOne(".centerText") as Konva.Text;
        if (!center) return;

        center.text(newText);
        center.offsetX(center.width() / 2);
        this.group.getLayer()?.batchDraw();
    }
    getNode() {
        return this.group;
    }
}
