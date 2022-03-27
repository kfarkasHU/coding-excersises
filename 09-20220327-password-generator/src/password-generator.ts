import { CONFIG } from "./password-generator.config";

export function generate(
  length: number = 8,
  includeUppercase: boolean = true,
  includeNumbers: boolean = true,
  includeSpecials: boolean = true
): string {
  const result = [];
  const characters = CONFIG.characters;
  const uppercases = includeUppercase
    ? CONFIG.characters.map(m => m.toUpperCase())
    : []
  ;
  const numbers = includeNumbers
    ? CONFIG.numbers
    : []
  ;
  const specials = includeSpecials
    ? CONFIG.specials
    : []
  ;
  const alphabet = [
    ...characters,
    ...uppercases,
    ...numbers,
    ...specials
  ];
  const alphabetLength = alphabet.length;
  const indices = getRandomNumbers(length, 0, alphabetLength);
  for(const index of indices) {
    result.push(alphabet[index]);
  }
  return result.join("");
}

function getRandomNumbers(count: number, min: number, max: number): number[] {
  const result: number[] = [];
  for(let i = 0; i < count; i++) {
    result.push(getRandomNumber(min, max));
  }
  return result;
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}