import { Actor, vec, Animation, Vector } from "excalibur";
import { Resources } from "./resources";

export class Player extends Actor {
  constructor() {
    super({
      pos: vec(150, 150),
      width: 100,
      height: 100,
    });
  }

  onInitialize() {
    // Setup visuals
    const idle = Animation.fromSpriteSheet(
      Resources.wandererMagicanSprites.idle,
      [0, 1, 2, 3, 4],
      150
    );
    idle.scale = new Vector(2, 2);

    this.graphics.add("idle", idle);

    // test
    this.on("pointerup", () => {
      alert("yo");
    });
  }

  onPreUpdate(engine: ex.Engine, delta: number) {
    this.graphics.use("idle");
  }
}
