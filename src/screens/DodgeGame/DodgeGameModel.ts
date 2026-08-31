// GameScreenModel.ts
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts";

export type Asteroid = {
  id: number;
  x: number;
  y: number;
  radius: number;
  vy: number; // vertical speed (px/sec) BASE speed; actual movement may be multiplied by difficulty multiplier
};

export class DodgeGameModel {
  private score = 0;
  private playerX = STAGE_WIDTH / 2;
  private asteroids: Asteroid[] = [];
  private nextAsteroidId = 1;

  // tuned parameters (you can tweak)
  private readonly ASTEROID_MIN_RADIUS = 12;
  private readonly ASTEROID_MAX_RADIUS = 36;
  private readonly ASTEROID_MIN_SPEED = 120; // px/sec (base)
  private readonly ASTEROID_MAX_SPEED = 300; // px/sec (base)

  reset(): void {
    this.score = 0;
    this.playerX = STAGE_WIDTH / 2;
    this.asteroids = [];
    this.nextAsteroidId = 1;
  }

  getScore(): number {
    return this.score;
  }

  incrementScore(): void {
    this.score++;
  }

  setPlayerX(x: number): void {
    // clamp to stage
    const halfMargin = 0;
    const min = halfMargin;
    const max = STAGE_WIDTH - halfMargin;
    this.playerX = Math.max(min, Math.min(max, x));
  }

  getPlayerX(): number {
    return this.playerX;
  }

  spawnAsteroid(): Asteroid {
    const r =
      Math.random() * (this.ASTEROID_MAX_RADIUS - this.ASTEROID_MIN_RADIUS) +
      this.ASTEROID_MIN_RADIUS;
    const x = Math.random() * (STAGE_WIDTH - r * 2) + r;
    const y = -r - 10;
    const vy =
      Math.random() * (this.ASTEROID_MAX_SPEED - this.ASTEROID_MIN_SPEED) +
      this.ASTEROID_MIN_SPEED;

    const asteroid: Asteroid = {
      id: this.nextAsteroidId++,
      x,
      y,
      radius: r,
      vy,
    };
    this.asteroids.push(asteroid);
    return asteroid;
  }

  getAsteroids(): Asteroid[] {
    return this.asteroids;
  }

  // advance physics (dt in seconds). speedMultiplier scales the movement (e.g. based on elapsed time)
  // Returns array of asteroid IDs removed (off-screen)
  update(dt: number, speedMultiplier = 1): number[] {
    const removedIds: number[] = [];
    for (const a of this.asteroids) {
      a.y += a.vy * dt * speedMultiplier;
    }

    // remove asteroids that passed bottom (count as dodged => +1 score)
    const remaining: Asteroid[] = [];
    for (const a of this.asteroids) {
      if (a.y - a.radius > STAGE_HEIGHT) {
        removedIds.push(a.id);
        this.incrementScore(); // dodged successfully
      } else {
        remaining.push(a);
      }
    }
    this.asteroids = remaining;
    return removedIds;
  }

  // Simple player bounding box (we assume player is a rectangle)
  getPlayerBounds(playerWidth: number, playerHeight: number) {
    const left = this.playerX - playerWidth / 2;
    const right = this.playerX + playerWidth / 2;
    const top = STAGE_HEIGHT - playerHeight - 20; // place player near bottom
    const bottom = top + playerHeight;
    return { left, right, top, bottom };
  }

  // Check collision between player rectangle and any asteroid
  // returns the asteroid id collided with, or null
  checkCollision(playerWidth: number, playerHeight: number): number | null {
    const bounds = this.getPlayerBounds(playerWidth, playerHeight);
    for (const a of this.asteroids) {
      // circle-rect collision test
      const closestX = Math.max(bounds.left, Math.min(a.x, bounds.right));
      const closestY = Math.max(bounds.top, Math.min(a.y, bounds.bottom));
      const dx = a.x - closestX;
      const dy = a.y - closestY;
      if (dx * dx + dy * dy <= a.radius * a.radius) {
        return a.id;
      }
    }
    return null;
  }
}
