type intDictionary = { [key: number]: number[][] };

export function calc(r: ReadonlyArray<number>, s: number): ReadonlyArray<number[]> | null {
  if(!r) return null;
  if(r.length === 0) return null;
  if(s === null || s === undefined) return null;

  const sumHash: intDictionary = {};

  for(let ai = 0; ai < r.length - 2; ai++) {
    for(let bi = ai + 1; bi < r.length - 1; bi++) {
      for(let ci = bi + 1; ci < r.length - 0; ci++) {
        const sum = r[ai] + r[bi] + r[ci];
        const distance = Math.abs(s - sum);
        sumHash[distance] = sumHash[distance] || [];
        sumHash[distance].push([r[ai], r[bi], r[ci]]);
      }
    }
  }

  const smallestDistance = Object
    .keys(sumHash)
    .map(m => +m)
    .sort()
    [0]
  ;

  return sumHash[smallestDistance];
}
