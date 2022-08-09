import { Constructor } from "src/types";
import { InjectDecoratorError } from "../errors/InjectDecoratorError";
import { MetadataRegistry } from "./metadata/MetadataRegistry";

export function Inject(inject: string);
export function Inject(inject: string): ParameterDecorator | PropertyDecorator {
  return function (target, property, index): void {
    if (index == null) {
      MetadataRegistry.addProperty(target.constructor as Constructor, {
        name: property, inject
      });

      return;
    }

    if (property == null) {
      MetadataRegistry.addDependency(target as Constructor, {
        index, inject
      });

      return
    }

    throw new InjectDecoratorError();
  }
}
