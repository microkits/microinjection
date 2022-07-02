
import { Container } from "../../core";
import { Constructor, Scope } from "../../types";
import { ClassDependencyMetadata, Metadata, ClassPropertyMetadata } from "./MetadataRegistry.types";

export abstract class MetadataRegistry {
  private static metadata = new Map<unknown, Metadata>();

  /**
   * It takes a target and a name, and sets the scope property of the metadata object associated with
   * the target
   * @param target - The class that is being decorated.
   * @param {Scope} scope - Scope - The scope of the dependency.
   */
  static setScope<T>(target: Constructor<T>, scope: Scope): void {
    const metadata = this.metadata.get(target) ?? {} as Metadata;
    metadata.scope = scope;
    this.metadata.set(target, metadata);
  }

  /**
   * It takes a target and a name, and sets the name property of the metadata object associated with
   * the target
   * @param target - The class that is being decorated.
   * @param {string} name - The name of the property.
   */
  static setName<T>(target: Constructor<T>, name: string): void {
    const metadata = this.metadata.get(target) ?? {} as Metadata;
    metadata.name = name;
    this.metadata.set(target, metadata);
  }

  /**
   * It adds a property to the metadata.
   * @param target - The class that is being decorated.
   * @param {ClassPropertyMetadata} property - ClassPropertyMetadata
   */
  static addProperty<T>(target: Constructor<T>, property: ClassPropertyMetadata): void {
    const metadata = this.metadata.get(target) ?? {} as Metadata;

    if (metadata.properties == null) {
      metadata.properties = [];
    }

    metadata.properties.push(property);
    this.metadata.set(target, metadata);
  }

  /**
   * It adds a dependency to the metadata of a class
   * @param target - The class that is being decorated.
   * @param {ClassDependencyMetadata} dependency - ClassDependencyMetadata
   */
  static addDependency<T>(target: Constructor<T>, dependency: ClassDependencyMetadata): void {
    const metadata = this.metadata.get(target) ?? {} as Metadata;

    if (metadata.dependencies == null) {
      metadata.dependencies = [];
    }

    metadata.dependencies.push(dependency);
    metadata.dependencies.sort((a, b) => a.index - b.index);

    this.metadata.set(target, metadata);
  }

  /**
   * It returns the stored name of the class that is passed in as a parameter
   * @param target - The class that we want to get the name of.
   * @returns The name of the class.
   */
  static getName<T>(target: Constructor<T>): string {
    const metadata = this.metadata.get(target);
    return metadata?.name;
  }

  /**
   * Get the scope of the given class.
   * @param target - The class that we want to get the scope for.
   * @returns The scope of the target class.
   */
  static getScope<T>(target: Constructor<T>): Scope {
    const metadata = this.metadata.get(target);
    return metadata?.scope;
  }

  /**
   * It returns the dependencies of a given class
   * @param target - The class that we want to get the dependencies for.
   * @returns An array of ClassDependencyMetadata objects.
   */
  static getDependencies<T>(target: Constructor<T>): ClassDependencyMetadata[] {
    const metadata = this.metadata.get(target);
    return metadata?.dependencies ?? [];
  }

  /**
   * "Get the properties of the target class, and then get the properties of the parent class, and then
   * concatenate them together."
   * 
   * The `getProperties` function is recursive, which means it calls itself. It calls itself until it
   * reaches the `Object` class, which is the base class of all classes
   * @param target - Constructor<T>
   * @returns An array of ClassPropertyMetadata objects.
   */
  static getProperties<T>(target: Constructor<T>): ClassPropertyMetadata[] {

    if (target == Object.prototype) {
      return [];
    }

    const metadata = this.metadata.get(target);

    return this.getProperties(
      Object.getPrototypeOf(target)
    ).concat(metadata?.properties ?? []);
  }

  /**
   * It deletes the metadata for the given target
   * @param target - The class that you want to add metadata to.
   * @returns A boolean value indicating whether the metadata was successfully deleted.
   */
  static delete<T>(target: Constructor<T>): boolean {
    return this.metadata.delete(target);
  }

  /**
   * If the target has registered metadata, create a registration in the container
   * @param target - The class that is being registered.
   * @param {Container} container - The container that the class is being registered to.
   */
  static register<T>(target: Constructor<T>, container: Container): void {
    if (this.metadata.has(target)) {
      const metadata = this.metadata.get(target);

      if (metadata.name != null) {
        if (!container.has(metadata.name)) {
          const options = {
            dependencies: metadata.dependencies,
            properties: metadata.properties
          };

          container.register(metadata.name).asClass(target, options).get();
        }

        if (metadata.scope != null) {
          const registration = container.get(metadata.name);
          registration.scope = metadata.scope;
        }
      }
    }
  }
}
