import {
  Actor,
  Animation,
  Vector,
  AnimationStrategy,
  Engine,
  Keys,
  SpriteSheet,
  Handler,
  FrameEvent,
  range,
} from "excalibur";
import { Resources } from "./resources";
import { SmallBolt } from "./smallBolt";
export class Player extends Actor {
  private lastDirection: "right" | "left" = "right";
  private runSpeed = 328;
  private spriteScale = new Vector(1.5, 1.5);

  constructor({ pos }: { pos?: Vector }) {
    super({
      pos,
      width: 128,
      height: 128,
    });
  }

  addAnimation({
    name,
    sprite,
    frames,
    speed,
    strategy,
    flipHorizontal,
  }: {
    name: string;
    sprite: SpriteSheet;
    frames: number[];
    speed: number;
    strategy?: AnimationStrategy;
    flipHorizontal?: boolean;
  }) {
    const animation = Animation.fromSpriteSheet(
      sprite,
      frames,
      speed,
      strategy
    );

    animation.scale = this.spriteScale;
    animation.flipHorizontal = !!flipHorizontal;

    this.graphics.add(name, animation);

    return animation;
  }

  onInitialize(engine: Engine) {
    // Setup visuals
    const idle = {
      sprite: Resources.wandererMagicanSprites.idle,
      frames: range(0, 7),
      speed: 150,
    };
    this.addAnimation({
      name: "idleRight",
      ...idle,
    });
    this.addAnimation({
      name: "idleLeft",
      flipHorizontal: true,
      ...idle,
    });

    const run = {
      sprite: Resources.wandererMagicanSprites.run,
      frames: range(0, 7),
      speed: 75,
    };
    this.addAnimation({
      name: "runRight",
      ...run,
    });
    this.addAnimation({
      name: "runLeft",
      flipHorizontal: true,
      ...run,
    });

    const attack1 = {
      sprite: Resources.wandererMagicanSprites.attack1,
      frames: range(0, 6),
      speed: 150,
    };
    const attack1Right = this.addAnimation({
      name: "attack1Right",
      ...attack1,
    });
    const attack1Left = this.addAnimation({
      name: "attack1Left",
      flipHorizontal: true,
      ...attack1,
    });

    const createSmallBolt: Handler<FrameEvent> = ({ frameIndex }) => {
      if (frameIndex === 3) {
        const bolt = new SmallBolt({
          pos: new Vector(this.pos.x, this.pos.y),
          direction: this.lastDirection,
        });

        engine.add(bolt);
      }
    };

    attack1Right.events.on("frame", createSmallBolt);
    attack1Left.events.on("frame", createSmallBolt);
  }

  onPreUpdate(engine: Engine, delta: number) {
    if (this.lastDirection === "left") {
      this.graphics.use("idleLeft");
    } else {
      this.graphics.use("idleRight");
    }

    // Reset x velocity
    this.vel.x = 0;

    // Player input
    if (engine.input.keyboard.isHeld(Keys.A)) {
      this.vel.x = -this.runSpeed;
      this.lastDirection = "left";
    }

    if (engine.input.keyboard.isHeld(Keys.D)) {
      this.vel.x = this.runSpeed;
      this.lastDirection = "right";
    }

    if (engine.input.keyboard.isHeld(Keys.Q)) {
      if (this.lastDirection === "right") {
        this.graphics.use("attack1Right");
      } else {
        this.graphics.use("attack1Left");
      }
    }

    if (engine.input.keyboard.isHeld(Keys.Space)) {
      this.pos = new Vector(150, 150);
    }

    if (this.vel.x < 0) {
      // Change animation based on velocity
      this.graphics.use("runLeft");
    }
    if (this.vel.x > 0) {
      this.graphics.use("runRight");
    }
  }
}
