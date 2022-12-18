import {
  toggleStartGameToDayStart,
  toggleDayStartToSimulation,
  toggleSimulationToDayEnd,
  toggleDayEndToDayStart,
  toggleDayEndToEndGame,
  toggleEndGameToStartGame,
} from "./toggleScreen.js";
import { startNewDay } from "./startNewDay.js";
import { simulateDay } from "./simulation.js";

// Declare Variables
let day = 0;
let weather = "";
let temperature = 0;
let price = 1;
let cash = 100;
const inventory = {
  paperCups: 0,
  lemon: 0,
  sugar: 0,
  iceCubes: 0,
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
  $("#inventory-btns").on("click", (e) => {
    const option = $(e.target).attr("id");
    let item = "";
    let qty = 0;
    let cashSpent = 0;

    switch (option) {
      case "paper-cups-1":
        item = "paperCups";
        qty = 25;
        cashSpent = 1.8;
        break;
      case "paper-cups-2":
        item = "paperCups";
        qty = 50;
        cashSpent = 3.3;
        break;
      case "paper-cups-3":
        item = "paperCups";
        qty = 100;
        cashSpent = 6;
        break;
      case "lemon-1":
        item = "lemon";
        qty = 10;
        cashSpent = 7.9;
        break;
      case "lemon-2":
        item = "lemon";
        qty = 30;
        cashSpent = 22.2;
        break;
      case "lemon-3":
        item = "lemon";
        qty = 75;
        cashSpent = 50.5;
        break;
      case "sugar-1":
        item = "sugar";
        qty = 30;
        cashSpent = 3.9;
        break;
      case "sugar-2":
        item = "sugar";
        qty = 75;
        cashSpent = 8.4;
        break;
      case "sugar-3":
        item = "sugar";
        qty = 150;
        cashSpent = 13.3;
        break;
      case "ice-cubes-1":
        item = "iceCubes";
        qty = 100;
        cashSpent = 2.5;
        break;
      case "ice-cubes-2":
        item = "iceCubes";
        qty = 250;
        cashSpent = 5.3;
        break;
      case "ice-cubes-3":
        item = "iceCubes";
        qty = 1000;
        cashSpent = 13;
        break;
    }

    if (cashSpent <= cash) {
      // Cash balance
      cash -= cashSpent;
      $(".cash").text(cash);

      // Inventory balance
      inventory[item] = inventory[item] + qty;

      switch (item) {
        case "paperCups":
          $("#paper-cups-qty").text(inventory[item]);
          break;
        case "lemon":
          $("#lemon-qty").text(inventory[item]);
          break;
        case "sugar":
          $("#sugar-qty").text(inventory[item]);
          break;
        case "iceCubes":
          $("#ice-cubes-qty").text(inventory[item]);
          break;
      }
    } else {
      alert("Insufficient cash!");
    }
  });

  // Price input
  $("#price-input").on("change", (e) => {
    price = parseInt($(e.target).val());
  });

  // Open shop button
  $("#open-shop-btn").on("click", () => {
    console.log(typeof price);
    toggleDayStartToSimulation();
    simulateDay(weather, temperature, price);
  });

  // Event listeners on day-simulation-screen
  $("#close-shop-btn").on("click", () => {
    $("img").remove();
    toggleSimulationToDayEnd();

    if (day === 7) {
      $("#prep-next-day-btn").text("End season!");
    }
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

  // Event listeners on end-game-screen
  $("#replay-btn").on("click", () => {
    toggleEndGameToStartGame();
  });
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
