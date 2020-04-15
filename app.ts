import ModuleWebgl from "./ModuleWebgl";

export class App {
  // id: number;
  // name: string;
  // testmodule: testModule;
  private _module: ModuleWebgl;

  constructor() {
    this.build();
  }

  private build() {
    window.addEventListener("load", this.awake);
    this._module = new ModuleWebgl();
    this._module.build();
  }

  private awake = () => {
    this._module.awake();
  };
}

let app: App = new App();
