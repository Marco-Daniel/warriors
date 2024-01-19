import {
  Actor,
  Engine,
  Animation,
  range,
  AnimationStrategy,
  Vector,
} from "excalibur";
import { Resources } from "./resources";
import {outlineMaterial} from "./material"

export class SmallBolt extends Actor {
  private spriteScale = new Vector(1.5, 1.5);
  private speed = 256;
  private flipHorizontal = false;

  constructor({
    pos,
    direction,
  }: {
    pos?: Vector;
    direction: "left" | "right";
  }) {
    super({
      pos,
      width: 64,
      height: 128,
    });

    this.graphics.material = outlineMaterial

    if (direction === "left") {
      this.flipHorizontal = true;
    }
  }

  onInitialize(_engine: Engine): void {
    const bolt = Animation.fromSpriteSheet(
      Resources.boltSprites.smallBolt1,
      range(0, 8),
      150,
      AnimationStrategy.End
    );

    bolt.scale = this.spriteScale;
    bolt.flipHorizontal = this.flipHorizontal;

    this.graphics.use(bolt);
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    this.vel.x = 0;

    if (this.flipHorizontal) {
      this.vel.x = -this.speed;
    } else {
      this.vel.x = this.speed;
    }

    if (this.isOffScreen) {
      this.kill();
    }
  }
}
