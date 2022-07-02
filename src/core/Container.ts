
import { Scope } from "../types";
import { Registry } from "./Registry";
import { Registration } from "./Registration";
import { Configuration } from "./Configuration";
import { RegistrationId } from "./Registration.types";
import { RegistrationBuilder } from "./RegistrationBuilder";
import { ResolutionContext } from "./ResolutionContext";
import { AlreadyRegisteredError } from "../errors/AlreadyRegisteredError";
import { NotRegisteredError } from "../errors/NotRegisteredError";

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
  get<T>(id: RegistrationId): Registration<T> {
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
  register<T>(id: RegistrationId, scope?: Scope): RegistrationBuilder<T> {
    if (this.has(id)) {
      throw new AlreadyRegisteredError(id);
    }

    const registration = new Registration<T>(id, scope);
    this.registry.save(registration);
    return new RegistrationBuilder<T>(registration);
  }

  /**
   * It takes an array of configurations, and for each configuration, it calls the handler function
   * @param configurations - [Configuration, ...Configuration[]]
   */
  load(...configurations: [Configuration, ...Configuration[]]): void {
    configurations.forEach(configuration => {
      configuration.handler(this);
    });
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
  resolve<T>(id: RegistrationId, required?: boolean): T {
    const context = this.createResolutionContext();
    return context.resolve(id, required);
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