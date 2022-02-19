import { RenderFn } from "./render-fn";
import { ClassConfig, PageConfig, LazyConfig } from "./_config";

function loadA() {
  loadInternal(ClassConfig.classA);
} 

function loadB() {
  loadInternal(ClassConfig.classB);
}

function loadInternal(className: string) {
  const config = LazyConfig.find(m => m.className === className);
  if(!config) throw `Not found. '${className}'`;
  resolve(config.classLoader);
}

async function resolve(resolver: () => Promise<any>) {
  const definition = await resolver();
  const instance: RenderFn = new definition();
  instance.render(PageConfig.renderAreaId);
}

function init() {
  initBtn(PageConfig.loadAButton, loadA);
  initBtn(PageConfig.loadBButton, loadB);
}

function initBtn(btn: HTMLButtonElement, callback: Function) {
  btn.onclick = () => {
    callback();
  };
}

init();
