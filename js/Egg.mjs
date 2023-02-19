import Game from "./Game.mjs";
import { checkCollision, rand } from "./utils.mjs";

export default class Egg {
  /**@type {HTMLImageElement} */
  image = document.getElementById("egg");

  /**@type {(game:Game)=>Egg} */
  constructor(game) {
    this.game = game;
    this.r = 40;
    this.marginYB = this.game.height - this.r - 30;
    this.marginYT = this.game.marginY + this.r;
    this.marginXR = this.game.width - this.r;
    this.x = rand(this.r, this.game.width - this.r);
    this.y = rand(this.marginYT, this.marginYB);

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
  updatePos(index, depth, dig = false) {
    let moved = false;
    if (depth > 3) {
      moved = true;
    } else {
      this.game.things.forEach((thing, i) => {
        if (!(i === index)) {
          if (false && thing instanceof Egg) {
            const [colission, distance, sumOfRadius, dx, dy] = checkCollision(
              thing,
              this
            );
            if (colission) {
              // const unit_X = dx / distance;
              // const unit_Y = dy / distance;
              // thing.x = this.x + (sumOfRadius + 1) * unit_X;
              // thing.y = this.y + (sumOfRadius + 1) * unit_Y;
              if (!(dig && thing.updatePos(i, depth + 1, false))) {
                const [colission, distance, sumOfRadius, dx, dy] =
                  checkCollision(this, thing);
                if (colission) {
                  const unit_X = dx / distance;
                  const unit_Y = dy / distance;
                  this.x = thing.x + (sumOfRadius + 1) * unit_X;
                  this.y = thing.y + (sumOfRadius + 1) * unit_Y;
                }
              }
              // if (thing.updatePos(i, depth + 1)) {
              moved = true;
              // }
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
              moved = true;
            }
          }
        }
      });
    }
    this.hitMargins() && (moved = true);
    this.init();

    return moved;
  }

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
    let moved = false;
    if (this.y < this.marginYT) {
      this.y = this.marginYT + 1;
      moved = true;
    } else if (this.y > this.marginYB) {
      this.y = this.marginYB - 1;
      moved = true;
    }
    if (this.x < this.r) {
      this.x = this.r + 1;
      moved = true;
    } else if (this.x > this.marginXR) {
      this.x = this.marginXR - 1;
      moved = true;
    }
    return moved;
  }
}
