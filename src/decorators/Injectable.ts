
import { Microinjection } from "../Microinjection";
import { Constructor } from "../types";
import { MetadataRegistry } from "./metadata/MetadataRegistry";

export function Injectable<T>(name?: string): ClassDecorator {
  return function (target) {
    if (name == null) {
      name = target.name;
    }

    const container = Microinjection.getDefaultContainer();

    MetadataRegistry.setName(target as unknown as Constructor<T>, name);
    MetadataRegistry.register(target as unknown as Constructor<T>, container);
  }
}