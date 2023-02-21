import Game from "./Game.mjs";

let lastTime = 0;

window.addEventListener("load", function () {
  /**@type {HTMLCanvasElement} */
  const canvas = document.getElementById("canvas1");
  const context = canvas.getContext("2d");
  canvas.width = 1280;
  canvas.height = 720;

  context.fillStyle = "white";
  context.lineWidth = 3;
  context.strokeStyle = "black";
  context.font = "40px Helvetica";
  context.textAlign = "center";
  console.log("╕🚀 ~ file: app.mjs:27 ~ context.font ", context.font);
  /**@type {Game} */
  const game = new Game({ canvas });

  animate(lastTime);
  function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    game.render(context, deltaTime);
    if (game.gameOver) {
    } else {
      window.requestAnimationFrame(animate);
    }
  }
});
