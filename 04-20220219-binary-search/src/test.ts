import { KnightRider } from "./knight-rider";

const result = [];
const array = [1, 2, 3, 4, 5];
const kr = new KnightRider(array, callbackFn);

kr.start();

function callbackFn(item: number): void {
  result.push(item);
  console.log(item);
  if(result.length === 10) {
    kr.stop();
    console.log(result);
  }
}
