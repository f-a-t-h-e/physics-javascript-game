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

  /**@type {(game:Game)=>Player} */
  constructor(game) {
    this.game = game;
    this.x = this.game.width * 0.5;
    this.y = this.game.height * 0.5;
    this.r = 50;
    this.s.modifier = 5;
  }

  /**@type {(ctx: CanvasRenderingContext2D)=>void} */
  draw(ctx) {
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
