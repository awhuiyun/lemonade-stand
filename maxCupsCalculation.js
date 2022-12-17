import { recipe } from "./variables.js";

// Function that calculates that maximum number of cups that can be sold based on inventory
function maxCupsCalculation(paperCups, lemon, sugar, iceCubes) {
  // Number of cups that each ingredient can fill
  const paperCupsNum = Math.floor(paperCups / recipe.paperCups);
  const lemonNum = Math.floor(lemon / recipe.lemon);
  const sugarNum = Math.floor(sugar / recipe.sugar);
  const iceCubesNum = Math.floor(iceCubes / recipe.iceCubes);

  const maxNumOfCups = Math.min(paperCupsNum, lemonNum, sugarNum, iceCubesNum);
  return maxNumOfCups;
}

export { maxCupsCalculation };
