import { ImageSource, Loader, SpriteSheet } from "excalibur";
import wandererMagicanIdle from "./images/Wanderer_Magican/Idle.png";
import wandererMagicanRun from "./images/Wanderer_Magican/Run.png";
import wandererMagicanAttack1 from "./images/Wanderer_Magican/Attack_1.png";
import smallBolt1 from "./images/Wanderer_Magican/Charge_1.png";

const wandererMagicanImages = {
  idle: new ImageSource(wandererMagicanIdle),
  run: new ImageSource(wandererMagicanRun),
  attack1: new ImageSource(wandererMagicanAttack1),
};

const boltsImages = {
  smallBolt1: new ImageSource(smallBolt1),
};

const wandererMagicanSprites = {
  idle: SpriteSheet.fromImageSource({
    image: wandererMagicanImages.idle,
    grid: {
      columns: 8,
      rows: 1,
      spriteWidth: 128,
      spriteHeight: 128,
    },
  }),
  run: SpriteSheet.fromImageSource({
    image: wandererMagicanImages.run,
    grid: {
      columns: 8,
      rows: 1,
      spriteWidth: 128,
      spriteHeight: 128,
    },
  }),
  attack1: SpriteSheet.fromImageSource({
    image: wandererMagicanImages.attack1,
    grid: {
      columns: 7,
      rows: 1,
      spriteWidth: 128,
      spriteHeight: 128,
    },
  }),
};

const boltSprites = {
  smallBolt1: SpriteSheet.fromImageSource({
    image: boltsImages.smallBolt1,
    grid: {
      columns: 9,
      rows: 1,
      spriteHeight: 128,
      spriteWidth: 64,
    },
  }),
};

const loader = new Loader([
  ...Object.values(wandererMagicanImages),
  ...Object.values(boltsImages),
]);

const Resources = { wandererMagicanSprites, boltSprites };

export { loader, Resources };
