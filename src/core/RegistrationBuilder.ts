import { AbstractProvider } from "../providers/AbstractProvider";
import { FactoryProvider } from "../providers/FactoryProvider";
import { ClassProvider } from "../providers/ClassProvider/ClassProvider";
import { ValueProvider } from "../providers/ValueProvider";
import { Constructor, Scope } from "../types";
import { ClassProviderOptions } from "../providers/ClassProvider/ClassProvider.types";
import { Registration } from "./Registration";
import { Factory } from "../providers/FactoryProvider/FactoryProvider.types";

export class RegistrationBuilder<T> {
  private readonly registration: Registration<T>;

  constructor(registration: Registration<T>) {
    this.registration = registration;
  }

  public asProvider(provider: AbstractProvider<T>): RegistrationBuilder<T> {
    this.registration.provider = provider;
    return this;
  }

  public asClass(constructor: Constructor<T>, options?: ClassProviderOptions): RegistrationBuilder<T> {
    const provider = new ClassProvider(constructor, options);
    return this.asProvider(provider);
  }

  public asValue(value: T): RegistrationBuilder<T> {
    const provider = new ValueProvider(value);
    return this.asProvider(provider);
  }

  public asFactory(factory: Factory<T>): RegistrationBuilder<T> {
    const provider = new FactoryProvider(factory);
    return this.asProvider(provider);
  }

  public inScope(scope: Scope): RegistrationBuilder<T> {
    this.registration.scope = scope;
    return this;
  }

  public inSingletonScope(): RegistrationBuilder<T> {
    return this.inScope(Scope.SINGLETON);
  }

  public inTransientScope(): RegistrationBuilder<T> {
    return this.inScope(Scope.TRANSIENT);
  }

  public inContextScope(): RegistrationBuilder<T> {
    return this.inScope(Scope.CONTEXT)
  }

  public get(): Registration<T> {
    return this.registration;
  }
}
