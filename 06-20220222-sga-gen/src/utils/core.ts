import { SGAGEN_CONF } from "../sga-gen.config";
import { Random } from "./random";

const GENDER_MATRIX = Object.freeze({
  MAN: [1, 3, 5, 7, 9],
  WOMAN: [2, 4, 6, 8]
})

export class SGACore {

  public getYear(): number {
    return this.getForcedOdd(
      SGAGEN_CONF.Birthdate.Year.MinimumValue,
      SGAGEN_CONF.Birthdate.Year.MaximumValue,
      SGAGEN_CONF.Birthdate.Year.ForceOddValues
    );
  }

  public getMonth(): string {
    const month = this.getForcedOdd(
      1,
      12,
      SGAGEN_CONF.Birthdate.Month.ForceOddValues
    );
    return this.padWithZero(month);
  }

  public getDay(year: number, month: number): string {
    const date = new Date(year, month);
    const maxDays = date.getDate();
    const day = Random.randomNumberBetween(1, maxDays);
    return this.padWithZero(day);
  }

  public getCounty(): number {
    const index = this.getRandomIndex(SGAGEN_CONF.County.Matrix);
    console.log("matrix", SGAGEN_CONF.County.Matrix);
    console.log("index", index);
    return SGAGEN_CONF.County.Matrix[index];
  }

  public getGender(): number {
    const isMan = Random.randomBoolean();
    const [array, index] = isMan
      ? [ GENDER_MATRIX.MAN,    this.getRandomIndex(GENDER_MATRIX.MAN)    ]
      : [ GENDER_MATRIX.WOMAN,  this.getRandomIndex(GENDER_MATRIX.WOMAN)  ]
    ;
    return array[index];
  }

  public getChecksum(year: number, month: number, day: number, county: number, gender: number): number {
    const reay = year.toString().split('').reverse().map(Number);
    const src = [
      reay[0], reay[1], // YY
      month,            // MM
      day,              // DD
      county,           // XX
      gender            // X
    ];

    const seed: number[] = [];
    const length = src.length;
    for(let i = 0; i < length; i++) {
      const chunk = src[i] * SGAGEN_CONF.Checksum.Matrix[i];
      seed.push(this.getChunkValue(chunk));
    }
    return seed.reduce((a, c) => a + c);
  }

  private padWithZero(value: number): string {
    return value.toString().padStart(2, "0");
  }

  private getForcedOdd(min: number, max: number, isForcedOdd: boolean): number {
    let number: number;
    do {
      number = Random.randomNumberBetween(min, max);
    }
    while(isForcedOdd && number % 2 != 1);
    return number;
  }

  private getRandomIndex(array: unknown[]): number {
    return Random.randomNumberBetween(0, array.length - 1);
  }

  private getChunkValue(chunk: number): number {
    if(chunk > 9) {
      return (chunk % SGAGEN_CONF.Checksum.Modulo) + 1
    }
    return chunk;
  }

}
