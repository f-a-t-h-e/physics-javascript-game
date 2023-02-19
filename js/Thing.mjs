import Enemy from "./Enemy.mjs";
import Game from "./Game.mjs";
import Larva from "./Larva.mjs";
import { checkCollision } from "./utils.mjs";

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
}
