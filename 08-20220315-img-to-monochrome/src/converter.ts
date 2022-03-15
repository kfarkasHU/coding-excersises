const MONOCHROME_CONFIG = Object.freeze({
  // http://poynton.ca/notes/colour_and_gamma/ColorFAQ.html#RTFToC9
  amplifiers: {
    red: 0.2126,
    green: 0.7152,
    blue: 0.0722
  }
});

interface RGBColor {
  red: number;
  green: number;
  blue: number;
}

function convertImage(
  fromCanvasId: string,
  toCanvasId: string,
  asciiCanvas: string
) {
  const from = <HTMLCanvasElement>document.getElementById(fromCanvasId);
  const to = <HTMLCanvasElement>document.getElementById(toCanvasId);
  const ascii = <HTMLCanvasElement>document.getElementById(asciiCanvas);

  const fromHeight = from.height;
  const fromWidth = from.width;

  to.height = fromHeight;
  to.width = fromWidth;

  const asciiCharSize = 5;
  ascii.height = fromHeight * asciiCharSize;
  ascii.width = fromWidth *asciiCharSize;
  const asciiCtx = ascii.getContext("2d");
  asciiCtx.font = `${asciiCharSize}px Arial`;
  asciiCtx.fillStyle = "black";
  asciiCtx.fillRect(0, 0, ascii.width, ascii.height);
  asciiCtx.fillStyle = "white";

  const toCtx = to.getContext("2d");
  const fromCtx = from.getContext("2d");
  for(let i = 0; i < fromHeight; i++) {
    for(let j = 0; j < fromWidth; j++) {
      const pixel = fromCtx.getImageData(j, i, 1, 1).data; // RGBA
      const pixelColor: RGBColor = {
        red: pixel[0],
        green: pixel[1],
        blue: pixel[2]
      }

      if(pixelColor.red == 0 && pixelColor.green == 0 && pixelColor.blue == 0) {
        pixelColor.red = pixelColor.green = pixelColor.blue = 255; // Invert black and white
      }

      const grayscale = convertRgbToMonchrome(pixelColor);
      toCtx.fillStyle = `rgba(${grayscale}, ${grayscale}, ${grayscale}, 1)`;
      toCtx.fillRect(j, i, 1, 1);
      const char = grayscaleToAscii(grayscale);
      asciiCtx.fillText(char, j * asciiCharSize, i * asciiCharSize);
    }
  }
}

function convertRgbToMonchrome(color: RGBColor): number {
  const y = 
    color.red * MONOCHROME_CONFIG.amplifiers.red +
    color.green * MONOCHROME_CONFIG.amplifiers.green +
    color.blue * MONOCHROME_CONFIG.amplifiers.blue
  ;
  return y
}

function grayscaleToAscii(y: number): string {
  /** 
  const result = [];
  const chars = " .,-~:;=!*#$@".split("").reverse();
  let lastI = 0;
  for(let i = 20, j = 0; i < 260; i += 20, j++) {
    result.push({ from: lastI, to: i, char: chars[j] });
    lastI = i;
  }
   */
  const matrix = [
    {from: 0, to: 20, char: '@'},
    {from: 20, to: 40, char: '$'},
    {from: 40, to: 60, char: '#'},
    {from: 60, to: 80, char: '*'},
    {from: 80, to: 100, char: '!'},
    {from: 100, to: 120, char: '='},
    {from: 120, to: 140, char: ';'},
    {from: 140, to: 160, char: ':'},
    {from: 160, to: 180, char: '~'},
    {from: 180, to: 200, char: '-'},
    {from: 200, to: 220, char: ','},
    {from: 220, to: 240, char: '.'},
    {from: 240, to: 260, char: ' '}
    // Inverted:
    // {from: 0, to: 20, char: ' '},
    // {from: 20, to: 40, char: '.'},
    // {from: 40, to: 60, char: ','},
    // {from: 60, to: 80, char: '-'},
    // {from: 80, to: 100, char: '~'},
    // {from: 100, to: 120, char: ':'},
    // {from: 120, to: 140, char: ';'},
    // {from: 140, to: 160, char: '='},
    // {from: 160, to: 180, char: '!'},
    // {from: 180, to: 200, char: '*'},
    // {from: 200, to: 220, char: '#'},
    // {from: 220, to: 240, char: '$'},
    // {from: 240, to: 260, char: '@'}
  ];
  const from = matrix.find(m => m.from === y);
  if(from) return from.char;

  const within = matrix.find(m => m.from < y && y < m.to);
  return within.char;
}
