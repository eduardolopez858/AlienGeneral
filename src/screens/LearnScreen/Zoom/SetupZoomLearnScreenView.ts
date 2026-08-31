import Konva from "konva";
import type { View } from "../../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";

// So we can change the placement of the pin and its label
export interface CountryPin {
  x: number;
  y: number;
  name: string;
}

// so we can change important specifics for each zoom screen
export interface CountryConfig {
  headerLeft: string;
  headerRight: string;
  mapImageSrc: string;
  pins: CountryPin[];
  countryInfo: Record<string, string>;
} 

export abstract class SetupZoomLearnScreenView implements View {
  protected group: Konva.Group;
  protected bgGroup: Konva.Group;
  protected mapGroup: Konva.Group;
  protected pinGroup: Konva.Group;
  protected uiGroup: Konva.Group;
  protected popupGroup: Konva.Group;
  protected popupTopGroup: Konva.Group;

  protected config: CountryConfig;

  constructor(onStartClick: (level: string) => void, config: CountryConfig) {
    this.config = config;

    // Layer groups
    this.group = new Konva.Group({ visible: true });
    this.bgGroup = new Konva.Group();
    this.mapGroup = new Konva.Group();
    this.pinGroup = new Konva.Group();
    this.uiGroup = new Konva.Group();
    this.popupGroup = new Konva.Group({ visible: false });
    this.popupTopGroup = new Konva.Group({ visible: false }); // made to keep x button on top

    // Add to stacking order
    this.group.add(this.bgGroup);
    this.group.add(this.mapGroup);
    this.group.add(this.pinGroup);
    this.group.add(this.uiGroup);
    this.group.add(this.popupGroup);
    this.group.add(this.popupTopGroup);

    // Build view
    this.createBackground();
    this.createMapImage();
    this.createUI(onStartClick);
    this.createPins();
  }

  /**
   * Creates Background
   */
  private createBackground() {
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
      this.bgGroup.add(bg);
      bg.moveToBottom();
      this.group.getLayer()?.batchDraw();
    };
  }

  /**
   * Creates Map
   */
  private createMapImage() {
    const mapImageObj = new Image();
    mapImageObj.src = this.config.mapImageSrc;
    mapImageObj.onload = () => {
      const mapImage = new Konva.Image({
        x: 145,
        y: 115,
        width: 675,
        height: 459,
        image: mapImageObj,
      });
      this.mapGroup.add(mapImage);
      this.group.getLayer()?.batchDraw();
    };
  }

  /**
   * Creates Pin
   */
  private createPins() {
    this.config.pins.forEach((pin) => {
      this.createPinButton(pin.x, pin.y, pin.name);
    });
  }

  private createPinButton(xPos: number, yPos: number, label: string) {
    Konva.Image.fromURL("/Pin.png", (image) => {
      image.scale({ x: 0.050, y: 0.050 });
      image.position({ x: xPos, y: yPos });
      image.offsetX(image.width() / 2);
      image.offsetY(image.height() / 2);

      const text = new Konva.Text({
        x: xPos + 23,
        y: yPos - 15,
        text: label,
        fontSize: 22,
        fontFamily: "Arial Black",
        fontStyle: "bold",
        fill: "black",
        stroke: "white",
        strokeWidth: 0.5,
      });

      const pinGroup = new Konva.Group();
      pinGroup.add(image);
      pinGroup.add(text);

      pinGroup.on("click", () => this.showCountryInfo(label));
      this.addPointerCursor(pinGroup);

      this.pinGroup.add(pinGroup);
      pinGroup.moveToTop();

      this.group.getLayer()?.batchDraw();
    });
  }

  /**
   * Creates pop up
   */
  private showCountryInfo(countryName: string) {
    this.popupGroup.destroyChildren();
    this.popupGroup.visible(true);

    const popupWidth = 600;
    const popupHeight = 400;

    const rect = new Konva.Rect({
      x: (STAGE_WIDTH - popupWidth) / 2,
      y: (STAGE_HEIGHT - popupHeight) / 2,
      width: popupWidth,
      height: popupHeight,
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

    // Binary Waterfall
    const decor = new Image();
    decor.src = "/PopUpDecor.png";
    decor.onload = () => {
      const decorImg = new Konva.Image({
        x: rect.x() + 383,
        y: rect.y() + 2,
        width: 220,
        height: 441,
        opacity:0.5,
        image: decor
      });
      this.popupGroup.add(decorImg);
      this.group.getLayer()?.batchDraw();
    };

    // Get info text
    const info = this.config.countryInfo[countryName] || "No information available.";
    const nametext = countryName + ":";

    // Make country name a separate textbox in order to maek it bigger and bold
    const name = new Konva.Text({
      x: rect.x() + 30,
      y: rect.y() + 10,
      width: popupWidth - 60,
      text: nametext,
      fontSize: 25,
      fontStyle: "bold",
      fontFamily: "Arial",
      fill: "white",
      lineHeight: 1.4,
    });
    this.popupGroup.add(name);

    // Scroll area dimensions
    const contentWidth = popupWidth - 60;
    const contentHeight = popupHeight - 80;

    // Create clipping scroll viewport
    const scrollGroup = new Konva.Group({
      x: rect.x() + 30,
      y: rect.y() + 50,
      width: contentWidth,
      height: contentHeight,
      clip: { x: 0, y: 0, width: contentWidth, height: contentHeight }
    });
    this.popupGroup.add(scrollGroup);

    // The scrollable text itself
    const infoText = new Konva.Text({
      x: 0,
      y: 0,
      width: contentWidth,
      text: info,
      fontSize: 20,
      fontFamily: "Arial",
      fill: "white",
      lineHeight: 1.4
    });
    scrollGroup.add(infoText);

    // SCROLL STEP
    const SCROLL_STEP = 40;

    // Scroll helper
    const updateScroll = () => {
      const minY = -(infoText.height() - contentHeight);
      const maxY = 0;
      if (infoText.y() < minY) infoText.y(minY);
      if (infoText.y() > maxY) infoText.y(maxY);
      this.group.getLayer()?.batchDraw();
    };

    // close 'X' Button
    const closeButton = new Konva.Text({
      x: rect.x() + popupWidth - 30,
      y: rect.y() + 10,
      text: "X",
      fontSize: 28,
      fontFamily: "Arial Black",
      fill: "red",
    });
    closeButton.on("click", () => {
      this.popupGroup.visible(false);
      this.popupTopGroup.visible(false);
      this.group.getLayer()?.batchDraw();
    });
    this.addPointerCursor(closeButton);

    this.popupTopGroup.destroyChildren();
    this.popupTopGroup.add(closeButton);
    this.popupTopGroup.visible(true);


    // Arrows
    // UP ARROW
    const upArrow = new Konva.Text({
      x: rect.x() + popupWidth - 40,
      y: rect.y() + 60,
      text: "▲",
      fontSize: 30,
      fill: "white",
    });
    upArrow.on("click", () => {
      infoText.y(infoText.y() + SCROLL_STEP);
      updateScroll();
    });
    this.addPointerCursor(upArrow);

    // DOWN ARROW
    const downArrow = new Konva.Text({
      x: rect.x() + popupWidth - 40,
      y: rect.y() + popupHeight - 60,
      text: "▼",
      fontSize: 30,
      fill: "white",
    });
    downArrow.on("click", () => {
      infoText.y(infoText.y() - SCROLL_STEP);
      updateScroll();
    });
    this.addPointerCursor(downArrow);

    // ADD ARROWS TO THE TOP GROUP (so they appear & stay)
    this.popupTopGroup.add(upArrow);
    this.popupTopGroup.add(downArrow);

  }

  /**
   * Header, Title, Footer, Back button
   */
  private createUI(onStartClick: (level: string,) => void) {
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
      
    const title = new Konva.Text({
      x: STAGE_WIDTH / 2+5,
      y: 80,
      text: "CLICK ON A COUNTRY'S PIN TO LEARN ABOUT IT",
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

    const footer = new Konva.Text({
      x: 550,
      y: 578,
      text: "- CLICK 'BACK' TO RETURN TO FULL MAP\n- CLICK UP AND DOWN ARROWS TO SCROLL\n   THROUGH INFORMATION ",
      fontSize: 23,
      fontFamily: "Arial Black",
      fontStyle: "bold",
      fill: "black",
      stroke: "white",
      strokeWidth: 1.3, 
      align: "left",
      lineHeight: 1.3,
    });
    footer.offsetX(footer.width() / 2);
    this.uiGroup.add(footer);

    const backGroup = new Konva.Group();
    const backRect = new Konva.Rect({
      x: 30,
      y: 590,
      width: 140,
      height: 60,
      fill: "#D9D9D9",
      cornerRadius: 3,
    });
    const backText = new Konva.Text({
      x: 100,
      y: 604,
      text: "BACK",
      fontSize: 35,
      fontFamily: "Arial",
      fontStyle: "bold",
      fill: "black",
    });
    backText.offsetX(backText.width() / 2);

    backGroup.add(backRect);
    backGroup.add(backText);
    backGroup.on("click", () => {
      // Hide popup if open
      this.popupGroup.visible(false);
      this.popupTopGroup.visible(false);

      // Call controller handler
      onStartClick("BackButton");

      this.group.getLayer()?.batchDraw();
    });

    this.addPointerCursor(backGroup);

    this.uiGroup.add(backGroup);
  }

  /**
   * Shows the pointer cursor when hovering over clickable object
   */
  protected addPointerCursor(node: Konva.Node) {
    node.on("mouseenter", () => (document.body.style.cursor = "pointer"));
    node.on("mouseleave", () => (document.body.style.cursor = "default"));
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
