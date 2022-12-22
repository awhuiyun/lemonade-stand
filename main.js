import {
  toggleStartGameToDayStart,
  toggleDayStartToSimulation,
  toggleSimulationToDayEnd,
  toggleDayEndToDayStart,
  toggleDayEndToEndGame,
  toggleEndGameToStartGame,
} from "./toggleScreen.js";
import { startNewDay } from "./startNewDay.js";
import { simulationResult, simulationAnimation } from "./simulation.js";
import {
  animateHuman,
  inventorySimulation,
  setCashSimulation,
  cashSimualtion,
} from "./animateHuman.js";

// Declare Variables
let day = 0;
let weather = "";
let temperature = 0;
let price = 0;
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
const balanceSheet = {
  cost: 0,
  sales: 0,
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

// Function to play sound
function playSound(name) {
  let audio = new Audio("sound/" + name + ".mp3");
  audio.play();
}

// Link JS to HTML file
$(() => {
  // Event listeners on start-game-screen
  // Start game
  $("#start-game-btn").on("click", () => {
    playSound("click_sound");
    toggleStartGameToDayStart();
    startNewDay();
  });

  // Event listeners on day-start-screen
  // Tooltip for headers - mouseover
  $("#day-start-screen-header").on("mouseover", (e) => {
    if ($(e.target).attr("id") === "weather-header") {
      $("#weather-report-section").css("display", "block");
    } else if ($(e.target).attr("id") === "recipe-header") {
      $("#recipe-section").css("display", "block");
    } else if ($(e.target).attr("id") === "tips-header") {
      $("#help-section").css("display", "block");
    }
  });
  // Tooltip for headers - mouseout
  $("#day-start-screen-header").on("mouseout", (e) => {
    if ($(e.target).attr("id") === "weather-header") {
      $("#weather-report-section").css("display", "none");
    } else if ($(e.target).attr("id") === "recipe-header") {
      $("#recipe-section").css("display", "none");
    } else if ($(e.target).attr("id") === "tips-header") {
      $("#help-section").css("display", "none");
    }
  });

  // Purchase inventory buttons
  $(".button-container").on("click", (e) => {
    playSound("click_sound");
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
        cashSpent = 6.0;
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
        qty = 70;
        cashSpent = 46.8;
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
        qty = 120;
        cashSpent = 2.5;
        break;
      case "ice-cubes-2":
        item = "iceCubes";
        qty = 300;
        cashSpent = 5.3;
        break;
      case "ice-cubes-3":
        item = "iceCubes";
        qty = 600;
        cashSpent = 13;
        break;
    }

    // Allow purchase if there's sufficient balance
    if (cashSpent <= cash) {
      // Cash balance
      cash -= cashSpent;
      balanceSheet.cost += cashSpent;
      $(".cash").text(cash.toFixed(2));

      // Inventory balance
      inventory[item] = inventory[item] + qty;

      switch (item) {
        case "paperCups":
          $(".paper-cups-qty").text(inventory[item]);
          break;
        case "lemon":
          $(".lemon-qty").text(inventory[item]);
          break;
        case "sugar":
          $(".sugar-qty").text(inventory[item]);
          break;
        case "iceCubes":
          $(".ice-cubes-qty").text(inventory[item]);
          break;
      }
    } // Do not allow purchase if there's insufficient balance
    else {
      alert("Insufficient cash!");
    }
  });

  // Input for price per cup
  $("#price-input").on("change", (e) => {
    price = parseFloat($(e.target).val());
  });

  // Open shop button
  $("#open-shop-btn").on("click", () => {
    // Play click sound
    playSound("click_sound");
    // Update cash and inventory variables & DOM on day-simulation screen
    setCashSimulation(cash);
    inventorySimulation.paperCups = inventory.paperCups;
    inventorySimulation.lemon = inventory.lemon;
    inventorySimulation.sugar = inventory.sugar;
    inventorySimulation.iceCubes = inventory.iceCubes;
    $("#paper-cups-qty-dashboard").text(inventorySimulation.paperCups);
    $("#lemon-qty-dashboard").text(inventorySimulation.lemon);
    $("#sugar-qty-dashboard").text(inventorySimulation.sugar);
    $("#ice-cubes-qty-dashboard").text(inventorySimulation.iceCubes);
    $("#cash-dashboard").text(cashSimualtion.toFixed(2));

    // Run demand calculation and animation functions
    toggleDayStartToSimulation();
    simulationResult(weather, temperature, price);
    simulationAnimation(price);
    animateHuman();
  });

  // Event listeners on day-simulation-screen
  $("#close-shop-btn").on("click", () => {
    // Play click sound
    playSound("click_sound");

    // Hide close shop button
    $("#close-shop-btn").css("display", "none");

    // Toggle page to next screen (day-end-screen)
    toggleSimulationToDayEnd();

    if (day === 7) {
      $("#prep-next-day-btn").text("End season!");
    }
  });

  // Event listeners on day-end-screen
  $("#prep-next-day-btn").on("click", () => {
    // Play click sound
    playSound("click_sound");

    if (day < 7) {
      // Expire lemons and ice
      inventory.lemon = 0;
      inventory.iceCubes = 0;

      // Toggle page to next screen and reset day
      toggleDayEndToDayStart();
      startNewDay();
    } else {
      // Toggle to and update End-game screen
      $("#total-expenses").text(balanceSheet.cost.toFixed(2));
      $("#total-sales").text(balanceSheet.sales.toFixed(2));
      $(".cash").text(cash.toFixed(2));
      toggleDayEndToEndGame();
    }
  });

  // Event listeners on end-game-screen
  $("#replay-btn").on("click", () => {
    // Play click sound
    playSound("click_sound");

    // Reload window and toggle to start-game screen
    location.reload();
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
  balanceSheet,
  setDay,
  setWeather,
  setTemperature,
  setPrice,
  setCash,
};
