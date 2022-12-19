import { inventory } from "../main.js";

// Function that updates end of day report after simulation
function eodReportUpdate(boughtCount, numOfCustomers) {
  // sales report
  $("#cups-sold").text(boughtCount);
  $("#num-of-customers").text(numOfCustomers);
}

export { eodReportUpdate };
