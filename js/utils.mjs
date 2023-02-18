import Obstacle from "./Obstacle.mjs";
import Player from "./Player.mjs";

/**@type  {(a:Player|Obstacle,b:Player|Obstacle)=>[boolean, number, number, number, number]}*/
export const checkCollision = (a, b) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const distance = Math.hypot(dy, dx);
  const sumOfRadius = a.r + b.r;

  return [distance < sumOfRadius, distance, sumOfRadius, dx, dy];
};
