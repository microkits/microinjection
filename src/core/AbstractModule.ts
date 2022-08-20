import { Container } from "./Container";

export abstract class AbstractModule {
  abstract configure(container: Container): void;
}
