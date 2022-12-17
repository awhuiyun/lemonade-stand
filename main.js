import {
  startGame,
  buyInventory,
  endTheDay,
  goToNextDay,
} from "./toggleScreen.js";
import { probabilityOfPurchase } from "./probability.js";
import {
  randomWeather,
  randomTemperature,
  randomNumOfCustomers,
} from "./randomisation.js";

$(() => {
  // Event listeners to toggle between screens
  // $("#start-game-btn").on("click", startGame);
  // $("#buy-inventory-btn").on("click", buyInventory);
  // $("#end-day-btn").on("click", endTheDay);
  // $("#next-day-btn").on("click", goToNextDay);

  const weather = randomWeather();
  const temperature = randomTemperature();
  const numOfCustomers = randomNumOfCustomers();

  probabilityOfPurchase(weather, temperature, 6.5);
});
