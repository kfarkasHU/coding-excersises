const NUMBERS = [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 ];
const LETTERS = ["A","B","C","D","E","F","G","H"];

export type POSITION_NUMBERS = typeof NUMBERS[number];
export type POSITION_LETTERS = typeof LETTERS[number];

export interface Position {
  number: POSITION_NUMBERS;
  letter: POSITION_LETTERS;
}

const VERTICAL_STEP_SIZE = 3 - 1;
const HORIZONTAL_STEP_SIZE = 2 - 1;
export function calculatePossiblePositions(current: Readonly<Position>): ReadonlyArray<Position>{
  const possibleMoves: Position[] = [];

  const moveVerticalNumberIndices = [
    NUMBERS.indexOf(current.number + VERTICAL_STEP_SIZE),
    NUMBERS.indexOf(current.number - VERTICAL_STEP_SIZE)
  ];

  const moveHorizontalNumberIndices = [
    NUMBERS.indexOf(current.number + HORIZONTAL_STEP_SIZE),
    NUMBERS.indexOf(current.number - HORIZONTAL_STEP_SIZE)
  ];

  const currentLetterIndex = LETTERS.indexOf(current.letter);
  const moveVerticalLetterIndices = [
    currentLetterIndex + HORIZONTAL_STEP_SIZE,
    currentLetterIndex - HORIZONTAL_STEP_SIZE
  ]

  const moveHorizontalLetterIndices = [
    currentLetterIndex + VERTICAL_STEP_SIZE,
    currentLetterIndex - VERTICAL_STEP_SIZE
  ];

  for(const numberIndex of moveVerticalNumberIndices) {
    if(numberIndex === -1) continue;
    for(const letterIndex of moveVerticalLetterIndices) {
      if(!_isLetterExists(letterIndex)) continue;
      possibleMoves.push({ letter: LETTERS[letterIndex], number: NUMBERS[numberIndex] });
    }
  }

  for(const letterIndex of moveHorizontalLetterIndices) {
    if(!_isLetterExists(letterIndex)) continue;
    for(const numberIndex of moveHorizontalNumberIndices) {
      if(numberIndex === -1) continue;
      possibleMoves.push({ letter: LETTERS[letterIndex], number: NUMBERS[numberIndex] });
    }
  }

  return possibleMoves;

  function _isLetterExists(index: number): boolean {
    return !!LETTERS[index];
  }
}