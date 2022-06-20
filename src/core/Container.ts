
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
  private readonly parent?: Container;
  private readonly registry: Registry;

  constructor(parent?: Container) {
    this.registry = new Registry();
    this.parent = parent;
  }

  clear(): void {
    this.registry.clear();
  }

  has(id: RegistrationId): boolean {
    return this.registry.has(id);
  }

  get<T>(id: RegistrationId): Registration<T> {
    if (this.registry.has(id)) {
      return this.registry.get(id);
    }

    return this.parent?.get(id);
  }

  remove(id: RegistrationId): void {
    if (!this.registry.has(id)) {
      throw new NotRegisteredError(id);
    }

    this.registry.delete(id);
  }

  register<T>(id: RegistrationId, scope?: Scope): RegistrationBuilder<T> {
    if (this.has(id)) {
      throw new AlreadyRegisteredError(id);
    }

    const registration = new Registration<T>(id, scope);
    this.registry.save(registration);
    return new RegistrationBuilder<T>(registration);
  }

  load(...configurations: [Configuration, ...Configuration[]]): void {
    configurations.forEach(configuration => {
      configuration.handler(this);
    });
  }

  resolve<T>(id: RegistrationId, required?: boolean): T {
    const context = this.createResolutionContext();
    return context.resolve(id, required);
  }

  createResolutionContext(): ResolutionContext {
    return new ResolutionContext(this);
  }

  
  createChildContainer(): Container {
    return new Container(this);
  }
}