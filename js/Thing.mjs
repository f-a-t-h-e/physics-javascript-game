import Particle from "./effects/Particle.mjs";
import Enemy from "./Enemy.mjs";
import Game from "./Game.mjs";
import Larva from "./Larva.mjs";
import { checkCollision, rand } from "./utils.mjs";

export default class Thing {
  /**@type {Game} */
  game;
  constructor(game) {
    this.game = game;
  }
  addThing(TheThing, ...inputs) {
    const newThing = new TheThing(...inputs);

    let tries = 0;
    newThing.hitMargins();
    for (let i = 0; i < this.game.things.length; i++) {
      if (tries > 10) {
        i = this.game.things.length;
      } else {
        const [colission, distance, sumOfRadius, dx, dy] = checkCollision(
          newThing,
          this.game.things[i]
        );
        //
        if (colission) {
          const unit_X = dx / distance;
          const unit_Y = dy / distance;
          newThing.x = this.game.things[i].x + (sumOfRadius + 1) * unit_X;
          newThing.y = this.game.things[i].y + (sumOfRadius + 1) * unit_Y;
          newThing.hitMargins();
          i = 0;
          tries += 1;
        }
      }
    }
    if (tries < 10) {
      if (newThing instanceof Larva) {
        console.log(this.game.things);
      }
      newThing.init();
      this.game.things.push(newThing);
      if (newThing instanceof Larva) {
        console.log(this.game.things);
      }
    } else {
      console.log("after ", tries, " - tries couldn't add this", newThing);
    }
  }

  /**
   * This method is to add new particles properly
   * @param {Particle} TheParticle The particle to be added
   * @param {number} cordX The position X
   * @param {number} cordY The positino Y
   * @param {number} radius The radius of the entity
   */
  addParticle(TheParticle, cordX, cordY, radius) {
    if (this.game.particles.arr.length < this.game.particles.max) {
      this.game.particles.arr.length += 1;
      this.game.particles.cursur += 1;
    } else {
      this.game.particles.cursur =
        (this.game.particles.cursur + 1) % this.game.particles.arr.length;
    }

    const randX = cordX + Math.random() * radius * 2 - radius;
    const randY = cordY + Math.random() * radius * 2 - radius;

    this.game.particles.arr[this.game.particles.cursur] = new TheParticle(
      this.game,
      randX,
      randY
    );
  }
}
