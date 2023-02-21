import Game from "../Game.mjs";
import { rand } from "../utils.mjs";

export default class Particle {
  /**@type {(game:Game,cordX:number,cordY:number,color:string)=>Particle} */
  constructor(game, cordX, cordY, color) {
    this.game = game;
    this.x = cordX;
    this.y = cordY;
    this.color = color;
    this.r = Math.floor(rand(5, 15));
    this.s = {
      x: Math.random() * 6 - 3,
      y: Math.random() * 2 + 0.5,
    };
    this.angle = {
      current: 0,
      speed: Math.random() * 0.1 + 0.1,
    };

    this.timer = 0;
    this.interval = 3 * 1000;
  }
  update(deltaTime, i = undefined) {
    this.y -= 0.5;
    this.timer += deltaTime;
    if (this.timer > this.interval) {
      return false;
    }
    return true;
  }
  init() {}
  remove() {}
  hitMargins() {}
  /**@type {(ctx: CanvasRenderingContext2D)=>void} */
  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

export class FireFly extends Particle {
  /**@type {(game:Game,cordX:number,cordY:number,color:string)=>Particle} */
  constructor(game, cordX, cordY, color = "yellow") {
    super(game, cordX, cordY, color);
  }
  update() {
    this.angle.current += this.angle.speed;
    this.x += Math.cos(this.angle.current) * this.s.x;
    this.y -= this.s.y;
    if (
      this.y < 0 - this.r ||
      this.x < 0 - this.r ||
      this.x > this.game.width + this.r
    ) {
      return false;
    }
    return true;
  }
}

export class Spark extends Particle {
  /**@type {(game:Game,cordX:number,cordY:number,color:string)=>Particle} */
  constructor(game, cordX, cordY, color = "blue") {
    super(game, cordX, cordY, color);
  }
  update() {
    this.angle.current += this.angle.speed * 0.5;
    this.x -= Math.cos(this.angle.current) * this.s.x;
    this.y -= Math.sin(this.angle.current) * this.s.y;
    if (this.r > 0.1) {
      this.r -= 0.05;
    } else {
      return false;
    }

    return true;
  }
}
