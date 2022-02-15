Write a function that takes two parameters; an optional array of numbers and an optional number in the given order.

Example:

```
fn([1,2,3], 5);
```

If both of the parameters are given, and the array is not empty, the function should return numbers from the array whose sum
is equal to the given number. If there is no exact match, then the function should return the numbers whose has the nearest sum value.
Tho calculate the sum, you should always use 3 numbers from the array.
While calculating, you cannot reuse a number from the array (reuse: same index).

The result should be a jagged array.

Example:

```
fn([0,1,2,3,4,5], 6);

result:
[
  [0, 1, 5],
  [0, 2, 4],
  [1, 2, 3]
]
```
