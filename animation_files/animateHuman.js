import { price, recipe, humanArray } from "../main.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

// Inventory and cash variables
const inventorySimulation = {
  paperCups: 0,
  lemon: 0,
  sugar: 0,
  iceCubes: 0,
};
let cashSimualtion = 0;
function setCashSimulation(value) {
  cashSimualtion = value;
}

// Setting dynamic canvas width and height
let CANVAS_WIDTH = (canvas.width = window.innerWidth);
let CANVAS_HEIGHT = (canvas.height = window.innerHeight * 0.8);

$(window).on("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.8;
});

// Creating Human class
class Human {
  constructor(direction, src, frame, dx, isCustomer, speed, walkSpeed) {
    // Parameter impacts which direction
    this.direction = direction; // LTR, RTL
    this.src = src; // Source of image
    this.frame = frame; // frame number its using (0-4) at start
    this.x = dx; // dx

    // Parameter impacts if human pauses
    this.isCustomer = isCustomer;
    this.updatedDOM = false;

    // Parameter impacts speed
    this.speedX = speed; // How fast the element moves to right/left (destination speed)
    this.walkSpeed = walkSpeed; // How fast the human is walking (source speed)

    this.image = new Image();
    this.image.src = this.src;
    this.spriteWidth = 145; // sw
    this.spriteHeight = 200; // sh
    this.y = CANVAS_HEIGHT * (Math.random() * (0.7 - 0.45) + 0.45); // dy
    this.width = this.spriteWidth; // dw
    this.height = this.spriteHeight; // dh
    this.stoplocX = Math.floor(canvas.width * 0.4 + Math.random() * 400); // stopx
    this.stoplocY = CANVAS_HEIGHT * 0.3;
    this.speedY = (this.stoplocY - this.y) / (this.stoplocX - this.x);
  }

  // Updates done with each animation loop
  update() {
    // If its a
    if (this.direction === "LTR" && this.isCustomer === "Yes") {
      if (this.x < this.stoplocX - this.speedX) {
        this.y += this.speedY;
        this.x += this.speedX;
      } else if (
        this.x > this.stoplocX - this.speedX &&
        this.x < this.stoplocX + this.speedX
      ) {
        // Update inventory and cash balance
        setTimeout(() => {
          // Update human location
          this.x += this.speedX;

          // Update inventory and cash balance
          if (this.updatedDOM === false) {
            inventorySimulation.paperCups -= recipe.paperCups;
            inventorySimulation.lemon -= recipe.lemon;
            inventorySimulation.sugar -= recipe.sugar;
            inventorySimulation.iceCubes -= recipe.iceCubes;
            cashSimualtion += price;
            this.updatedDOM = true;
          }

          // Update DOM
          // Create another class for simulation
          $("#paper-cups-qty-dashboard").text(inventorySimulation.paperCups);
          $("#lemon-qty-dashboard").text(inventorySimulation.lemon);
          $("#sugar-qty-dashboard").text(inventorySimulation.sugar);
          $("#ice-cubes-qty-dashboard").text(inventorySimulation.iceCubes);
          $("#cash-dashboard").text(cashSimualtion.toFixed(2));
        }, 2000);
      } else if (
        this.x >= this.stoplocX + this.speedX &&
        this.x < CANVAS_WIDTH * 0.7
      ) {
        this.x += this.speedX;
        this.y += Math.random() * (2 - 0.5 + 1) + 0.5;
      } else {
        this.x += this.speedX;
      }
      // Increase this.frame to make walking motion
      if (gameFrame % this.walkSpeed === 0) {
        this.frame > 2 ? (this.frame = 0) : this.frame++;
      }
    } else if (this.direction === "LTR" && this.isCustomer === "No") {
      this.x += this.speedX;

      // Increase this.frame to make walking motion
      if (gameFrame % this.walkSpeed === 0) {
        this.frame > 2 ? (this.frame = 0) : this.frame++;
      }
    } else if (this.direction === "RTL" && this.isCustomer === "Yes") {
      if (this.x > this.stoplocX + this.speedX) {
        this.y -= this.speedY;
        this.x -= this.speedX;
      } else if (
        this.x > this.stoplocX - this.speedX &&
        this.x < this.stoplocX + this.speedX
      ) {
        setTimeout(() => {
          // Update human location
          this.x -= this.speedX;

          // Update inventory and cash balance
          if (this.updatedDOM === false) {
            inventorySimulation.paperCups -= recipe.paperCups;
            inventorySimulation.lemon -= recipe.lemon;
            inventorySimulation.sugar -= recipe.sugar;
            inventorySimulation.iceCubes -= recipe.iceCubes;
            cashSimualtion += price;
            this.updatedDOM = true;
          }

          // Update DOM
          // Create another class for simulation
          $("#paper-cups-qty-dashboard").text(inventorySimulation.paperCups);
          $("#lemon-qty-dashboard").text(inventorySimulation.lemon);
          $("#sugar-qty-dashboard").text(inventorySimulation.sugar);
          $("#ice-cubes-qty-dashboard").text(inventorySimulation.iceCubes);
          $("#cash-dashboard").text(cashSimualtion.toFixed(2));
        }, 2000);
      } else if (
        this.x <= this.stoplocX - this.speedX &&
        this.x > CANVAS_WIDTH * 0.3
      ) {
        this.x -= this.speedX;
        this.y += Math.random() * (2 - 0.5 + 1) + 0.5;
      } else {
        this.x -= this.speedX;
      }

      // Increase this.frame to make walking motion
      if (gameFrame % this.walkSpeed === 0) {
        this.frame < 1 ? (this.frame = 3) : this.frame--;
      }
    } else if (this.direction === "RTL" && this.isCustomer === "No") {
      this.x -= this.speedX;

      // Increase this.frame to make walking motion
      if (gameFrame % this.walkSpeed === 0) {
        this.frame < 1 ? (this.frame = 3) : this.frame--;
      }
    } else {
      return;
    }
  }

  // Drawing the human
  draw() {
    ctx.drawImage(
      this.image, // image link
      this.frame * this.spriteWidth, // sx
      0, // sy
      this.spriteWidth, // sw
      this.spriteHeight, // sh
      this.x, // dx
      this.y, // dy
      this.width, // dw
      this.height // dh
    );
  }
}

// Variables
let gameFrame = 0;

// Function to animate human walking left to right
function animateHuman() {
  // Clear previous frames
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Creating an animation for each human type
  humanArray.forEach((human) => {
    human.update();
    human.draw();
  });

  // Calling the animate function again to create a loop
  gameFrame++;
  requestAnimationFrame(animateHuman);
}

function resetGameframe() {
  gameFrame = 0;
}

export {
  animateHuman,
  Human,
  humanArray,
  CANVAS_WIDTH,
  resetGameframe,
  inventorySimulation,
  setCashSimulation,
  cashSimualtion,
};
