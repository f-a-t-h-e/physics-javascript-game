import Game from "./Game.mjs";
import { checkCollision } from "./utils.mjs";

export default class Player {
  /**@type {Game} */
  game;
  /**@type {number} */
  x;
  /**@type {number} */
  y;
  /**
   * @description radius
   * @type {number} */
  r;
  /**
   * @description speed
   * @type {{x:number;y:number;modifier:number}}
   */
  s = { x: 0, y: 0, modifier: 0 };
  /**
   * @description displacement
   * @type {{x:number,y:number}}
   */
  d = { x: 0, y: 0 };
  /**
   * @type {{w:number;h:number;x:number;y:number}}
   */
  sprite;
  /**
   * @type {{x:number;y:number;step:number;num:number}}
   */
  frame;

  /**@type {(game:Game)=>Player} */
  constructor(game) {
    this.game = game;

    this.x = this.game.width * 0.5;
    this.y = this.game.height * 0.5;
    this.r = 50;
    this.sprite = {
      h: 255,
      w: 255,
      x: 0,
      max_X: 59,
      y: 0,
      max_Y: 0,
    };
    this.s.modifier = 5;
    /**@type {HTMLImageElement} */
    this.image = document.getElementById("bull");
    this.width = this.sprite.w;
    this.height = this.sprite.h;

    this.frame = {
      step: 1,
      num: 0,
    };
  }

  /**@type {(ctx: CanvasRenderingContext2D)=>void} */
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.sprite.x * this.sprite.w,
      this.sprite.y * this.sprite.h,
      this.sprite.w,
      this.sprite.h,
      this.x - this.width * 0.5,
      this.y - this.height * 0.5 - 100,
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
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.game.mouse.x, this.game.mouse.y);
    ctx.stroke();
  }

  update() {
    this.d.x = this.game.mouse.x - this.x;
    this.d.y = this.game.mouse.y - this.y;
    const distance = Math.hypot(this.d.x, this.d.y);
    const angle = Math.atan2(this.d.y, this.d.x);

    if (distance > 5) {
      /** TO_DO : improve this */
      if (angle < -2.74 || angle > 2.74) this.sprite.y = 6;
      else if (angle < -1.96) this.sprite.y = 7;
      else if (angle < -1.17) this.sprite.y = 0;
      else if (angle < -0.39) this.sprite.y = 1;
      else if (angle < 0.39) this.sprite.y = 2;
      else if (angle < 1.17) this.sprite.y = 3;
      else if (angle < 1.96) this.sprite.y = 4;
      else if (angle < 2.74) this.sprite.y = 5;
    }

    this.sprite.x = (this.sprite.x + 1) % this.sprite.max_X;

    if (distance > this.s.modifier) {
      this.s.x = this.d.x / distance || 0;
      this.s.y = this.d.y / distance || 0;
    } else {
      this.s.x = 0;
      this.s.y = 0;
    }
    let col = false;

    this.x += this.s.x * this.s.modifier;
    this.y += this.s.y * this.s.modifier;

    this.game.obstacles.arr.forEach((obstacle) => {
      const [colission, distance, sumOfRadius, dx, dy] = checkCollision(
        this,
        obstacle
      );
      if (colission) {
        const unit_X = dx / distance;
        const unit_Y = dy / distance;
        this.x = obstacle.x + (sumOfRadius + 1) * unit_X;
        this.y = obstacle.y + (sumOfRadius + 1) * unit_Y;
      }
    });
  }
}
