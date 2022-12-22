import {
  day,
  weather,
  temperature,
  cash,
  inventory,
  setDay,
  setWeather,
  setTemperature,
} from "./main.js";

import {
  randomWeather,
  randomTemperature,
} from "./supporting_files/randomisation.js";

// Function that resets start-day screen for a new round
function startNewDay() {
  // Randomize weather, temperature conditions
  setDay(day + 1);
  setWeather(randomWeather());
  setTemperature(randomTemperature());

  // Update DOM
  $(".day-num").text(day);
  $("#temp").text(temperature);
  $("#weather").text(weather);
  $(".cash").text(cash.toFixed(2));
  $(".paper-cups-qty").text(inventory.paperCups);
  $(".lemon-qty").text(inventory.lemon);
  $(".sugar-qty").text(inventory.sugar);
  $(".ice-cubes-qty").text(inventory.iceCubes);
}

export { startNewDay };
