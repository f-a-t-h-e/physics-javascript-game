import Obstacle from "./Obstacle.mjs";
import Player from "./Player.mjs";

export default class Game {
  /**@type {HTMLCanvasElement} */
  canvas;
  /**@type {number} */
  width;
  /**@type {number} */
  height;
  /**@type {Player} */
  player;
  /**@type {{ x: number; y: number; pressed: boolean;}} */
  mouse;

  /**@type {(canvas:HTMLCanvasElement)=>Game} */
  constructor({ canvas }) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.player = new Player(this);
    this.mouse = {
      x: this.width * 0.5,
      y: this.height * 0.5,
      pressed: false,
    };

    /**@type {{num:number;arr:Obstacle[]}} */
    this.obstacles = { num: 10, arr: [] };

    this.init();
  }
  init() {
    /**
     * TO_DO : pass the values instead of this brute force
     */
    let attempts = 0;
    while (this.obstacles.arr.length < this.obstacles.num && attempts < 500) {
      /**@type {Obstacle} */
      const testObstacle = new Obstacle(this);
      let overlap = false;
      this.obstacles.arr.forEach((obstacle) => {
        const dx = testObstacle.x - obstacle.x;
        const dy = testObstacle.y - obstacle.y;
        const distance = Math.hypot(dx, dy);
        const distanceBuffer = 100;
        const sumOfRadius = testObstacle.r + obstacle.r + distanceBuffer;
        if (distance < sumOfRadius) {
          overlap = true;
        }
        console.log(1);
      });

      if (!overlap) {
        this.obstacles.arr.push(testObstacle);
      }
      ++attempts;
    }

    this.canvas.addEventListener("mousedown", (e) => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
      this.mouse.pressed = true;
    });
    this.canvas.addEventListener("mouseup", (e) => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
      this.mouse.pressed = false;
    });
    this.canvas.addEventListener("mousemove", (e) => {
      if (this.mouse.pressed) {
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
      }
    });
  }

  /**@type {(ctx: CanvasRenderingContext2D)} */
  render(ctx) {
    this.player.draw(ctx);
    this.player.update();
    this.obstacles.arr.forEach((obstacle) => {
      obstacle.draw(ctx);
    });
  }
}
