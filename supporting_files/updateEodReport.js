import { inventory } from "../main.js";

// Function that updates end of day report after simulation
function eodReportUpdate(boughtCount, numOfCustomers, cash) {
  // sales report
  $("#cups-sold").text(boughtCount);
  $("#num-of-customers").text(numOfCustomers);

  // inventory report
  $("#paper-cup-count").text(inventory.paperCups);
  $("#lemon-count").text(inventory.lemon);
  $("#sugar-count").text(inventory.sugar);
  $("#ice-cubes-count").text(inventory.iceCubes);

  // cash report
  $(".cash").text(cash);
}

export { eodReportUpdate };
