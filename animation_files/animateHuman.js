const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

// Setting dynamic canvas width and height
let CANVAS_WIDTH = (canvas.width = window.innerWidth);
let CANVAS_HEIGHT = (canvas.height = window.innerHeight * 0.8);

$(window).on("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.8;
});

// Creating a Human Left to Right class
class Human {
  constructor(direction, src, frame, dx, speed, walkSpeed) {
    // Input impacts which direction
    this.direction = direction;
    this.src = src;
    this.frame = frame; // frame number its using (0-4)
    this.x = dx; // dx

    // Input impacts speed
    this.speed = speed; // How fast the element moves to right/left (destination speed)
    this.walkSpeed = walkSpeed; // How fast the human is walking (source speed)

    this.image = new Image();
    this.image.src = this.src;
    this.spriteWidth = 145; // sw
    this.spriteHeight = 200; // sh
    this.y = CANVAS_HEIGHT * (Math.random() * (0.7 - 0.45) + 0.45); // dy
    this.width = this.spriteWidth; // dw
    this.height = this.spriteHeight; // dh
  }

  // Updates done with each animation loop
  update() {
    // If its a
    if (this.direction === "LTR") {
      this.x += this.speed;

      // Increase this.frame to make walking motion
      if (gameFrame % this.walkSpeed === 0) {
        this.frame > 2 ? (this.frame = 0) : this.frame++;
      }
    } else {
      this.x -= this.speed;

      // Increase this.frame to make walking motion
      if (gameFrame % this.walkSpeed === 0) {
        this.frame < 1 ? (this.frame = 3) : this.frame--;
      }
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
// const numberOfHuman = 3;
let gameFrame = 0;
const humanArray = [];

const humanOne = new Human("LTR", "../images/humanLeftToRight.png", 0, 0, 2, 4);
const humanTwo = new Human(
  "RTL",
  "../images/humanRightToLeft.png",
  4,
  CANVAS_WIDTH * 0.95,
  2,
  4
);

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

export { animateHuman, Human, humanArray, CANVAS_WIDTH };
