import { COLORS_CONFIG } from "./8-bit-colors.config";

const HEX_CONFIG = Object.freeze({
  base: 16,
  pad: {
    length: 2,
    fill: (0).toString()
  }
})

export class ColorsGenerator {

  public static getColors(): string[] {
    const { red, green, blue } = COLORS_CONFIG.bits;
    const shapes = {
      red: this.getNumbers(0, Math.pow(COLORS_CONFIG.bitSize, red)),
      green: this.getNumbers(0, Math.pow(COLORS_CONFIG.bitSize, green)),
      blue: this.getNumbers(0, Math.pow(COLORS_CONFIG.bitSize, blue))
    }
    const colors = this.createColorsFromShapes(shapes);
    return colors.map(m => `#${m}`);
  }

  private static getNumbers(from: number, to: number): number[] {
    const result = [];
    for(let i = from; i < to; i++) result.push(i);
    return result;
  }

  private static createColorsFromShapes({ red, green, blue }): string[] {
    const result = [];
    // Generate from blue->green->red, so the results will be in the opposite way.
    for(const bShape of blue) {
      for(const gShape of green) {
        for(const rShape of red) {
          result.push(
            this.toHexString(rShape) +
            this.toHexString(gShape) +
            this.toHexString(bShape)
          );
        }
      }
    }
    return result;
  }

  private static toHexString(shape: number): string {
    return shape.toString(HEX_CONFIG.base).padStart(HEX_CONFIG.pad.length, HEX_CONFIG.pad.fill);
  }

}
