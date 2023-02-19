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

/**@type {(min=0,max=1)=>number} */
export const rand = (min = 0, max = 1) => Math.random() * (max - min) + min;

/**@type {(timer:number)=>string} */
export const formatTimer = (timer) => {
  return (timer * 0.001).toFixed();
};
