import Game from "./Game.mjs";
import { rand } from "./utils.mjs";

export default class Enemy {
  /**@type {HTMLImageElement} */
  image = document.getElementById("toad");

  /**@type {(game:Game)=>Player} */
  constructor(game) {
    this.game = game;
    this.r = 40;
    this.x = rand(this.r, game.width - this.r);
    this.y = rand(game.marginY, game.height - this.r);
    this.speedX = rand(0.5, 3.5);
    this.sprite = {
      w: 140,
      h: 260,
      x: this.x - this.width * 0.5,
      y: this.y - this.height * 0.5,
    };
    this.width = this.sprite.w;
    this.height = this.sprite.h;
    console.log(this);
  }
  init() {
    this.sprite = {
      w: 140,
      h: 260,
      x: this.x - this.width * 0.5,
      y: this.y - this.height * 0.5,
    };
  }
  update() {}
  hitMargins() {}
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
  }
}
