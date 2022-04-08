const CONFIG = Object.freeze({
  size: {
    width: 10,
    height: 10
  },
  numberOfMines: 33,
  characters: {
    unknown: "U",
    markedAsMine: "X",
    mine: "Q",
    neighbour: {
      "0": 0,
      "1": 1,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8
    }
  }
});

const MATRIX = [];
let ELEMENT;

function init(elementId) {
  ELEMENT = document.getElementById(elementId);
  _createMatrix()
  _addMines()
  _render();
}

function onCellClick(x, y) {
  const field = MATRIX[__indexAt(x,y)];
  field.isDiscovered = true;
  field.isMine && alert("Mine found");
  _render();
}

function onCellRightClick(e, x, y) {
  e.preventDefault();
  const field = MATRIX[__indexAt(x,y)];
  if(field.isDiscovered) return;
  field.isMarkedAsMine = !field.isMarkedAsMine;
  _render();
}

function _render() {
  const table = document.createElement("table");
  table.style.borderSpacing = "0px";
  table.style.borderTop = "1px solid black";
  table.style.borderRight = "1px solid black";
  for(let j = 0; j < CONFIG.size.height; j++) {
    const row = document.createElement("tr");
    for(let i = 0; i < CONFIG.size.width; i++) {
      const cell = document.createElement("td");
      cell.style.borderBottom = "1px solid black";
      cell.style.borderLeft = "1px solid black";
      cell.style.padding = "10px";
      cell.style.cursor = "pointer";

      cell.onclick = () => { onCellClick(i, j); };
      cell.oncontextmenu = (e) => { onCellRightClick(e, i, j); };
      const text = __getChar(__indexAt(i, j));
      const node = document.createTextNode(text);
      cell.appendChild(node);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  ELEMENT.innerHTML = "";
  ELEMENT.appendChild(table);
}

function _addMines() {
  const mineIndices = __getNonRepeatingNumbers(CONFIG.numberOfMines, 0, CONFIG.size.width * CONFIG.size.height);
  for(let i = 0; i < mineIndices.length; i++) {
    MATRIX[mineIndices[i]].isMine = true;
  }
}

function _createMatrix() {
  for(let i = 0; i < CONFIG.size.width; i++) {
    for(let j = 0; j < CONFIG.size.height; j++) {
      MATRIX[__indexAt(i, j)] = {
        char: CONFIG.characters.unknown,
        isDiscovered: false,
        isMine: false,
        isMarkedAsMine: false
      };
    }
  }
}

function __getChar(index) {
  const item = MATRIX[index];
  if(item.isMarkedAsMine) return CONFIG.characters.markedAsMine;
  if(!item.isDiscovered) return CONFIG.characters.unknown;
  if(item.isMine) return CONFIG.characters.mine;
  const { x, y } = __coordsAt(index);

  let minesNumber = 0;

  const coordsToCheck = [
    [x, y - 1], // top
    [x, y + 1], // bottom
    [x + 1, y], // right
    [x - 1, y], // left
    [x + 1, y - 1], // top right
    [x - 1, y - 1], // top left
    [x + 1, y + 1], // bottom right
    [x - 1, y + 1], // bottom left
  ];

  for(const coord of coordsToCheck) {
    const index = __indexAt(coord[0], coord[1]);
    MATRIX[index] && MATRIX[index].isMine && minesNumber++;
  }

  return CONFIG.characters.neighbour[minesNumber]
}

function __getNonRepeatingNumbers(count, min, max) {
  const numbers = [];
  for(let i = 0; i < count; i++) {
    let num = __getRandomNumber(min, max);
    while(numbers.includes(num)) {
      num = __getRandomNumber(min, max);
    }
    numbers.push(num);
  }
  return numbers;
}

function __getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function __coordsAt(index) {
  const x = index % CONFIG.size.width;
  const y = index / CONFIG.size.width;
  return { x, y: Math.floor(y) };
}

function __indexAt(x, y) {
  return CONFIG.size.height * y + x;
}
