// GameScreenView.ts
import Konva from "konva";
import type { View } from "../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts";
import type { Asteroid } from "./DodgeGameModel.ts";

const PLAYER_WIDTH = 60;
const PLAYER_HEIGHT = 28;

export class DodgeGameView implements View {
  private group: Konva.Group;
  private scoreText: Konva.Text;

  // player shape is now a group (spaceship)
  private player: Konva.Group;

  // map asteroidId -> Konva.Image (we use images to render asteroids)
  private asteroidMap: Map<number, Konva.Image> = new Map();

  // image used for asteroid rendering (HTMLImageElement)
  private asteroidImageEl: HTMLImageElement;
  private asteroidImageLoaded = false;

  // Game over UI
  private gameOverGroup: Konva.Group;
  private gameOverScoreText: Konva.Text;
  private continueButtonGroup: Konva.Group;
  private continueButtonRect: Konva.Rect;
  private continueButtonText: Konva.Text;

  // Instructions UI
  private instructionsGroup: Konva.Group;
  private beginButtonGroup: Konva.Group;
  private beginButtonRect: Konva.Rect;
  private beginButtonText: Konva.Text;

  constructor(onPointerMove: (x: number) => void, asteroidImageSrc: string = "/public/asteroid.png") {
    this.group = new Konva.Group({ visible: false });
    this.player = new Konva.Group({ visible: false });

    // preload asteroid image
    this.asteroidImageEl = new window.Image();
    this.asteroidImageEl.src = asteroidImageSrc;
    this.asteroidImageEl.onload = () => {
      this.asteroidImageLoaded = true;
      // redraw layer once loaded so existing asteroids render immediately
      this.group.getLayer()?.draw();
    };
    // optional: onerror you might want to fallback; for now we simply won't draw until loaded.

    // background
    const bg = new Konva.Rect({
      x: 0,
      y: 0,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
      fill: "#081229", // dark space
    });
    this.group.add(bg);

    // score text
    this.scoreText = new Konva.Text({
      x: 20,
      y: 20,
      text: "Score: 0",
      fontSize: 28,
      fontFamily: "Arial",
      fill: "white",
    });
    this.group.add(this.scoreText);

    // player ship (replace rectangle with spaceship group)
    // initial center x and y that match previous rectangle placement:
    const initX = STAGE_WIDTH / 2 - PLAYER_WIDTH / 2;
    const initY = STAGE_HEIGHT - PLAYER_HEIGHT - 20;
    this.drawSpaceship(initX, initY);

    // pointer move: we listen on the group's stage using getPointerPosition
    this.group.on("mousemove", () => {
      const pos = this.group.getStage()?.getPointerPosition();
      if (pos) {
        onPointerMove(pos.x);
      }
    });

    // --- Game over overlay (added last so it appears on top) ---
    this.gameOverGroup = new Konva.Group({ visible: false });

    // semi-opaque backdrop
    const overlay = new Konva.Rect({
      x: 0,
      y: 0,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
      fill: "rgba(0,0,0,0.6)",
    });
    this.gameOverGroup.add(overlay);

    const panelWidth = 420;
    const panelHeight = 220;
    const panelX = (STAGE_WIDTH - panelWidth) / 2;
    const panelY = (STAGE_HEIGHT - panelHeight) / 2;

    const panel = new Konva.Rect({
      x: panelX,
      y: panelY,
      width: panelWidth,
      height: panelHeight,
      cornerRadius: 12,
      fill: "#0f1724",
      stroke: "#ffffff",
      strokeWidth: 2,
      opacity: 0.95,
    });
    this.gameOverGroup.add(panel);

    const title = new Konva.Text({
      x: panelX + 20,
      y: panelY + 20,
      text: "Game Over",
      fontSize: 34,
      fontFamily: "Arial",
      fill: "white",
      fontStyle: "bold",
    });
    this.gameOverGroup.add(title);

    this.gameOverScoreText = new Konva.Text({
      x: panelX + 20,
      y: panelY + 70,
      text: "Final score: 0",
      fontSize: 24,
      fontFamily: "Arial",
      fill: "white",
    });
    this.gameOverGroup.add(this.gameOverScoreText);

    // continue button group (so whole area is clickable)
    const btnW = 180;
    const btnH = 48;
    const btnX = panelX + (panelWidth - btnW) / 2;
    const btnY = panelY + panelHeight - btnH - 24;

    this.continueButtonGroup = new Konva.Group({
      x: btnX,
      y: btnY,
      width: btnW,
      height: btnH,
    });

    // button background (positioned at 0,0 inside the group)
    this.continueButtonRect = new Konva.Rect({
      x: 0,
      y: 0,
      width: btnW,
      height: btnH,
      cornerRadius: 10,
      fill: "#22c55e",
      shadowColor: "black",
      shadowBlur: 6,
      shadowOffset: { x: 0, y: 2 },
    });
    this.continueButtonGroup.add(this.continueButtonRect);

    // button text (centered inside the group)
    this.continueButtonText = new Konva.Text({
      x: 0,
      y: (btnH - 24) / 2,
      width: btnW,
      align: "center",
      text: "Continue",
      fontSize: 24,
      fontFamily: "Arial",
      fill: "white",
    });
    this.continueButtonGroup.add(this.continueButtonText);

    // change cursor on hover for the whole group
    this.continueButtonGroup.on("mouseenter", () => {
      const stage = this.group.getStage();
      if (stage) stage.container().style.cursor = "pointer";
    });
    this.continueButtonGroup.on("mouseleave", () => {
      const stage = this.group.getStage();
      if (stage) stage.container().style.cursor = "default";
    });

    // add the button group and overlay group last
    this.gameOverGroup.add(this.continueButtonGroup);
    this.group.add(this.gameOverGroup);

    // --- Instructions overlay (shown before the game starts) ---
    this.instructionsGroup = new Konva.Group({ visible: false });

    const instrOverlay = new Konva.Rect({
      x: 0,
      y: 0,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
      fill: "rgba(0,0,0,0.6)",
    });
    this.instructionsGroup.add(instrOverlay);

    const instrPanelW = 520;
    const instrPanelH = 320;
    const instrPanelX = (STAGE_WIDTH - instrPanelW) / 2;
    const instrPanelY = (STAGE_HEIGHT - instrPanelH) / 2;

    const instrPanel = new Konva.Rect({
      x: instrPanelX,
      y: instrPanelY,
      width: instrPanelW,
      height: instrPanelH,
      cornerRadius: 12,
      fill: "#0f1724",
      stroke: "#ffffff",
      strokeWidth: 2,
      opacity: 0.98,
    });
    this.instructionsGroup.add(instrPanel);

    const instrTitle = new Konva.Text({
      x: instrPanelX + 24,
      y: instrPanelY + 20,
      text: "How to Play",
      fontSize: 36,
      fontFamily: "Arial",
      fill: "white",
      fontStyle: "bold",
    });
    this.instructionsGroup.add(instrTitle);

    const instrText = new Konva.Text({
      x: instrPanelX + 24,
      y: instrPanelY + 80,
      width: instrPanelW - 48,
      height: instrPanelH - 160,
      text:
        "Commander! We need to warp drive to Earth, but we need to avoid all of these asteroids! \n\n" + 
        "Travel towards Earth and move your mouse left and right to steer your ship. Avoid incoming asteroids — if one hits you, the game ends.\n\n" +
        "Asteroids that pass the bottom of the screen increase your score.",
      fontSize: 20,
      fontFamily: "Arial",
      fill: "white",
      lineHeight: 1.3,
      align: 'center',
    });
    this.instructionsGroup.add(instrText);

    // Begin button
    const beginBtnW = 200;
    const beginBtnH = 56;
    const beginBtnX = instrPanelX + (instrPanelW - beginBtnW) / 2;
    const beginBtnY = instrPanelY + instrPanelH - beginBtnH - 8;

    this.beginButtonGroup = new Konva.Group({
      x: beginBtnX,
      y: beginBtnY,
      width: beginBtnW,
      height: beginBtnH,
    });

    this.beginButtonRect = new Konva.Rect({
      x: 0,
      y: 0,
      width: beginBtnW,
      height: beginBtnH,
      cornerRadius: 12,
      fill: "#3b82f6",
      shadowColor: "black",
      shadowBlur: 8,
      shadowOffset: { x: 0, y: 3 },
    });
    this.beginButtonGroup.add(this.beginButtonRect);

    this.beginButtonText = new Konva.Text({
      x: 0,
      y: (beginBtnH - 28) / 2,
      width: beginBtnW,
      align: "center",
      text: "Begin",
      fontSize: 24,
      fontFamily: "Arial",
      fill: "white",
    });
    this.beginButtonGroup.add(this.beginButtonText);

    // hover cursor
    this.beginButtonGroup.on("mouseenter", () => {
      const stage = this.group.getStage();
      if (stage) stage.container().style.cursor = "pointer";
    });
    this.beginButtonGroup.on("mouseleave", () => {
      const stage = this.group.getStage();
      if (stage) stage.container().style.cursor = "default";
    });

    this.instructionsGroup.add(this.beginButtonGroup);
    this.group.add(this.instructionsGroup);
  }

  // --- new: spaceship draw method (replaces rect player) ---
  private drawSpaceship(startX: number, startY: number) {
    // spaceship group positioned at startX/startY (top-left of ship bounding box)
    // We keep the same API as the rest of the view which expects player.x to be the left
    const spaceship = new Konva.Group({ x: startX, y: startY });
    // store as player
    this.player = spaceship;
    // add to main group
    this.group.add(spaceship);

    // top dome (first layer and base over it)
    const dome = new Konva.Ellipse({
      x: PLAYER_WIDTH / 2 - 0, // center relative to group; original code used x:0 but that was based on different coords — center it roughly
      y: -20,
      radiusX: 35,
      radiusY: 20,
      fill: "#b3e5fc",
      stroke: "black",
      strokeWidth: 2,
    });
    spaceship.add(dome);

    // base
    const base = new Konva.Ellipse({
      x: PLAYER_WIDTH / 2 - 0,
      y: 0,
      radiusX: 60,
      radiusY: 25,
      fill: "#3E424B",
      stroke: "black",
      strokeWidth: 2,
    });
    spaceship.add(base);

    // glowing sections of spaceship using base logic
    const lightPositions = [-35, 0, 35];
    lightPositions.forEach((light) => {
      spaceship.add(
        new Konva.Ellipse({
          x: PLAYER_WIDTH / 2 + light,
          y: 8,
          radiusX: 12,
          radiusY: 7,
          fill: "#7CFC00",
          stroke: "black",
          strokeWidth: 1,
        })
      );
    });

    // optionally set listening false so it doesn't capture pointer events
    spaceship.listening(false);
  }

  getGroup(): Konva.Group {
    return this.group;
  }

  show(): void {
    this.group.visible(true);
    this.group.getLayer()?.draw();
  }

  hide(): void {
    this.group.visible(false);
    this.group.getLayer()?.draw();
  }

  updateScore(score: number): void {
    this.scoreText.text(`Score: ${score}`);
    this.group.getLayer()?.draw();
  }

  // set player x (center)
  setPlayerX(x: number): void {
    const clamped = Math.max(0 + PLAYER_WIDTH / 2, Math.min(STAGE_WIDTH - PLAYER_WIDTH / 2, x));
    // since player's group x represents the left (we created with left at startX),
    // set group.x to (clamped - half width)
    this.player.x(clamped - PLAYER_WIDTH / 2);
    this.group.getLayer()?.draw();
  }

  // synchronize asteroids array: add new image shapes, update existing, remove missing
  syncAsteroids(asteroids: Asteroid[]): void {
    const existingIds = new Set(this.asteroidMap.keys());
    const layer = this.group.getLayer();

    for (const a of asteroids) {
      const imgX = a.x - a.radius;
      const imgY = a.y - a.radius;
      const size = a.radius * 2;

      if (this.asteroidMap.has(a.id)) {
        const img = this.asteroidMap.get(a.id)!;
        img.x(imgX);
        img.y(imgY);
        img.width(size);
        img.height(size);
      } else {
        // create Konva.Image. If image isn't loaded yet, Konva will update when we set imageEl later (or on load we redraw layer).
        const kImg = new Konva.Image({
          x: imgX,
          y: imgY,
          width: size,
          height: size,
          image: this.asteroidImageLoaded ? this.asteroidImageEl : undefined,
          listening: false, // so it doesn't intercept pointer events
        });

        // If the HTMLImageElement loads after the Konva.Image is created, we ensure it displays by assigning image and redrawing.
        if (!this.asteroidImageLoaded) {
          this.asteroidImageEl.onload = () => {
            // set the image on all existing Konva.Image objects
            for (const [, existingImg] of this.asteroidMap) {
              existingImg.image(this.asteroidImageEl);
            }
            // also set this one
            kImg.image(this.asteroidImageEl);
            layer?.draw();
          };
        }

        this.asteroidMap.set(a.id, kImg);
        this.group.add(kImg);
      }
      existingIds.delete(a.id);
    }

    // remove ids no longer present
    for (const id of existingIds) {
      const shape = this.asteroidMap.get(id);
      if (shape) {
        shape.destroy();
      }
      this.asteroidMap.delete(id);
    }

    layer?.draw();
  }

  // hide asteroids visually (keeps them in the map so they can be re-used)
  hideAsteroids(): void {
    for (const [, img] of this.asteroidMap) {
      img.visible(false);
    }
    this.group.getLayer()?.draw();
  }

  // destroy all asteroid shapes and clear map
  destroyAllAsteroids(): void {
    for (const [, img] of this.asteroidMap) {
      img.destroy();
    }
    this.asteroidMap.clear();
    this.group.getLayer()?.draw();
  }

  // --- Game over handling ---

  // show in-screen game over UI. onContinue is called when user presses Continue.
  showGameOver(finalScore: number, onContinue: () => void): void {
    // hide asteroids (so they don't show behind overlay)
    this.hideAsteroids();

    this.gameOverScoreText.text(`Final score: ${finalScore}`);

    // ensure no duplicate handlers: off then on
    this.continueButtonGroup.off("click");
    this.continueButtonGroup.off("touchend");

    const handler = () => {
      // hide overlay before calling callback
      this.hideGameOver();
      onContinue();
    };
    this.continueButtonGroup.on("click", handler);
    this.continueButtonGroup.on("touchend", handler);

    this.gameOverGroup.visible(true);
    this.group.getLayer()?.draw();
  }

  hideGameOver(): void {
    // remove handlers so they aren't invoked multiple times
    this.continueButtonGroup.off("click");
    this.continueButtonGroup.off("touchend");
    this.gameOverGroup.visible(false);
    this.group.getLayer()?.draw();
  }

  // --- Instructions overlay handling ---

  // show instructions; onBegin called when user presses Begin.
  showInstructions(onBegin: () => void): void {
    // ensure game over is hidden
    this.hideGameOver();

    // hide asteroids behind
    this.hideAsteroids();

    // remove any previous handlers then attach fresh ones
    this.beginButtonGroup.off("click");
    this.beginButtonGroup.off("touchend");

    const handler = () => {
      // hide and call callback
      this.hideInstructions();
      onBegin();
    };
    this.beginButtonGroup.on("click", handler);
    this.beginButtonGroup.on("touchend", handler);

    this.instructionsGroup.visible(true);
    this.group.getLayer()?.draw();
  }

  hideInstructions(): void {
    this.beginButtonGroup.off("click");
    this.beginButtonGroup.off("touchend");
    this.instructionsGroup.visible(false);
    this.group.getLayer()?.draw();
  }
}
