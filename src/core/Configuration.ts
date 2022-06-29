import { ConfigurationHandler } from "./Configuration.types";

export class Configuration {
  readonly handler: ConfigurationHandler;

  /**
   * The constructor function takes a ConfigurationHandler object as a parameter and assigns it to the
   * handler property of the class.
   * @param {ConfigurationHandler} handler - The handler that will be used to handle the configuration.
   */
  constructor(handler: ConfigurationHandler) {
    this.handler = handler;
  }
}