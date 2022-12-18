import { probabilityOfPurchase } from "./supporting_files/probability.js";
import {
  randomWeather,
  randomTemperature,
  randomNumOfCustomers,
} from "./supporting_files/randomisation.js";
import { eodReportUpdate } from "./supporting_files/updateEodReport.js";
import { maxCupsCalculation } from "./supporting_files/maxCupsCalculation.js";
import { inventory, cash, setCash, recipe } from "./main.js";

// Function to simulate day
function simulateDay(weather, temperature, price) {
  // Calculate probability of purchase
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
    // Interaction with screen (append img for now)
    const $result = $("<img>");

    // Logic if customer buys or does not buy a cup
    // Customer is able to purchase a cup (sufficient inventory)
    if (boughtCount < maxCupsThatCanBeSold) {
      const randomNum = Math.random();
      if (randomNum <= probability) {
        // Customer buys a cup
        boughtCount++;
        inventory.paperCups = inventory.paperCups - recipe.paperCups;
        inventory.lemon = inventory.lemon - recipe.lemon;
        inventory.sugar = inventory.sugar - recipe.sugar;
        inventory.iceCubes = inventory.iceCubes - recipe.iceCubes;
        setCash(cash + price);
        $result.attr("src", "./images/tick.png").width("50px");
      } else {
        // Customer does not buy a cup
        didNotBuyCount++;
        $result.attr("src", "./images/cross.png").width("50px");
      }
    } else {
      // Customer is not able to purchase a cup (insufficient inventory)
      didNotBuyCount++;
      $result.attr("src", "./images/cross.png").width("50px");
    }

    // Append result on screen
    $("#simulation-header").after($result);
  }

  // Update EOD report
  eodReportUpdate(boughtCount, numOfCustomers, cash);
}

export { simulateDay };
