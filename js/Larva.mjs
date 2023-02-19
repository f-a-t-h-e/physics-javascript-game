import Egg from "./Egg.mjs";
import Enemy from "./Enemy.mjs";
import Game from "./Game.mjs";
import Obstacle from "./Obstacle.mjs";
import Player from "./Player.mjs";
import { checkCollision, formatTimer, rand } from "./utils.mjs";

export default class Larva {
  /**@type {HTMLImageElement} */
  image = document.getElementById("larva");

  /**@type {(game:Game)=>Larva} */
  constructor(game, cordX, cordY) {
    this.game = game;
    this.x = cordX;
    this.y = cordY;
    this.r = 30;
    this.marginYB = this.game.height - this.r;
    this.marginYT = this.game.marginY + this.r;
    this.sprite = {
      w: 150,
      h: 150,
      x: 0,
      y: rand(0, 1) > 0.5 ? 1 : 0,
    };
    this.width = this.sprite.w;
    this.height = this.sprite.h;
    this.hit = {
      timer: 0,
      interval: 1 * 500,
      count: 0,
      max: 2,
    };
  }
  init() {}

  update(deltaTime, i = undefined) {
    const numOfHits = this.collied();

    if (numOfHits > 0) {
      if (this.hit.timer > this.hit.interval) {
        this.hit.count += 1;
        this.hit.timer = 0;
      } else {
        this.hit.timer += deltaTime * numOfHits;
      }
    }

    this.y -= 1;

    if (this.hit.count > this.hit.max) {
      this.game.score -= 1;
      return false;
    }
    if (this.y < this.marginYT) {
      return false;
    }

    return true;
  }

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
      ctx.fillText(this.hit.count, this.x, this.y - this.height * 0.75);
    }
  }
  collied() {
    let hits = 0;
    this.game.things.forEach((thing, i) => {
      if (thing instanceof Enemy) {
        const collision = checkCollision(this, thing)[0];
        if (collision) {
          hits += 1;
        }
      } else if (
        thing === this ||
        thing instanceof Obstacle ||
        thing instanceof Player ||
        thing instanceof Egg
      ) {
      } else {
      }
      //
    });
    return hits;
  }
  remove() {
    // console.log("removed a larva", this);
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
