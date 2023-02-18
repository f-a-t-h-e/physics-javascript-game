import Egg from "./Egg.mjs";
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

  /**@type {(game:Game)=>Player} */
  constructor(game) {
    this.game = game;

    this.x = this.game.width * 0.5;
    this.y = this.game.height * 0.5;
    this.r = 30;
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
    this.marginY = this.game.marginY - this.r * 2 - 5;

    addEventListener("keydown", (e) => {
      if (e.code === "KeyY") {
        // console.log(this.marginY);
      }
    });
  }

  init() {}

  /**@type {(ctx: CanvasRenderingContext2D)=>void} */
  draw(ctx) {
    if (this.game.skip) {
    } else {
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
    }
    if (this.game.debug) {
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

    this.x += this.s.x * this.s.modifier;
    this.y += this.s.y * this.s.modifier;
    // boundary x
    if (this.x < this.r) this.x = this.r + 1;
    else if (this.x > this.game.width - this.r)
      this.x = this.game.width - this.r - 1;
    // boundary y
    if (this.y < this.marginY + this.r) this.y = this.marginY + this.r + 1;
    else if (this.y > this.game.height - this.r)
      this.y = this.game.height - this.r - 1;
    // collision
    this.game.things.forEach((thing) => {
      if (thing instanceof Player || thing instanceof Egg) {
      } else {
        const [colission, distance, sumOfRadius, dx, dy] = checkCollision(
          this,
          thing
        );
        if (colission) {
          const unit_X = dx / distance;
          const unit_Y = dy / distance;
          this.x = thing.x + (sumOfRadius + 1) * unit_X;
          this.y = thing.y + (sumOfRadius + 1) * unit_Y;
        }
      }
    });
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
