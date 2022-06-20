import { ResolutionContext } from "../context/ResolutionContext";
import { Scope } from "../types";
import { Container } from "./Container";

export interface ContainerOptions {
  parent?: Container;
  defaultScope?: Scope;
  defaultStrict?: boolean;
}

export interface ContainerResolveOptions {
  context?: ResolutionContext,
  strict?: boolean;
}
