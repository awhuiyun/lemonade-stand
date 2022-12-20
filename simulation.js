import { probabilityOfPurchase } from "./supporting_files/probability.js";
import { randomNumOfCustomers } from "./supporting_files/randomisation.js";
import { eodReportUpdate } from "./supporting_files/updateEodReport.js";
import { maxCupsCalculation } from "./supporting_files/maxCupsCalculation.js";
import { delay } from "./supporting_files/delay.js";
import { inventory, cash, setCash, recipe } from "./main.js";
import {
  Human,
  humanArray,
  CANVAS_WIDTH,
} from "./animation_files/animateHuman.js";

// Result Array
const resultArray = [];

// Function to simulate day
function simulationResult(weather, temperature, price) {
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
    // Customer is able to purchase a cup (sufficient inventory)
    if (boughtCount < maxCupsThatCanBeSold) {
      const randomNum = Math.random();
      // Customer buys a cup
      if (randomNum <= probability) {
        boughtCount++;
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
  console.log(resultArray);
  eodReportUpdate(boughtCount, numOfCustomers);
}

async function simulationAnimation(price) {
  for (let i = 0; i <= resultArray.length - 1; i++) {
    // delay
    await delay(500);

    // Customer buys a cup
    if (resultArray[i] === "Yes") {
      // Update inventory and cash balance
      inventory.paperCups = inventory.paperCups - recipe.paperCups;
      inventory.lemon = inventory.lemon - recipe.lemon;
      inventory.sugar = inventory.sugar - recipe.sugar;
      inventory.iceCubes = inventory.iceCubes - recipe.iceCubes;
      setCash(cash + price);

      // Update DOM
      $(".paper-cups-qty").text(inventory.paperCups);
      $(".lemon-qty").text(inventory.lemon);
      $(".sugar-qty").text(inventory.sugar);
      $(".ice-cubes-qty").text(inventory.iceCubes);
      $(".cash").text(cash);

      // Animate
      const humanLtr = new Human(
        "LTR",
        "../images/humanLeftToRight.png",
        0,
        0,
        2,
        4
      );
      humanArray.push(humanLtr);
      console.log("Yes");
    } else {
      const humanRtl = new Human(
        "RTL",
        "../images/humanRightToLeft.png",
        4,
        CANVAS_WIDTH * 0.95,
        2,
        4
      );
      humanArray.push(humanRtl);
      console.log("No");
      // Customer does not buy a cup
    }
  }
  // Pop up "Close shop button"
  $("#close-shop-btn").css("display", "block");

  // Clear arrays
  humanArray.length = 0;
  resultArray.length = 0;
}

// async function clearResultArray() {
//   await simulationAnimation();
//   return (resultArray.length = 0);
// }

export { simulationResult, simulationAnimation };
