
import { Utility } from '../utility.mjs';

/**
 * StarBox
 */
export class StarBox {

  constructor(location, config, width, height, colour, speed) {
    this.x = location.x;
    this.y = location.y;

    this.width = width;
    this.height = height;

    this.screenWidth = config.screenSize.width;
    this.screenHeight = config.screenSize.height;

    this.colour = colour;
    this.speed = speed;

    this.onScreen = true;
  }

  // Define the StarBox type's update method.
  update() {

    // Move star down the screen
    if (this.y + this.height < this.screenHeight + this.height)
      this.y += this.speed;
    else
      this.onScreen = false;
  }

  // Returns an object with x an y coords, the box's current position
  getPosition() {
    return { x: this.x, y: this.y };
  }

  // Returns an object with width and height of the box
  getSize() {
    return { width: this.width, height: this.height };
  }
}

/**
 * PowerBox
 */
export class PowerBox {

  constructor(x, y, config) {
    this.x = x;
    this.y = y;
    this.width = config.box.power.size.width;
    this.height = config.box.power.size.height;
    this.speed = config.box.power.speed;
    this.screenWidth = config.screenSize.width;
    this.screenHeight = config.screenSize.height;

    this.colour = config.box.power.colour;

    this.onScreen = true;

    this.count = 0;
    this.colourIndex = 0;
  }

  // Define the PowerBox type's update method.
  update() {

    this.count++;

    if (this.count === 20) {
      this.colourIndex = this.colourIndex === 1 ? 0 : 1;
      this.count = 0;
    }

    // Move box down the screen
    if (this.y + this.height < this.screenHeight + this.height)
      this.y += this.speed;
    else
      this.onScreen = false;
  }

  // Returns true if the box is currently on the screen
  isOnScreen() {
    return this.onScreen;
  }

  // Set the box onScreen variable to false
  setOffScreen() {
    this.onScreen = false;
  }

  // Returns an object with x an y coords, the box's current position
  getPosition() {
    return { x: this.x, y: this.y };
  }

  // Returns an object with width and height of the box
  getSize() {
    return { width: this.width, height: this.height };
  }
}

/**
 * 
 */
export class PlayerBox {

  constructor(config, controller) {
    this.x = (config.screenSize.width / 2) - (config.box.player.size.width / 2);
    this.y = (config.screenSize.height / 2) - (config.box.player.size.height / 2);
    this.width = config.box.player.size.width;
    this.height = config.box.player.size.height;
    this.screenWidth = config.screenSize.width;
    this.screenHeight = config.screenSize.height;
    this.speed = config.box.player.speed;
    this.gravity = config.gravity;
    this.colour = config.box.player.colour;
    this.invColour = config.box.player.invColour;
    this.lives = config.box.player.lives;

    this.invulnerability = config.box.player.invulnerability;
    this.isBlinking = this.invulnerability;
    
    this.controller = controller;
  }

  // Define the PlayerBox type's update method.
  update() {

    if (this.controller.left && this.x > 0)
      this.x = this.x - this.speed;

    if (this.controller.up && this.y > 0)
      this.y = this.y - this.speed;

    if (this.controller.right && this.x + this.width < this.screenWidth)
      this.x = this.x + this.speed;

    if (this.controller.down && this.y + this.height < this.screenHeight)
      this.y = this.y + this.speed;

    // apply gravity
    if (this.y + this.height < this.screenHeight)
      this.y += this.gravity;

    if (this.isBlinking > 0)
      this.isBlinking--;
  }

  // Decrement lives and reset the player's invulnerability period.
  hit() {
    this.lives--;
    this.isBlinking = this.invulnerability;
  }

  // Returns an object with x an y coords, the box's current position
  getPosition() {
    return { x: this.x, y: this.y };
  }

  // Returns an object with width and height of the box
  getSize() {
    return { width: this.width, height: this.height };
  }
}

/**
 * 
 */
export class EnemyBox {

  constructor(level, config) {
    this.level = level;

    this.width = config.box.enemy.size.width;
    this.height = config.box.enemy.size.height;

    this.screenWidth = config.screenSize.width;
    this.screenHeight = config.screenSize.height;

    this.x = 0;
    this.y = this.screenHeight + this.height;

    this.colours = config.box.enemy.colour;
    this.speeds = config.box.enemy.speed;
    this.colour = this.colours[this.level];
    this.speed = this.speeds[this.level];

    this.hit = false;
  }

  // Define the EnemyBox type's update method.
  update(phase) {
    var reposition = false;

    // If we're playing, we reposition, otherwise we just let the boxes continue
    // to fall until we're playing again.
    if (phase == 'play') {
      // If y > screenheight, reposition
      if (this.y > this.screenHeight) {
        var newPos = Utility.getNewPosition(this.screenWidth - this.width, this.screenHeight + this.height);
        this.x = newPos.x;
        this.y = newPos.y;
        reposition = true;
      }
    }

    // Move down the screen
    this.y += this.speed;

    // Update colour and speed if needed.
    this.colour = this.colours[this.level];
    this.speed = this.speeds[this.level];

    return reposition;
  }

  // Returns an object with x an y coords, the box's current position
  getPosition() {
    return { x: this.x, y: this.y };
  }

  // Returns an object with width and height of the box
  getSize() {
    return { width: this.width, height: this.height };
  }
}

/**
 * 
 */
export class ExplodeBox {

  constructor(x, y, config) {
    this.x = x;
    this.y = y;
    this.width = config.box.explode.size.width;
    this.height = config.box.explode.size.height;

    this.colour = config.box.explode.colour;
    this.currentColour = config.box.explode.colour[0];

    this.end = false;

    this.count = 0;
  }

  // Define the ExplodeBox type's update method.
  update() {

    this.count++;
    this.width += 2;
    this.height += 2;

    this.currentColour = this.colour[Math.floor(this.count / 10)];

    if (this.count == 50) {
      this.end = true;
    }
  }

  endOfExplode() {
    return this.end;
  }

  // Returns an object with x an y coords, the box's current position
  getPosition() {
    return { x: this.x, y: this.y };
  }

  // Returns an object with width and height of the box
  getSize() {
    return { width: this.width, height: this.height };
  }
}

export default {
  StarBox: StarBox,
  EnemyBox: EnemyBox,
  PlayerBox: PlayerBox,
  ExplodeBox: ExplodeBox,
  PowerBox: PowerBox
};
