
import { Microinjection } from "../Microinjection";
import { Scope } from "../types";
import { MetadataRegistry } from "./metadata/MetadataRegistry";

export function ContextScoped() {
  return function (target: any) {
    const container = Microinjection.getDefaultContainer();

    MetadataRegistry.setScope(target, Scope.CONTEXT);
    MetadataRegistry.register(target, container);
  }
}
