
import { NotRegisteredError } from "../errors/NotRegisteredError";
import { Scope } from "../types";
import { Container } from "./Container";
import { RegistrationId } from "./Registration.types";

export class ResolutionContext {
  private readonly cache: Map<RegistrationId, unknown>;
  private readonly container: Container;
  private readonly parent?: ResolutionContext;

  constructor(container: Container, parent?: ResolutionContext) {
    this.cache = new Map();
    this.container = container;
    this.parent = parent;
  }

  /**
   * It returns the parent of the current resolution context
   * @returns The parent of the current context.
   */
  getParent(): ResolutionContext {
    return this.parent;
  }

  /**
   * If the current context has a saved instance for the given id, return it. Otherwise, ask the
   * parent context to return a saved instance.
   * @param {RegistrationId} id - The id of the registration.
   * @returns The saved instance of the registration id.
   */
  private getSavedInstance(id: RegistrationId) {
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }

    return this.getParent()?.getSavedInstance(id);
  }

  /**
   * It saves an value in the cache
   * @param {RegistrationId} id - The registration id of the instance.
   * @param {unknown} instance - The value that we want to register.
   */

  private saveInstance(id: RegistrationId, instance: unknown) {
    this.cache.set(id, instance);
  }

  /**
   * Create a new resolution context that inherits from the current one.
   * @returns A new ResolutionContext object.
   */
  createChildContext(): ResolutionContext {
    return new ResolutionContext(this.container, this);
  }

  /**
   * If the registration is ready, then resolve it based on scope
   * @param {RegistrationId} id - The registration id of the service you want to resolve.
   * @param {boolean} [required] - If true, the resolve method will throw an error if the registration is
   * not found. If false, it will return undefined.
   * @returns The resolved instance of the registration.
   */
  resolve<T>(id: RegistrationId, required?: boolean): T {
    const registration = this.container.get<T>(id);

    if (registration?.isReady()) {
      if (registration.scope == Scope.CONTEXT) {
        const instance = this.getSavedInstance(id);

        if (instance != null) {
          return instance;
        }

        const resolved = registration.resolve(this);
        this.saveInstance(id, resolved);
        return resolved;
      }

      return registration.resolve(this);
    }

    if (required !== false) {
      throw new NotRegisteredError(id);
    }
  }
}