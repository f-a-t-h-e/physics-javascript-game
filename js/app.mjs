import Game from "./Game.mjs";

window.addEventListener("load", function () {
  /**@type {HTMLCanvasElement} */
  const canvas = document.getElementById("canvas1");
  const context = canvas.getContext("2d");
  canvas.width = 1280;
  canvas.height = 720;

  context.fillStyle = "white";
  context.lineWidth = 3;
  context.strokeStyle = "white";
  /**@type {Game} */
  const game = new Game({ canvas });

  animate();

  function animate(timestamp) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    game.render(context);

    window.requestAnimationFrame(animate);
  }
});
