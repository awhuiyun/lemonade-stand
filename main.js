import {
  startGame,
  buyInventory,
  endTheDay,
  goToNextDay,
} from "./toggleScreen.js";
import { simulateDay } from "./simulation.js";

// Variables
let day = 1;
const inventory = {
  paperCups: 0,
  lemon: 0,
  sugar: 0,
  iceCubes: 0,
};

$(() => {
  // Event listeners to toggle between screens
  // $("#start-game-btn").on("click", startGame);
  // $("#buy-inventory-btn").on("click", buyInventory);
  // $("#end-day-btn").on("click", endTheDay);
  // $("#next-day-btn").on("click", goToNextDay);

  simulateDay();
});
