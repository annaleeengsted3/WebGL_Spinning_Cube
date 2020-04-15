import { WebglEffect } from "./WebglEffect";

export default class Modulewebgl {
  private effect: WebglEffect;

  public build(): void {
    console.log("building in module");
    this.effect = new WebglEffect();
  }

  public awake(): void {}

  protected sleep(): void {}
}
