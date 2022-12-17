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

export { randomWeather };
