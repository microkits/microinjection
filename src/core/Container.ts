import { ConcreteClass, Scope } from "../types";
import { Registry } from "./Registry";
import { Registration } from "./Registration";
import { RegistrationId } from "./Registration.types";
import { ResolutionContext } from "./ResolutionContext";
import { AlreadyRegisteredError } from "../errors/AlreadyRegisteredError";
import { NotRegisteredError } from "../errors/NotRegisteredError";
import { AbstractModule } from "./AbstractModule";
import { RegistrationBuilder } from "../builder/RegistrationBuilder";
import { AsSyntax } from "../builder/syntax/AsSyntax";
import { ClassProviderOptions } from "../providers/ClassProvider/ClassProvider.types";

export class Container {
  readonly parent?: Container;
  readonly registry: Registry;

  constructor(parent?: Container) {
    this.registry = new Registry();
    this.parent = parent;
  }

  /**
   * The clear() function delete all registrations.
   */
  clear(): void {
    this.registry.clear();
  }

  /**
   * Return true if the container has a registration with the given id.
   * @param {RegistrationId} id - The id of the registration to check for.
   * @returns A boolean value.
   */
  has(id: RegistrationId): boolean {
    return this.registry.has(id);
  }

  /**
   * If the registry has the id, return the registration, otherwise, return the parent's registration
   * @param {RegistrationId} id - The id of the registration.
   * @returns A Registration<T>
   */
  get<T>(id: RegistrationId<T>): Registration<T> {
    if (this.registry.has(id)) {
      return this.registry.get(id);
    }

    return this.parent?.get(id);
  }

  /**
   * "If the registry doesn't have the given id, throw an error. Otherwise, remove the id from the
   * registry."
   * 
   * The function checks if the given id exists, if it doesn't, it throws an NotRegisteredError.
   * @param {RegistrationId} id - The id of the registration to remove.
   */
  remove(id: RegistrationId): void {
    if (!this.registry.has(id)) {
      throw new NotRegisteredError(id);
    }

    this.registry.delete(id);
  }

  /**
   * "If the registry doesn't already have a registration with the given id, create a new registration
   * with the given id and scope, save it to the registry, and return a new RegistrationBuilder for the
   * new registration."
   * 
   * The first thing the function does is check to see if the registry already has a registration with
   * the given id. If it does, it throws an AlreadyRegisteredError. If it doesn't, it creates a new
   * registration with the given id and scope, saves it to the registry, and returns a new
   * RegistrationBuilder for the new registration
   * @param {RegistrationId} id - The id of the registration.
   * @param {Scope} [scope] - Scope
   * @returns A RegistrationBuilder<T>
   */
  register<T>(id: RegistrationId<T>, scope?: Scope): AsSyntax<T> {
    if (this.has(id)) {
      throw new AlreadyRegisteredError(id);
    }

    const builder = new RegistrationBuilder<T>(id, scope);

    return builder.start((registration) => {
      this.registry.save(registration);
    });
  }

  /**
   * It takes an array of modules, and for each module, it calls the configure function
   * @param modules - [AbstractModule, ...AbstractModule[]]
   */
  async addModule(...modules: [AbstractModule, ...AbstractModule[]]): Promise<Container> {
    const promises = modules.map(module =>
      Promise.resolve(module.configure(this))
    )

    await Promise.all(promises)

    return this
  }

  /**
   * "Resolve the given registration id in the current context."
   * 
   * The first thing we do is create a new resolution context. This is a new object that will be used to
   * track the resolution process
   * @param {RegistrationId} id - The registration id of the service you want to resolve.
   * @param {boolean} [required] - If true, the container will throw an error if the requested service is
   * not registered.
   * @returns The resolved value.
   */
  resolve<T>(id: RegistrationId<T>, required?: boolean): T {
    const context = this.createResolutionContext();
    return context.resolve(id, required);
  }

  /**
   * It creates a new instance of the given class, and returns it
   * @param target - The class to instantiate.
   * @param {ClassProviderOptions} [options] - {
   * @returns A new instance of the target class.
   */
  instantiate<T>(target: ConcreteClass<T>, options?: ClassProviderOptions) {
    const context = this.createResolutionContext();
    return context.instantiate(target, options);
  }

  /**
   * Create a new resolution context, and pass this container to it.
   * @returns A new ResolutionContext object.
   */
  createResolutionContext(): ResolutionContext {
    return new ResolutionContext(this);
  }

  /**
   * Create a new container that is a child of this container.
   * @returns A new instance of the Container class.
   */
  createChildContainer(): Container {
    return new Container(this);
  }
}