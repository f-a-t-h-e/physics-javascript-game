import Game from "./Game.mjs";

/**@type {(min=0,max=1)=>number} */
const rand = (min = 0, max = 1) => Math.random() * (max - min) + min;

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
    this.r = 60;

    this.x = rand(this.width, this.game.width - this.width);
    this.y = rand(260, this.game.height);
    this.framX = Math.floor(rand(undefined, 4));
    this.framY = Math.floor(rand(undefined, 3));
    this.sprite.x = this.x - this.width * 0.5;
    this.sprite.y = this.y - this.height * 0.5 - 70;
  }

  /**@type {(ctx: CanvasRenderingContext2D)=>void} */
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.framX * this.sprite.w,
      this.framY * this.sprite.h,
      this.sprite.w,
      this.sprite.h,
      this.sprite.x,
      this.sprite.y,
      this.width,
      this.height
    );
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.fill();
    ctx.restore();
    ctx.stroke();
  }
}
