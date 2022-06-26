import { Container } from "./core/Container";

export class Microinjection {
  private static container: Container;

  static getDefaultContainer(): Container {
    if (this.container == null) {
      this.container = new Container();
    }

    return this.container;
  }

  static createContainer(parent?: Container): Container {
    if (parent == null) {
      parent = this.getDefaultContainer();
    }

    return new Container(parent);
  }
}
