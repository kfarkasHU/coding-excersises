import { LazyClass } from "./_lazy-class";

export const ClassConfig = Object.freeze({
  classA: "ClassA",
  classB: "ClassB"
});

export const PageConfig = Object.freeze({
  loadAButton: document.getElementById("btn-load-a") as HTMLButtonElement,
  loadBButton: document.getElementById("btn-load-b") as HTMLButtonElement,
  renderAreaId: "render-area"
});

export const LazyConfig: ReadonlyArray<LazyClass> = [
  {
    classLoader: async () => { return await import("./class-a").then(m => m.ClassA); },
    className: ClassConfig.classA
  },
  {
    classLoader: async () => { return await import("./class-b").then(m => m.ClassB); },
    className: ClassConfig.classB
  }
];
