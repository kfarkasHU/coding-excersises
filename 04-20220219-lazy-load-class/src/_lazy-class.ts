export interface LazyClass {
  className: string;
  classLoader: () => Promise<any>;
}
