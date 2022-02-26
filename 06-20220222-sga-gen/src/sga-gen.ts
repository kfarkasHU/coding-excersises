import { SGACore } from "./utils/core";

export class SGAGenerator {

  private static readonly utils = new SGACore();

  public static newShort(): string {
    return this.generate().slice(2);
  }

  public static newLong(): string {
    return this.generate();
  }

  private static generate(): string {
    const year = this.utils.getYear();
    const month = this.utils.getMonth();
    const day = this.utils.getDay(year, +month);
    const county = this.utils.getCounty();
    const gender = this.utils.getGender();
    const checksum = this.utils.getChecksum(year, +month, +day, county, gender);
    return `${year}${month}${day}-${county}${gender}${checksum}`;
  }

}
