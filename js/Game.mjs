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

  /**@type {(input:{canvas:HTMLCanvasElement})} */
  constructor({ canvas }) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.player = new Player({ game: this });
    this.mouse = {
      x: this.width * 0.5,
      y: this.height * 0.5,
      pressed: false,
    };
    this.init();
  }
  init() {
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
  }
}
