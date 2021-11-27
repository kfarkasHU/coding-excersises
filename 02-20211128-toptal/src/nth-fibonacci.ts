/**
 * F(0) = 0
 * F(1) = 1
 * F(n) = F(n-1) + F(n-2)
 */

const FIBONACCI = [0, 1];

export function nThFibonacciNumber(n: number): number {
  while(FIBONACCI.length < n) {
    const fn1Index = FIBONACCI.length - 2;
    const fn2Index = FIBONACCI.length - 1;
    FIBONACCI.push(FIBONACCI[fn1Index] + FIBONACCI[fn2Index]);
  }
  return FIBONACCI[n - 1];
}
