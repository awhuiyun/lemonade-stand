import { inventory, cash } from "../main.js";

// Function that updates end of day report after simulation
function eodReportUpdate(boughtCount, numOfCustomers) {
  // sales report
  $("#cups-sold").text(boughtCount);
  $("#num-of-customers").text(numOfCustomers);

  // Update inventory and cash balance

  console.log(
    "EOD function",
    inventory.paperCups,
    inventory.lemon,
    inventory.sugar,
    inventory.iceCubes
  );
  $(".paper-cups-qty").text(inventory.paperCups);
  $(".lemon-qty").text(inventory.lemon);
  $(".sugar-qty").text(inventory.sugar);
  $(".ice-cubes-qty").text(inventory.iceCubes);
  $(".cash").text(cash.toFixed(2));
}

export { eodReportUpdate };
