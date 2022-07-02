import { Microinjection } from "../Microinjection";
import { Scope } from "../types";
import { MetadataRegistry } from "./metadata/MetadataRegistry";

export function TransientScoped() {
  return function (target: any) {
    const container = Microinjection.getDefaultContainer();
    
    MetadataRegistry.setScope(target, Scope.TRANSIENT);
    MetadataRegistry.register(target, container);
  }
}
