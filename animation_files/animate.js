const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

// Ensure scaling is correct
let CANVAS_WIDTH = (canvas.width = window.innerWidth);
let CANVAS_HEIGHT = (canvas.height = window.innerHeight * 0.8);

$(window).on("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.8;
});

// Variables
const numberOfHumanLTR = 2;
let gameFrameLTR = 0;
const humanArrayLTR = [];

const numberOfHumanRTL = 1;
let gameFrameRTL = 0;
const humanArrayRTL = [];

// Creating a Human Left to Right class
class HumanLTR {
  constructor() {
    this.image = new Image();
    this.image.src = "../images/humanLeftToRight.png";
    this.x = 0; // dx
    this.y = CANVAS_HEIGHT * 0.5; // dy
    this.speed = 1; // How fast the element moves to right/left
    this.spriteWidth = 145; // sw
    this.spriteHeight = 200; // sh
    this.width = this.spriteWidth; // dw
    this.height = this.spriteHeight; // dh
    this.frame = 0; // frame number its using (0-4)
    this.walkSpeed = 4; // How fast the human is walking
  }

  // Updates done with each animation loop
  update() {
    // Increase x coordinate to make it move right
    this.x += this.speed;

    // Increase this.frame to make walking motion
    if (gameFrameLTR % this.walkSpeed === 0) {
      this.frame > 2 ? (this.frame = 0) : this.frame++;
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

// Creating a Human Right to Left class
class HumanRTL {
  constructor() {
    this.image = new Image();
    this.image.src = "../images/humanRightToLeft.png";
    this.x = CANVAS_WIDTH * 0.95; // dx
    this.y = CANVAS_HEIGHT * 0.5; // dy
    this.speed = 1; // How fast the element moves to right/left
    this.spriteWidth = 145; // sw
    this.spriteHeight = 200; // sh
    this.width = this.spriteWidth; // dw
    this.height = this.spriteHeight; // dh
    this.frame = 3; // frame number its using (0-4)
    this.walkSpeed = 4; // How fast the human is walking
  }

  // Updates done with each animation loop
  update() {
    // Increase x coordinate to make it move left
    this.x -= this.speed;

    // Increase this.frame to make walking motion
    if (gameFrameRTL % this.walkSpeed === 0) {
      this.frame < 1 ? (this.frame = 3) : this.frame--;
    }

    if (gameFrameRTL === 700) {
      this.speed = 0;
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

// Creating instances of HumanLTR & HumanRTL and pushing them into arrays
for (let i = 1; i <= numberOfHumanLTR; i++) {
  humanArrayLTR.push(new HumanLTR());
}

for (let i = 1; i <= numberOfHumanRTL; i++) {
  humanArrayRTL.push(new HumanRTL());
}

// Function to animate
function animate() {
  // Clear previous frames
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Creating an animation for each human type
  humanArrayLTR.forEach((human) => {
    human.update();
    human.draw();
  });

  humanArrayRTL.forEach((human) => {
    human.update();
    human.draw();
  });

  // Calling the animate function again to create a loop
  gameFrameLTR++;
  gameFrameRTL++;
  requestAnimationFrame(animate);
}

export { animate };
