export class Random {
  public static randomNumberBetween(min: number, max: number): number {
    return this.randomNumberBetweenInternal(min, max);
  }

  public static randomBoolean(): boolean {
    return this.randomNumberBetweenInternal(0, 1) === 1;
  }

  private static randomNumberBetweenInternal(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
