
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

  getParent(): ResolutionContext {
    return this.parent;
  }

  private getSavedInstance(id: RegistrationId) {
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }

    return this.getParent()?.getSavedInstance(id);
  }

  private saveInstance(id: RegistrationId, instance: unknown) {
    this.cache.set(id, instance);
  }

  createChildContext(): ResolutionContext {
    return new ResolutionContext(this.container, this);
  }

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