import Game from "./Game.mjs";
import { rand } from "./utils.mjs";

export default class Obstacle {
  /**@type {Game} */
  game;
  /**@type {number} */
  x;
  /**@type {number} */
  y;
  /**@type {number} */
  r;
  /**@type {HTMLImageElement} */
  image = document.getElementById("obstacles");
  /**@type {{x:number;y:number,w:number;h:number}} */
  sprite = {
    h: 250,
    w: 250,
    x: 0,
    y: 0,
  };

  /**@type {(game:Game)=>Obstacle} */
  constructor(game) {
    this.game = game;

    this.width = this.sprite.w;
    this.height = this.sprite.h;
    this.r = 40;
    this.marginY = this.game.marginY;
    this.x = rand(this.width, this.game.width - this.width);
    this.y = rand(this.marginY + this.r, this.game.height - this.r);
    this.framX = Math.floor(rand(0, 4)) * this.sprite.w;
    this.framY = Math.floor(rand(0, 3)) * this.sprite.h;
    console.log(this.framX / this.sprite.w);
    console.log(this.framY / this.sprite.h);
    this.sprite.x = this.x - this.width * 0.5;
    this.sprite.y = this.y - this.height * 0.5 - 70;
  }

  init() {
    this.sprite.x = this.x - this.width * 0.5;
    this.sprite.y = this.y - this.height * 0.5 - 70;
  }

  update() {}

  /**@type {(ctx: CanvasRenderingContext2D)=>void} */
  draw(ctx) {
    if (this.game.skip) {
    } else {
      ctx.drawImage(
        this.image,
        this.framX,
        this.framY,
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
      ctx.globalAlpha = 0.5;
      ctx.fill();
      ctx.restore();
      ctx.stroke();
    }
  }

  hitMargins() {
    if (this.y < this.marginY + this.r) {
      this.y = this.marginY + this.r + 1;
      return true;
    }
    if (this.y > this.game.height - this.r) {
      this.y = this.game.height - this.r - 1;
      return true;
    }
    return false;
  }
}
