function weatherProbability(weather) {
  if (weather === "Thunderstorm") {
    return 0.5;
  } else if (weather === "Rain") {
    return 0.6;
  } else if (weather === "Light Drizzle") {
    return 0.7;
  } else if (weather === "Hazy") {
    return 0.8;
  } else if (weather === "Cloudy") {
    return 0.9;
  } else if (weather === "Clear and Sunny") {
    return 1.0;
  }
}

function temperatureProbability(temperature) {
  if (temperature >= 5 && temperature <= 10) {
    return 0.5;
  } else if (temperature > 10 && temperature <= 15) {
    return 0.6;
  } else if (temperature > 15 && temperature <= 20) {
    return 0.7;
  } else if (temperature > 20 && temperature <= 25) {
    return 0.8;
  } else if (temperature > 25 && temperature <= 30) {
    return 0.9;
  } else if (temperature > 30 && temperature <= 35) {
    return 1.0;
  }
}

function priceProbability(price) {
  if (price <= 1) {
    return 1.0;
  } else if (price > 1 && price <= 1.5) {
    return 0.95;
  } else if (price > 1.5 && price <= 2) {
    return 0.9;
  } else if (price > 2 && price <= 2.5) {
    return 0.85;
  } else if (price > 2.5 && price <= 3) {
    return 0.8;
  } else if (price > 3 && price <= 4) {
    return 0.75;
  } else if (price > 4 && price <= 5) {
    return 0.7;
  } else if (price > 5 && price <= 6) {
    return 0.65;
  } else if (price > 6 && price <= 7) {
    return 0.6;
  } else if (price > 7) {
    return 0.55;
  }
}

function probabilityOfPurchase(weather, temperature, price) {
  const weatherFactor = weatherProbability(weather);
  const temperatureFactor = temperatureProbability(temperature);
  const priceFactor = priceProbability(price);
  const probability = weatherFactor * temperatureFactor * priceFactor;

  return probability;
}

export { probabilityOfPurchase };
