import { RenderFn } from "./render-fn";

export abstract class AbstractRendererClass implements RenderFn {
  protected abstract readonly content: string;

  public render(target: string) {
    const element = document.getElementById(target);
    element && (element.innerHTML = this.content);
  }
}
