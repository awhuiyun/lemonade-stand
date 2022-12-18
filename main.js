import {
  toggleStartGameToDayStart,
  toggleDayStartToSimulation,
  toggleSimulationToDayEnd,
  toggleDayEndToDayStart,
  toggleDayEndToEndGame,
} from "./toggleScreen.js";
import { startNewDay } from "./startNewDay.js";
import { simulateDay } from "./simulation.js";

// Declare Variables
let day = 0;
let weather = "";
let temperature = 0;
let price = 1;
let cash = 50;
const inventory = {
  paperCups: 50,
  lemon: 50,
  sugar: 50,
  iceCubes: 50,
};
const recipe = {
  paperCups: 1,
  lemon: 1,
  sugar: 2,
  iceCubes: 8,
};

// Functions to edit variables
function setDay(value) {
  day = value;
}

function setWeather(value) {
  weather = value;
}

function setTemperature(value) {
  temperature = value;
}

function setPrice(value) {
  price = value;
}

function setCash(value) {
  cash = value;
}

// Link JS to HTML file
$(() => {
  // Event listeners on start-game-screen
  $("#start-game-btn").on("click", () => {
    toggleStartGameToDayStart();
    startNewDay();
  });

  // Event listeners on day-start-screen
  // Inventory buttons
  // Price input
  // Open shop button
  $("#open-shop-btn").on("click", () => {
    toggleDayStartToSimulation();
    simulateDay(weather, temperature, price);
  });

  // Event listeners on day-simulation-screen
  $("#close-shop-btn").on("click", () => {
    $("img").remove();
    toggleSimulationToDayEnd();
  });

  // Event listeners on day-end-screen
  $("#prep-next-day-btn").on("click", () => {
    if (day < 7) {
      toggleDayEndToDayStart();
      startNewDay();
    } else {
      toggleDayEndToEndGame();
    }
  });
  // $("#end-day-btn").on("click", endTheDay);
  // $("#next-day-btn").on("click", goToNextDay);
  // Event listeners on end-game-screen
  // simulateDay();
});

export {
  day,
  weather,
  temperature,
  price,
  cash,
  inventory,
  recipe,
  setDay,
  setWeather,
  setTemperature,
  setPrice,
  setCash,
};
