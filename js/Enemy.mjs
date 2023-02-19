import Egg from "./Egg.mjs";
import Game from "./Game.mjs";
import Player from "./Player.mjs";
import { checkCollision, rand } from "./utils.mjs";

export default class Enemy {
  /**@type {HTMLImageElement} */
  image = document.getElementById("toad");

  /**@type {(game:Game)=>Player} */
  constructor(game) {
    this.game = game;
    this.r = 90;
    this.x = this.game.width + 140;
    this.y = rand(this.game.marginY, this.game.height - this.r);
    console.log(this.x);
    this.speedX = rand(0.5, 3.5);
    this.sprite = {
      w: 140,
      h: 260,
    };
    this.width = this.sprite.w;
    this.height = this.sprite.h;
    // this.s = {
    // }
  }
  init() {
    this.sprite = {
      w: 140,
      h: 260,
    };
  }
  update() {
    this.x -= this.speedX;
    if (this.x < -this.width) {
      console.log(1111);
      this.x = this.game.width + this.width;
      this.y = rand(this.game.marginY, this.game.height - this.r);
    }
    this.collied();
  }
  collied() {
    this.game.things.forEach((thing, i) => {
      if (thing === this) {
        // console.log("hit");
        // } else if (thing instanceof Player) {
        // thing.update();
      } else if (thing instanceof Egg) {
        const [colission, distance, sumOfRadius, dx, dy] = checkCollision(
          this,
          thing
        );
        if (colission) {
          if (thing.updatePos(i, 0)) {
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
        }
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
          //
        }
      }
    });
  }
  hitMargins() {}
  /**@type {(ctx: CanvasRenderingContext2D)=>void} */
  draw(ctx) {
    // if (this.game.skip) {
    // } else {
    ctx.drawImage(
      this.image,
      0,
      0,
      this.sprite.w,
      this.sprite.h,
      this.x - this.width * 0.5,
      this.y - this.height * 0.5,
      this.width,
      this.height
    );
    // }
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
}
