import { Container } from "./Container";

export interface ConfigurationHandler {
  (container: Container): void
}
