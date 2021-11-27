import { calculatePossiblePositions } from "./chess-knight";
import { nThFibonacciNumber } from "./nth-fibonacci";

function runFibonacciTests(): void {
  _runFibonacci(1, 0);
  _runFibonacci(2, 1);
  _runFibonacci(3, 1);
  _runFibonacci(4, 2);
  _runFibonacci(5, 3);
  _runFibonacci(6, 5);
  _runFibonacci(7, 8);
  _runFibonacci(8, 13);
  _runFibonacci(9, 21);
  _runFibonacci(10, 34);

  function _runFibonacci(index: number, expected: number): void {
    _log(index, expected, nThFibonacciNumber(index));
  }

  function _log(index: number, expected: number, result: number): void {
    console.log(`${index}th number should be ${expected} and it is ${result}`);
  }
}

type KnightPosition = {
  number: number;
  letter: string;
}
function runKnightTests(): void {
  _runKnight({ letter: "A", number: 8 }, [{ number: 6, letter: "B" }, { letter: "C", number: 7 }]);

  function _runKnight(from: KnightPosition, expectedArr: KnightPosition[]): void {
    const result = calculatePossiblePositions(from).map(m => m);
    _log(from, expectedArr, result);
  }

  function _log(from: KnightPosition, expectedArr: KnightPosition[], resultArr: KnightPosition[]): void {
    console.log(`From: ${from.letter}:${from.number} the knight can move to:`);
    __logArr(resultArr);
    console.log("And it should be:");
    __logArr(expectedArr);

    function __logArr(arr: KnightPosition[]): void {
      for(const item of arr) {
        console.log(` ${item.letter}:${item.number}`);
      }
    }
  }
}

export function runTests(): void {
  //runFibonacciTests();
  runKnightTests();
}



runTests();
