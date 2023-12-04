import { ImageSource, Loader, SpriteSheet } from "excalibur";
import sword from "./images/sword.png";
import wandererMagicanIdle from "./images/Wanderer_Magican/Idle.png";

const resources = {
  Sword: new ImageSource(sword),
};

const wandererMagicanImages = {
  idle: new ImageSource(wandererMagicanIdle),
};

const wandererMagicanSprites = {
  idle: SpriteSheet.fromImageSource({
    image: wandererMagicanImages.idle,
    grid: {
      columns: 5,
      rows: 1,
      spriteWidth: 75,
      spriteHeight: 125,
    },
    spacing: {
      margin: {
        x: 195,
      },
    },
  }),
};

const loader = new Loader([
  ...Object.values(wandererMagicanImages),
  ...Object.values(resources),
]);

const Resources = { wandererMagicanSprites, wandererMagicanImages };

export { loader, Resources };
