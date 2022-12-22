import { price, recipe } from "./main.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
let animation;

// Setting dynamic canvas width and height
let CANVAS_WIDTH = (canvas.width = window.innerWidth);
let CANVAS_HEIGHT = (canvas.height = window.innerHeight * 0.8);

$(window).on("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.8;
});

// Inventory and cash variables used in day-simulation screen (to update DOM)
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

// Animation variables
let gameFrame = 0;
const humanArray = [];

// Creating Human class
class Human {
  constructor(direction, src, frame, dx, isCustomer, speed, walkSpeed) {
    // Parameters that impact which direction element moves
    this.direction = direction; // LTR, RTL
    this.src = src; // Source of image
    this.frame = frame; // frame number (of spritesheet) its using (0 or 4) at start of animation
    this.x = dx; // dx

    // Parameters that impact if element moves up to the stand to pause
    this.isCustomer = isCustomer; // Yes, No
    this.updatedDOM = false; // Yes, No; Indication of whether the cash and inventory balance has been updated upon sale

    // Parameters that impact speed of animation
    this.speedX = speed; // How fast the element moves along x-axis (destination speed)
    this.walkSpeed = walkSpeed; // How fast the elements animation is (source speed)

    // Fixed variables
    this.image = new Image();
    this.image.src = this.src; // Source of img
    this.spriteWidth = 145; // sw
    this.spriteHeight = 200; // sh
    this.y = CANVAS_HEIGHT * (Math.random() * (0.7 - 0.45) + 0.45); // dy
    this.width = this.spriteWidth; // dw
    this.height = this.spriteHeight; // dh
    this.stoplocX = Math.floor(canvas.width * 0.4 + Math.random() * 350); // x coordinate of where the element will stop to buy cup
    this.stoplocY = CANVAS_HEIGHT * 0.3; // y coordinate of where the element will stop to buy cup
    this.speedY = (this.stoplocY - this.y) / (this.stoplocX - this.x); // How fast element moves along y-axis (up/down)
  }

  // Method that updates x/y coordinate of each element (called in each animation loop)
  update() {
    // Scenario 1: Element moves from Left to Right & Buys a cup
    if (this.direction === "LTR" && this.isCustomer === "Yes") {
      // Before element reaches x-coordinate where element pauses
      if (this.x < this.stoplocX - this.speedX) {
        this.y += this.speedY;
        this.x += this.speedX;
      } // When element reaches x-coordiate to pause
      else if (
        this.x > this.stoplocX - this.speedX &&
        this.x < this.stoplocX + this.speedX
      ) {
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

          // Update DOM screen
          $("#paper-cups-qty-dashboard").text(inventorySimulation.paperCups);
          $("#lemon-qty-dashboard").text(inventorySimulation.lemon);
          $("#sugar-qty-dashboard").text(inventorySimulation.sugar);
          $("#ice-cubes-qty-dashboard").text(inventorySimulation.iceCubes);
          $("#cash-dashboard").text(cashSimualtion.toFixed(2));
        }, 2000);
      } // After the element passes the x-coordinate to pause
      else if (
        this.x >= this.stoplocX + this.speedX &&
        this.x < CANVAS_WIDTH * 0.7
      ) {
        this.x += this.speedX;
        this.y += Math.random() * (2 - 0.5 + 1) + 0.5;
      } else {
        this.x += this.speedX;
      }
      // Update frame to make walking motion
      if (gameFrame % this.walkSpeed === 0) {
        this.frame > 2 ? (this.frame = 0) : this.frame++;
      }
    } // Scenario 2: Element moves from Left to Right & Do not buy a cup
    else if (this.direction === "LTR" && this.isCustomer === "No") {
      // Update x-coordinate so element moves along x-axis on screen
      this.x += this.speedX;

      // Update frame to make walking motion
      if (gameFrame % this.walkSpeed === 0) {
        this.frame > 2 ? (this.frame = 0) : this.frame++;
      }
    } // Scenario 3: Element moves from Right to Left & Buys a cup
    else if (this.direction === "RTL" && this.isCustomer === "Yes") {
      // Before element reaches x-coordinate where element pauses
      if (this.x > this.stoplocX + this.speedX) {
        this.y -= this.speedY;
        this.x -= this.speedX;
      } // When element reaches x-coordiate to pause
      else if (
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

          // Update DOM screen
          $("#paper-cups-qty-dashboard").text(inventorySimulation.paperCups);
          $("#lemon-qty-dashboard").text(inventorySimulation.lemon);
          $("#sugar-qty-dashboard").text(inventorySimulation.sugar);
          $("#ice-cubes-qty-dashboard").text(inventorySimulation.iceCubes);
          $("#cash-dashboard").text(cashSimualtion.toFixed(2));
        }, 2000);
      } // After the element passes the x-coordinate to pause
      else if (
        this.x <= this.stoplocX - this.speedX &&
        this.x > CANVAS_WIDTH * 0.3
      ) {
        this.x -= this.speedX;
        this.y += Math.random() * (2 - 0.5 + 1) + 0.5;
      } else {
        this.x -= this.speedX;
      }

      // Update frame to make walking motion
      if (gameFrame % this.walkSpeed === 0) {
        this.frame < 1 ? (this.frame = 3) : this.frame--;
      }
    } // Scenario 4: Element moves from Left to Right & Do not buy a cup
    else if (this.direction === "RTL" && this.isCustomer === "No") {
      // Update x-coordinate so element moves along x-axis on screen
      this.x -= this.speedX;

      // Update frame to make walking motion
      if (gameFrame % this.walkSpeed === 0) {
        this.frame < 1 ? (this.frame = 3) : this.frame--;
      }
    } else {
      return;
    }
  }

  // Method that draws the element (called in each animation loop)
  draw() {
    if (animation) {
      window.cancelAnimationFrame(animation);
    }

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

// Function to animate human instances
function animateHuman() {
  // Clear previous frames
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Updating and drawing on screen
  humanArray.forEach((human) => {
    human.update();
    human.draw();
  });

  // Calling the animate function again to create a loop
  gameFrame++;
  animation = window.requestAnimationFrame(animateHuman);
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
