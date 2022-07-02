import { Microinjection } from "../Microinjection";
import { Constructor, Scope } from "../types";
import { MetadataRegistry } from "./metadata/MetadataRegistry";

export function ContextScoped<T>(): ClassDecorator {
  return function (target) {
    const container = Microinjection.getDefaultContainer();

    MetadataRegistry.setScope(target as unknown as Constructor<T>, Scope.CONTEXT);
    MetadataRegistry.register(target as unknown as Constructor<T>, container);
  }
}
