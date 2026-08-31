import Konva from "konva";

/**
 * CorrectnessPopUp - a small modal-like popup that can say "Correct" or "Incorrect".
 * Call showCorrect() / showIncorrect(), it auto-hides after a short delay.
 */
export class CorrectnessPopUp {
  private group: Konva.Group;
  private panel: Konva.Rect;
  private label: Konva.Text;

  constructor() {
    this.group = new Konva.Group({ visible: false });

    this.panel = new Konva.Rect({
      x: 0,
      y: 0,
      width: 240,
      height: 120,
      cornerRadius: 0,
      fill: "rgba(0,0,0,0.8)",
      shadowColor: "black",
      shadowBlur: 20,
      shadowOpacity: 0.3,
    });

    this.label = new Konva.Text({
      x: 0,
      y: 0,
      width: this.panel.width(),
      align: "center",
      text: "Correct",
      fontSize: 28,
      //fontStyle: "bold",
      fill: "#ffffff",
    });

    // center label in panel
    this.label.y(this.panel.y() + (this.panel.height() - this.label.fontSize()) / 2 - 6);

    this.group.add(this.panel);
    this.group.add(this.label);
  }

  getGroup(): Konva.Group {
    return this.group;
  }

  /** Center the popup inside a (w x h) container */
  centerIn(w: number, h: number): void {
    const x = (w - this.panel.width()) / 2;
    const y = (h - this.panel.height()) / 2;
    this.group.position({ x, y });
  }

  showCorrect(autoHideMs = 900): void {
    this.label.text("Correct");
    this.label.fill("#8CF57A"); // light green text
    this.show(autoHideMs);
  }

  showIncorrect(autoHideMs = 900): void {
    this.label.text("Incorrect");
    this.label.fill("#FFB3B3"); // light red/pink text
    this.show(autoHideMs);
  }

  hide(): void {
    this.group.visible(false);
    this.group.getLayer()?.batchDraw();
  }

  private show(autoHideMs: number): void {
    this.group.visible(true);
    this.group.getLayer()?.batchDraw();
    if (autoHideMs > 0) {
      setTimeout(() => this.hide(), autoHideMs);
    }
  }
}
