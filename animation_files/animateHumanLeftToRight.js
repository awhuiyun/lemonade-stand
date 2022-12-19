const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d"); // Allows you to use canvas methods

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

$(window).on("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Animation for Human walking from Left to Right
const imgHumanLeftToRight = new Image();
imgHumanLeftToRight.src = "./images/humanLeftToRight.png";
const spriteWidth = 145;
const spriteHeight = 200;
let frameX = 0;
let destinationX = 0;
let destinationY = 500;
let gameFrame = 0;
let staggerFrames = 5;

function animateHumanLeftToRight() {
  // This clears previous frames
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // source (image link), source-x, source-y, source-width, source-height, canvas-x (d), d-y, d-w, dh
  ctx.drawImage(
    imgHumanLeftToRight,
    frameX * spriteWidth,
    0,
    spriteWidth,
    spriteHeight,
    destinationX,
    destinationY,
    spriteWidth * 1.5,
    spriteHeight * 1.5
  );

  if (gameFrame % staggerFrames === 0) {
    if (frameX < 3) {
      frameX++;
    } else {
      frameX = 0;
    }
  }

  destinationX += 3;
  gameFrame++;
  requestAnimationFrame(animateHumanLeftToRight);
}
export { animateHumanLeftToRight };
