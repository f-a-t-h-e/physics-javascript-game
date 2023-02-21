import Egg from "./Egg.mjs";
import Game from "./Game.mjs";
import Larva from "./Larva.mjs";
import Player from "./Player.mjs";
import { checkCollision, rand } from "./utils.mjs";

export default class Enemy {
  /**@type {HTMLImageElement} */
  image = document.getElementById("toads");

  /**@type {(game:Game)=>Player} */
  constructor(game) {
    this.game = game;
    this.r = 40;
    this.x = this.game.width + 140;
    this.y = rand(this.game.marginY, this.game.height - this.r);
    this.marginYB = this.game.height - this.r;
    this.marginYT = this.game.marginY + this.r;
    this.speedX = rand(0.5, 3.5);
    this.speedY = rand(0.25, 1.75);
    this.angleY = rand(0, Math.PI);
    this.angleMod = rand(0, 0.1);
    this.sprite = {
      w: 140,
      h: 260,
      // x: 0,
      // y: 0,
      frameX: 0,
      frameY: Math.floor(Math.random() * 4),
    };
    this.width = this.sprite.w;
    this.height = this.sprite.h;
    // this.s = {
    // }
  }
  init() {}
  update(deltaTime, i = undefined) {
    if (this.collied()) {
    } else {
      // let last_x = this.x;
      this.x -= this.speedX;
      // this.y +=
      //   Math.cos((this.angleY = this.angleY + this.angleMod)) * this.speedY;
      this.hitMargins();
    }
    /**
     * TO_DO
     */
    // if (displacementX is too small since long time) {}
    return true;
  }
  collied() {
    let hitLarva = 0;
    this.game.things.forEach((thing, i) => {
      if (thing instanceof Enemy || thing === this || thing instanceof Egg) {
        // console.log("hit");
        // } else if (thing instanceof Player) {
        // thing.update();
        // }
        //  else if (thing instanceof Egg) {
        //   const [colission, distance, sumOfRadius, dx, dy] = checkCollision(
        //     this,
        //     thing
        //   );
        //   if (colission) {
        //     if (thing.updatePos(i, 0)) {
        //       const [colission, distance, sumOfRadius, dx, dy] = checkCollision(
        //         this,
        //         thing
        //       );
        //       if (colission) {
        //         const unit_X = dx / distance;
        //         const unit_Y = dy / distance;
        //         this.x = thing.x + (sumOfRadius + 1) * unit_X;
        //         this.y = thing.y + (sumOfRadius + 1) * unit_Y;
        //       }
        //     } else {
        //       const unit_X = dx / distance;
        //       const unit_Y = dy / distance;
        //       this.x = thing.x + (sumOfRadius + 1) * unit_X;
        //       this.y = thing.y + (sumOfRadius + 1) * unit_Y;
        //     }
        //   }
      } else if (thing instanceof Larva) {
        const [colission, distance, sumOfRadius, dx, dy] = checkCollision(
          this,
          thing
        );
        if (colission) {
          // const unit_X = dx / distance;
          // const unit_Y = dy / distance;
          // this.x = thing.x + (sumOfRadius - 2) * unit_X;
          // this.y = thing.y + (sumOfRadius - 2) * unit_Y;
          hitLarva += 1;
        } else if (distance - sumOfRadius < 10) {
          hitLarva += 1;
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
    return hitLarva;
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
    if (this.x < -this.width) {
      this.x = this.game.width + this.width;
      this.y = rand(this.game.marginY, this.game.height - this.r);
      this.sprite.frameY = Math.floor(Math.random() * 4);
    }
    // if (this.x < this.r) {
    //   this.x = this.r + 1;
    //   moved = true;
    // } else if (this.x > this.marginXR) {
    //   this.x = this.marginXR - 1;
    //   moved = true;
    // }
    return moved;
  }
  /**@type {(ctx: CanvasRenderingContext2D)=>void} */
  draw(ctx) {
    if (this.game.skip) {
    } else {
      ctx.drawImage(
        this.image,
        this.sprite.frameX,
        this.sprite.frameY * this.sprite.h,
        this.sprite.w,
        this.sprite.h,
        this.x - this.width * 0.5,
        this.y - this.height * 0.85,
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
  remove() {}
}
