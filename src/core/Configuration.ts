import { ConfigurationHandler } from "./Configuration.types";

export class Configuration {
  readonly handler: ConfigurationHandler;

  constructor(handler: ConfigurationHandler) {
    this.handler = handler;
  }
}