// toggle screen function
function toggleScreen(id, toggle) {
  let element = $("#" + id);
  let display = toggle ? "block" : "none";

  element.css("display", display);
}
// Toggle to day
function toggleStartGameToDayStart() {
  toggleScreen("start-game-screen", false);
  toggleScreen("day-start-screen", true);
}

// Buy inventory function
function toggleDayStartToSimulation() {
  toggleScreen("day-start-screen", false);
  toggleScreen("day-simulation-screen", true);
}

// End the day function
function toggleSimulationToDayEnd() {
  toggleScreen("day-simulation-screen", false);
  toggleScreen("day-end-screen", true);
}

function toggleDayEndToDayStart() {
  toggleScreen("day-end-screen", false);
  toggleScreen("day-start-screen", true);
}

// Go to next day function
function toggleDayEndToEndGame() {
  toggleScreen("day-end-screen", false);
  toggleScreen("end-game-screen", true);
}

// Replay function
function toggleEndGameToStartGame() {
  toggleScreen("end-game-screen", false);
  toggleScreen("start-game-screen", true);
}

export {
  toggleStartGameToDayStart,
  toggleDayStartToSimulation,
  toggleSimulationToDayEnd,
  toggleDayEndToDayStart,
  toggleDayEndToEndGame,
  toggleEndGameToStartGame,
};
