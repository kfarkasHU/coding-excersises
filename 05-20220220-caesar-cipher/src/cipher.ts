import { CIPHER_CONFIG } from "./cipher.config";
import { ShiftMode } from "./cipher.model";

type Amplifier = -1 | 1;

export class CaesarCipher {

  constructor(
    private readonly _shift: number = 3
  ) { }

  public encrypt(message: string): string {
    return this.getShiftedText(message, ShiftMode.ENCRYPT);
  }

  public decrypt(message: string): string {
    return this.getShiftedText(message, ShiftMode.DECRTYPT);
  }

  private getShiftedText(message: string, shiftMode: ShiftMode): string {
    const amplifier = this.getAmplifierValueByShiftMode(shiftMode);
    const shiftedArray = this.getShiftedArray(message.split(''), amplifier);
    return shiftedArray.join('');
  }

  private getAmplifierValueByShiftMode(mode: ShiftMode): Amplifier {
    return mode === ShiftMode.ENCRYPT
      ? +1
      : -1
    ;
  }

  private getShiftedArray(message: string[], amplifier: Amplifier): string[] {
    const result: string[] = [];
    for(const char of message) {
      result.push(this.getShiftedCharacter(char, amplifier));
    }
    return result;
  }

  private getShiftedCharacter(character: string, amplifier: Amplifier): string {
    const offset = this._shift * amplifier;
    const index = CIPHER_CONFIG.alphabet.indexOf(character.toUpperCase());
    const alphabetLength = CIPHER_CONFIG.alphabet.length;
    const newIndex = this.getReplacementIndex(index, offset, alphabetLength);
    return CIPHER_CONFIG.alphabet[newIndex];
  }

  private getReplacementIndex(currentIndex: number, offsetToUse: number, arrayLength: number): number {
    const newIndex = currentIndex + offsetToUse;
    if(this.isInRange([0, arrayLength - 1], newIndex)) return newIndex;
    if(newIndex < 0) return arrayLength - 1 + newIndex;
    if(newIndex > arrayLength - 1) return newIndex - arrayLength + 1;
  }

  private isInRange(range: number[], value: number): boolean {
    return range[0] <= value && range[1] >= value;
  }

}
