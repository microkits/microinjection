
import { Microinjection } from "../Microinjection";
import { Scope } from "../types";
import { MetadataRegistry } from "./metadata/MetadataRegistry";

export function SingletonScoped() {
  return function (target: any) {
    const container = Microinjection.getDefaultContainer();

    MetadataRegistry.setScope(target, Scope.SINGLETON);
    MetadataRegistry.register(target, container);
  }
}