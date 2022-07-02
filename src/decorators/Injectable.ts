
import { Microinjection } from "../Microinjection";
import { MetadataRegistry } from "./metadata/MetadataRegistry";

export function Injectable(name?: string): ClassDecorator {
  return function (target: any) {
    if (name == null) {
      name = target.name;
    }

    const container = Microinjection.getDefaultContainer();

    MetadataRegistry.setName(target, name);
    MetadataRegistry.register(target, container);
  }
}