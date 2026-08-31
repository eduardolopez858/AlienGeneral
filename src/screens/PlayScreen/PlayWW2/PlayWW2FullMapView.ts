
import Konva from "konva";
import type { View } from "../../../types.ts";
import { BackButton } from "../../../ui/BackButton.ts";
import { HintButton } from "../HintFeature.ts";
import { PlayWW2Model } from "./PlayWW2Model.ts";
import { Header } from "../../../ui/Header.ts";

export class PlayWW2FullMapView implements View {

    private group: Konva.Group;
    private onZoomClickHandlers: Array<(target: string) => void> = [];
    private onBackClickHandlers: Array<() => void> = [];
    private hintButton: HintButton;
    private model: PlayWW2Model;
    private header: Header;

    constructor(model: PlayWW2Model) {
        this.model = model;
        this.group = new Konva.Group({ visible: true });

        this.header = new Header(this.model, "PLAY MODE", "WORLD WAR 2");
        this.group.add(this.header.getNode());

        // Load WW2 map
        const mapObj = new Image();
        mapObj.src = "/WorldWar2Map.png";
        mapObj.onload = () => {
            const img = new Konva.Image({
                x: 145,
                y: 110,
                width: 675,
                height: 459,
                image: mapObj
            });
            this.group.add(img);

            // force redraw after map loads
            this.group.getLayer()?.batchDraw();

            // Create zoom icons
            this.createZoomIcon(275, 350, "America");
            this.createZoomIcon(500, 330, "Europe");
            this.createZoomIcon(650, 350, "Asia");
        };

        // Back button
        const backBtn = new BackButton({
            text: "BACK",
            onClick: () => this.onBackClickHandlers.forEach(fn => fn())
        });

        this.group.add(backBtn.getNode());

        this.hintButton = new HintButton(this.model);
        this.group.add(this.hintButton.getNode());
        this.group.add(...this.hintButton.getPopupNodes());
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

            // force redraw after zoom icon loads
            this.group.getLayer()?.batchDraw();
        });
    }

    onZoomClick(cb: (target: string) => void) {
        this.onZoomClickHandlers.push(cb);
    }

    onBackClick(cb: () => void) {
        this.onBackClickHandlers.push(cb);
    }

    getHeader(): Header {
        return this.header;
    }

    // View interface
    getGroup() { return this.group; }
    show() { this.group.visible(true); this.group.getLayer()?.draw(); }
    hide() { this.hintButton.forceClose(); this.group.visible(false); this.group.getLayer()?.draw(); }
}
