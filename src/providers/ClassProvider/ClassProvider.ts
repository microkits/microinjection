import { ResolutionContext } from "../../core/ResolutionContext";
import { ConcreteClass } from "../../types";
import { AbstractProvider } from "../AbstractProvider";
import { ClassDependency, ClassProperty, ClassProviderOptions } from "./ClassProvider.types";

export class ClassProvider<T> extends AbstractProvider<T> {
  private target: ConcreteClass<T>;
  private properties?: ClassProperty[];
  private dependencies?: ClassDependency[];

  constructor(target: ConcreteClass<T>, options?: ClassProviderOptions) {
    super();
    this.target = target;
    this.properties = options?.properties;
    this.dependencies = options?.dependencies;
  }

  /**
   * It creates an instance of the target class, injects the dependencies into the constructor, and
   * then injects the properties
   * @param {ResolutionContext} context - The context of the resolution.
   * @returns An instance of the target class with all of the dependencies and properties resolved.
   */
  resolve(context: ResolutionContext): T {
    const params = [];

    this.dependencies?.forEach((dependency) => {
      if (typeof dependency !== "object") {
        dependency = {
          inject: dependency
        }
      }

      if (dependency.value == null) {
        dependency.value = context.resolve(
          dependency.inject,
          dependency.required
        );
      }
      params.push(dependency.value);
    });

    const instance = Reflect.construct(this.target, params);

    this.properties?.forEach((property) => {
      let cachedValue = property.value;

      Object.defineProperty(instance, property.name, {
        enumerable: true,
        configurable: true,
        get: () => {
          if (cachedValue == null) {
            cachedValue = context.resolve(
              property.inject,
              property.required
            )
          }

          return cachedValue
        }
      });
    });

    return instance;
  }
}
