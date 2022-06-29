import { Container } from "./core/Container";

export class Microinjection {
  private static container: Container;

  /**
   * Return the default container. If the container is null, create a new container and return it.
   * @returns The default container.
   */
  static getDefaultContainer(): Container {
    if (this.container == null) {
      this.container = new Container();
    }

    return this.container;
  }

  /**
   * "Create a new container, and if a parent container is provided, make it the parent of the new
   * container."
   * 
   * The first thing we do is check if a parent container was provided. If not, we get the default
   * container
   * @param {Container} [parent] - The parent container to use. If not specified, the default container
   * will be used.
   * @returns A new instance of the Container class.
   */
  static createContainer(parent?: Container): Container {
    if (parent == null) {
      parent = this.getDefaultContainer();
    }

    return new Container(parent);
  }
}
