// toggle screen function
function toggleScreen(id, toggle) {
  let element = $("#" + id);
  let display = toggle ? "block" : "none";

  element.css("display", display);
}

// Start game function
function startGame() {
  toggleScreen("start-game-screen", false);
  toggleScreen("day-start-screen", true);
}

// Buy inventory function
function buyInventory() {
  toggleScreen("day-start-screen", false);
  toggleScreen("day-simulation-screen", true);
}

// End the day function
function endTheDay() {
  toggleScreen("day-simulation-screen", false);
  toggleScreen("day-end-screen", true);
}

// Go to next day function
function goToNextDay() {
  toggleScreen("day-end-screen", false);
  toggleScreen("end-game-screen", true);
}

export { startGame, buyInventory, endTheDay, goToNextDay };
