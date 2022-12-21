import { probabilityOfPurchase } from "./supporting_files/probability.js";
import { randomNumOfCustomers } from "./supporting_files/randomisation.js";
import { eodReportUpdate } from "./supporting_files/updateEodReport.js";
import { maxCupsCalculation } from "./supporting_files/maxCupsCalculation.js";
import { delay } from "./supporting_files/delay.js";
import {
  inventory,
  cash,
  setCash,
  recipe,
  balanceSheet,
  humanArray,
} from "./main.js";
import {
  Human,
  CANVAS_WIDTH,
  resetGameframe,
  inventorySimulation,
  cashSimualtion,
  setCashSimulation,
} from "./animation_files/animateHuman.js";

// Declaring supporting variables
const resultArray = [];
let boughtCount = 0;
let didNotBuyCount = 0;

// Function to simulate day
function simulationResult(weather, temperature, price) {
  // Clear boughtCount and didNotBuyCount variable
  boughtCount = 0;
  didNotBuyCount = 0;

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
      } else {
        // Customer does not buy a cup
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
  console.log("prev", humanArray);
}

async function simulationAnimation(price) {
  console.log("start", humanArray);

  for (let i = 0; i <= resultArray.length - 1; i++) {
    delay;
    await delay(500);

    // Declare variable for new human instance
    let human;
    const option = Math.floor(Math.random() * 2); // Returns 0 or 1

    // Customer buys a cup
    if (resultArray[i] === "Yes") {
      // Animate
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

      // Customer does not buy a cup
    } else {
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

  setTimeout(() => {
    // Clear arrays
    humanArray.splice(0, humanArray.length);
    resetGameframe();
    resultArray.splice(0, resultArray.length);
  }, 15000);

  // Pop up "Close shop button"
  $("#close-shop-btn").css("display", "block");
}

export { simulationResult, simulationAnimation, resultArray };
