import { ClassDependency, ClassProperty } from "../../providers/ClassProvider/ClassProvider.types";
import { Scope } from "../../types";

export interface ClassPropertyMetadata extends ClassProperty { }

export interface ClassDependencyMetadata extends ClassDependency {
  index: number;
}

export interface Metadata {
  name?: string;
  scope?: Scope;
  properties?: ClassPropertyMetadata[];
  dependencies?: ClassDependencyMetadata[];
}