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
    this.timer = 0;
  }
  update(deltaTime, i = undefined) {
    this.y -= 0.5;
    this.timer += deltaTime;
    if (this.timer > 10000) {
      return false;
    }
    return true;
  }
  init() {}
  remove() {}
  hitMargins() {}
  /**@type {(ctx: CanvasRenderingContext2D)=>void} */
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
    ctx.stroke();
  }
}

export class FireFog extends Particle {
  /**@type {(game:Game,cordX:number,cordY:number)=>Particle} */
  constructor(game, cordX, cordY) {
    super(game, cordX, cordY, "red");
  }
}
