import Game from "./Game.mjs";
import { checkCollision, rand } from "./utils.mjs";

export default class Egg {
  /**@type {HTMLImageElement} */
  image = document.getElementById("egg");

  /**@type {(game:Game)=>Egg} */
  constructor(game) {
    this.game = game;
    this.r = 45;
    this.x = rand(this.r, this.game.width - this.r);
    this.y = rand(this.game.marginY, this.game.height);

    this.sprite = {
      w: 110,
      h: 135,
      x: this.x - 110 * 0.5,
      y: this.y - 135 * 0.5,
    };
    this.width = this.sprite.w;
    this.height = this.sprite.h;
  }

  init() {
    this.sprite.x = this.x - this.width * 0.5;
    this.sprite.y = this.y - this.height * 0.5 - 30;
  }

  update() {}

  /**@type {(ctx: CanvasRenderingContext2D)=>void} */
  draw(ctx) {
    if (this.game.skip) {
    } else {
      ctx.drawImage(
        this.image,
        0,
        0,
        this.sprite.w,
        this.sprite.h,
        this.sprite.x,
        this.sprite.y,
        this.width,
        this.height
      );
    }
    if (this.game.debug) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.save();
      ctx.globalAlpha = 0.1;
      ctx.fill();
      ctx.restore();
      ctx.stroke();
    }
  }

  hitMargins() {
    if (this.y < this.game.marginY + this.r) {
      this.y = this.game.marginY + this.r + 1;
      return true;
    }
    if (this.y > this.game.height - this.r) {
      this.y = this.game.height - this.r - 1;
      return true;
    }
    return false;
  }
}
