// DodgeGameController.ts
import { ScreenController } from "../../types.ts";
import type { ScreenSwitcher } from "../../types.ts";
import { DodgeGameModel } from "./DodgeGameModel.ts";
import { DodgeGameView } from "./DodgeGameView.ts";


export class DodgeGameController extends ScreenController {
  private model: DodgeGameModel;
  private view: DodgeGameView;
  private screenSwitcher: ScreenSwitcher;

  private animationFrameId: number | null = null;
  private lastTimestamp = 0;

  // spawn timeout id (uses window.setTimeout to ensure numeric id)
  private asteroidSpawnerTimeout: number | null = null;

  // gameplay tuning
  private ASTEROID_SPAWN_BASE = 800; // ms (starting interval)
  private ASTEROID_SPAWN_MIN = 30; // ms (fastest allowed)
  private ASTEROID_SPAWN_DECREASE_PER_SEC = 20; // ms per second the interval reduces by

  private PLAYER_WIDTH = 60;
  private PLAYER_HEIGHT = 28;

  // elapsed time (seconds) used to increase difficulty (speed + spawn rate)
  private elapsedSeconds = 0;

  constructor(screenSwitcher: ScreenSwitcher) {
    super();
    this.screenSwitcher = screenSwitcher;

    this.model = new DodgeGameModel();

    // view will call this with pointer X
    this.view = new DodgeGameView((x: number) => this.handlePointerMove(x));
  }

  showInstructionsPopup(): void {
    // make sure view is visible so the instructions overlay can be seen
    this.view.show();

    // hide any previous game-over overlay if present
    // @ts-ignore
    if ((this.view as any).hideGameOver) {
      // @ts-ignore
      (this.view as any).hideGameOver();
    }

    // @ts-ignore - view implements showInstructions
    (this.view as any).showInstructions(() => {
      // user tapped Begin -> actually start the game
      this.startGame();
    });
  }

  startGame(): void {
  this.model.reset();
  this.view.updateScore(this.model.getScore());
  this.view.setPlayerX(this.model.getPlayerX());
  this.view.show();

  // ensure any previous game-over overlay hidden
  // (GameScreenView implements hideGameOver)
  // @ts-ignore - if TS complains about missing method add it to the view interface
  if ((this.view as any).hideGameOver) {
    (this.view as any).hideGameOver();
  }

  this.elapsedSeconds = 0;
  this.startSpawning();
  this.startLoop();
  }

  // dynamic spawner: schedules next spawn using a timeout and adapts interval by elapsedSeconds
  private scheduleNextSpawn(): void {
    // clear any existing timeout (safety)
    if (this.asteroidSpawnerTimeout !== null) {
      clearTimeout(this.asteroidSpawnerTimeout);
      this.asteroidSpawnerTimeout = null;
    }

    // compute current interval (linearly decreases with elapsedSeconds)
    const interval = Math.max(
      this.ASTEROID_SPAWN_MIN,
      this.ASTEROID_SPAWN_BASE - this.elapsedSeconds * this.ASTEROID_SPAWN_DECREASE_PER_SEC
    );

    // schedule the next spawn
    this.asteroidSpawnerTimeout = window.setTimeout(() => {
      this.model.spawnAsteroid();
      // schedule again using updated elapsedSeconds
      this.scheduleNextSpawn();
    }, interval);
  }

  private startSpawning(): void {
    // clear previous
    if (this.asteroidSpawnerTimeout !== null) {
      clearTimeout(this.asteroidSpawnerTimeout);
      this.asteroidSpawnerTimeout = null;
    }
    // spawn immediately then schedule future spawns
    this.model.spawnAsteroid();
    this.scheduleNextSpawn();
  }

  private stopSpawning(): void {
    if (this.asteroidSpawnerTimeout !== null) {
      clearTimeout(this.asteroidSpawnerTimeout);
      this.asteroidSpawnerTimeout = null;
    }
  }

  private startLoop(): void {
    this.lastTimestamp = performance.now();
    const loop = (ts: number) => {
      const dt = (ts - this.lastTimestamp) / 1000; // seconds
      this.lastTimestamp = ts;

      // update elapsed time (used to scale asteroid speed and spawn interval)
      this.elapsedSeconds += dt;

      // difficulty formula for movement: +5% speed per second (tweak in code if desired)
      const speedMultiplier = 1 + this.elapsedSeconds * 0.05;

      // update model (pass speed multiplier)
      this.model.update(dt, speedMultiplier);

      // sync view asteroids
      const asteroids = this.model.getAsteroids();
      this.view.syncAsteroids(asteroids);

      // update score display if it changed (cheap way: always update)
      this.view.updateScore(this.model.getScore());

      // update player view
      this.view.setPlayerX(this.model.getPlayerX());

      // collision check
      const collidedId = this.model.checkCollision(this.PLAYER_WIDTH, this.PLAYER_HEIGHT);
      if (collidedId !== null) {
        // end game on collision
        this.endGame();
        return;
      }

      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }

  private stopLoop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private handlePointerMove(x: number): void {
    // simply move player center to pointer x
    this.model.setPlayerX(x);
  }

  private endGame(): void {
  // stop gameplay
  this.stopLoop();
  this.stopSpawning();

  // show in-screen result overlay with a Continue button.
  // When the user presses Continue we switch to the result screen.
  const finalScore = this.model.getScore();

  // show overlay; when continue pressed, switch screen
  // @ts-ignore - view exposes showGameOver
  (this.view as any).showGameOver(finalScore, () => {
    this.view.hide();
    this.screenSwitcher.switchToScreen({ type: "playLevels" });
  });
  }

  getFinalScore(): number {
    return this.model.getScore();
  }

  getView(): DodgeGameView {
    return this.view;
  }
}
