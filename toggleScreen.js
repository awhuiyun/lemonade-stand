// Function that toggle screen
function toggleScreen(id, toggle) {
  let element = $("#" + id);
  let display = toggle ? "block" : "none";

  element.css("display", display);
}

// Create toggling functions for respective buttons
function toggleStartGameToDayStart() {
  toggleScreen("start-game-screen", false);
  toggleScreen("day-start-screen", true);
}

function toggleDayStartToSimulation() {
  toggleScreen("day-start-screen", false);
  toggleScreen("day-simulation-screen", true);
}

function toggleSimulationToDayEnd() {
  toggleScreen("day-simulation-screen", false);
  toggleScreen("day-end-screen", true);
}

function toggleDayEndToDayStart() {
  toggleScreen("day-end-screen", false);
  toggleScreen("day-start-screen", true);
}

function toggleDayEndToEndGame() {
  toggleScreen("day-end-screen", false);
  toggleScreen("end-game-screen", true);
}

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
