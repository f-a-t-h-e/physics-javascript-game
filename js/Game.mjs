import Egg from "./Egg.mjs";
import Obstacle from "./Obstacle.mjs";
import Player from "./Player.mjs";
import Thing from "./Thing.mjs";

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
  //
  fps = 50;
  timer = 0;
  interval = 16.5;

  skip = false;

  /**@type {(canvas:HTMLCanvasElement)=>Game} */
  constructor({ canvas }) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.marginY = 260;
    this.player = new Player(this);
    this.mouse = {
      x: this.width * 0.5,
      y: this.height * 0.5,
      pressed: false,
    };
    this.thing = new Thing(this);
    this.debug = true;
    this.maxObstacles = 5;
    this.eggs = { max: 10, last: 0, count: 0, delay: 1 * 1000 };
    this.things = [this.player];

    this.init();
  }
  updateThings() {
    this.things = [...this.obstacles.arr, this.player, ...this.eggs.arr];
  }
  init() {
    for (let i = 0; i < this.maxObstacles; i++) {
      this.thing.addThing(Obstacle, this);
    }

    window.addEventListener("keypress", (e) => {
      // console.log(e);
      // lesson - 15
      if (e.code === "KeyD") {
        this.debug = !this.debug;
      } else if (e.code === "KeyU") {
        this.skip = !this.skip;
      } else if (e.code === "KeyG") {
        console.log(this);
      }
    });
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

  /**@type {(ctx: CanvasRenderingContext2D, deltaTime:number)} */
  render(ctx, deltaTime) {
    if (this.timer > this.interval) {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.things
        .sort((a, b) => a.y - b.y)
        .forEach((thing) => {
          thing.update();
          thing.draw(ctx);
        });
      if (this.eggs.count < this.eggs.max) {
        this.eggs.last += deltaTime;
        if (this.eggs.last >= this.eggs.delay) {
          this.thing.addThing(Egg, this);
          this.eggs.last = 0;
          this.eggs.count += 1;
        }
      }
      this.timer = 0;
    }
    this.timer += deltaTime;
  }
}
