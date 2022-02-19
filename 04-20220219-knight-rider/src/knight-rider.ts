export class KnightRider<T> {

  private _isRunning: boolean = false;

  constructor(
    private readonly _array: ReadonlyArray<T>,
    private readonly _callback: Function = (currentItem: T) => {}
  ) {}

  public isRunning(): boolean {
    return this._isRunning;
  }

  public start(): void {
    if(this._isRunning) return;
    this._isRunning = true;
    this.go();
  }

  public stop(): void {
    if(!this._isRunning) return;
    this._isRunning = false;
  }

  private go(): void {
    Promise.resolve(this.worker());
  }

  private worker = () => {
    const firstIndex = 0;
    const lastIndex = this._array.length;
    return new Promise((resolve) => {
      while(this._isRunning) {
        for(let index = firstIndex; index < lastIndex; index++) {
          this._isRunning && this._callback(this._array[index]);
          index === lastIndex && (index = firstIndex);
        }
      }
      resolve(true);
    });
  }
}
