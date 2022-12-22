import { probabilityOfPurchase } from "./supporting_files/probability.js";
import { randomNumOfCustomers } from "./supporting_files/randomisation.js";
import { eodReportUpdate } from "./supporting_files/updateEodReport.js";
import { maxCupsCalculation } from "./supporting_files/maxCupsCalculation.js";
import { delay } from "./supporting_files/delay.js";
import { inventory, cash, setCash, recipe, balanceSheet } from "./main.js";
import {
  Human,
  CANVAS_WIDTH,
  resetGameframe,
  humanArray,
} from "./animateHuman.js";

// Declaring supporting variables
const resultArray = [];
let boughtCount = 0;
let didNotBuyCount = 0;

// Function to simulate demand for the day
function simulationResult(weather, temperature, price) {
  // Clear boughtCount and didNotBuyCount variable (from previous day/round)
  boughtCount = 0;
  didNotBuyCount = 0;

  // Randomize number of customers
  const numOfCustomers = randomNumOfCustomers();

  // Calculate probability of purchase for each customer
  const probability = probabilityOfPurchase(weather, temperature, price);

  // Calculate maximum number of cups that can be sold in the day
  const maxCupsThatCanBeSold = maxCupsCalculation(
    inventory.paperCups,
    inventory.lemon,
    inventory.sugar,
    inventory.iceCubes
  );

  // Simulate if each customer buy or did not buy
  for (let i = 1; i <= numOfCustomers; i++) {
    // Customer is able to purchase a cup (sufficient inventory)
    if (boughtCount < maxCupsThatCanBeSold) {
      const randomNum = Math.random();
      // Customer buys a cup
      if (randomNum <= probability) {
        boughtCount++;
        inventory.paperCups = inventory.paperCups - recipe.paperCups;
        inventory.lemon = inventory.lemon - recipe.lemon;
        inventory.sugar = inventory.sugar - recipe.sugar;
        inventory.iceCubes = inventory.iceCubes - recipe.iceCubes;
        balanceSheet.sales += price;
        setCash(cash + price);
        resultArray.push("Yes");
      } // Customer does not buy a cup
      else {
        didNotBuyCount++;
        resultArray.push("No");
      }
    } else {
      // Customer is not able to purchase a cup (insufficient inventory)
      didNotBuyCount++;
      resultArray.push("No");
    }
  }

  // Update EOD report
  eodReportUpdate(boughtCount, numOfCustomers);
}

// Function to loop through resultArray and create array of Human instances
async function simulationAnimation(price) {
  for (let i = 0; i <= resultArray.length - 1; i++) {
    // Slow down the next iteration by 0.5 secs
    delay;
    await delay(500);

    // Declare variable for new human instance
    let human;
    const option = Math.floor(Math.random() * 2); // Returns 0 or 1

    // Customer buys a cup
    // Create Human instance that will walk to and pause at lemonade stand (randomize direction)
    if (resultArray[i] === "Yes") {
      if (option === 0) {
        human = new Human(
          "LTR",
          "../images/humanLeftToRight.png",
          0,
          0,
          "Yes",
          2,
          4
        );
      } else {
        human = new Human(
          "RTL",
          "../images/humanRightToLeft.png",
          4,
          CANVAS_WIDTH * 0.95,
          "Yes",
          2,
          4
        );
      }

      humanArray.push(human);
    } // Customer does not buy a cup
    // Create Human instance that will just walk straight (randomize direction)
    else {
      if (option === 0) {
        human = new Human(
          "LTR",
          "../images/humanLeftToRight.png",
          0,
          0,
          "No",
          2,
          4
        );
      } else {
        human = new Human(
          "RTL",
          "../images/humanRightToLeft.png",
          4,
          CANVAS_WIDTH * 0.95,
          "No",
          2,
          4
        );
      }
      humanArray.push(human);
    }
  }

  // Function to run 15 secs after the loop ends (allows animateHuman function to complete running first)
  setTimeout(() => {
    // Pop up "Close shop button"
    $("#close-shop-btn").css("display", "block");

    // Clear arrays
    humanArray.splice(0, humanArray.length);
    resetGameframe();
    resultArray.splice(0, resultArray.length);
  }, 15000);
}

export { simulationResult, simulationAnimation, resultArray };
