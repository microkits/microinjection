import { Microinjection } from "../Microinjection";
import { Constructor, Scope } from "../types";
import { MetadataRegistry } from "./metadata/MetadataRegistry";

export function TransientScoped<T>(): ClassDecorator {
  return function (target: NewableFunction) {
    const container = Microinjection.getDefaultContainer();

    MetadataRegistry.setScope(target as unknown as Constructor<T>, Scope.TRANSIENT);
    MetadataRegistry.register(target as unknown as Constructor<T>, container);
  }
}
