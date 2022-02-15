import { calc } from "./calc";

function test() {
  console.log(calc([1, 2, 3, 4, 5, 6],  7), "= [ [1, 2, 4] ]");
  console.log(calc([1, 2, 3, 4, 5, 6],  8), "= [ [1, 2, 5] [1, 3, 4] ]");
  console.log(calc([1, 2, 3, 4, 5, 6],  9), "= [ [1, 2, 6] [1, 3, 5] [2, 3, 4] ]");
  console.log(calc([1, 2, 3, 4, 5, 6], 10), "= [ [1, 3, 6] [1, 4, 5] [2, 3, 5] ]");
}

test();