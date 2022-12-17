// Randomise weather
const weatherArray = [
  "Thunderstorm",
  "Rain",
  "Light Drizzle",
  "Cloudy",
  "Hazy",
  "Clear and Sunny",
];

function randomWeather() {
  const randomNum = Math.floor(Math.random() * weatherArray.length);
  const weather = weatherArray[randomNum];
  return weather;
}

// Randomise temperature
function randomTemperature() {
  const temperature = Math.floor(Math.random() * (35 - 5 + 1)) + 5;
  return temperature;
}

// Randomize customers
function randomNumOfCustomers() {
  const numOfCustomers = Math.floor(Math.random() * (100 - 75 + 1)) + 75;
  return numOfCustomers;
}

export { randomWeather, randomTemperature, randomNumOfCustomers };
