function randomTemperature() {
  const temperature = Math.floor(Math.random() * (35 - 5 + 1)) + 5;
  return temperature;
}

export { randomTemperature };
