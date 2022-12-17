import { probabilityOfPurchase } from "./probability.js";
import {
  randomWeather,
  randomTemperature,
  randomNumOfCustomers,
} from "./randomisation.js";
import { eodReportUpdate } from "./updateEodReport.js";
import { maxCupsCalculation } from "./maxCupsCalculation.js";
import { inventory, cash, recipe } from "./variables.js";

// Function to simulate day
function simulateDay() {
  // Randomize demand factors and calcualate probability of purchase
  const weather = randomWeather();
  const temperature = randomTemperature();
  const price = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
  const probability = probabilityOfPurchase(weather, temperature, price);

  // Randomize number of customers
  const numOfCustomers = randomNumOfCustomers();

  // Calculate maximum number of cups that can be sold
  const maxCupsThatCanBeSold = maxCupsCalculation(
    inventory.paperCups,
    inventory.lemon,
    inventory.sugar,
    inventory.iceCubes
  );

  // Count of customers who bought and did not buy
  let boughtCount = 0;
  let didNotBuyCount = 0;

  // Simulate if each customer buy or did not buy
  for (let i = 1; i <= numOfCustomers; i++) {
    // Interaction with screen (append text for now)
    const $result = $("<img>");

    if (boughtCount < maxCupsThatCanBeSold) {
      // Randomization
      const randomNum = Math.random();

      if (randomNum <= probability) {
        boughtCount++;
        inventory.paperCups = inventory.paperCups - recipe.paperCups;
        inventory.lemon = inventory.lemon - recipe.lemon;
        inventory.sugar = inventory.sugar - recipe.sugar;
        inventory.iceCubes = inventory.iceCubes - recipe.iceCubes;
        // cash = cash + price;
        $result.attr("src", "./images/tick.png").width("50px");
      } else {
        didNotBuyCount++;
        $result.attr("src", "./images/cross.png").width("50px");
      }
    } else {
      didNotBuyCount++;
      $result.attr("src", "./images/cross.png").width("50px");
    }

    // Append result on screen
    $("#simulation-header").after($result);
  }

  // Toggle to day_end screen and update report
  // Place toggle here
  eodReportUpdate(boughtCount, numOfCustomers, cash);

  // check
  //   console.log(weather);
  //   console.log(temperature);
  //   console.log(price);
  //   console.log(probability);
  //   console.log("num of customers: " + numOfCustomers);
  //   console.log("bought: " + boughtCount);
  //   console.log("did not buy: " + didNotBuyCount);
}

export { simulateDay };
