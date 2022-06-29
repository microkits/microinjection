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

  /**
   * This function sets the provider property of the registration object to the provider argument.
   * @param provider - AbstractProvider<T>
   * @returns RegistrationBuilder<T>
   */
  public asProvider(provider: AbstractProvider<T>): RegistrationBuilder<T> {
    this.registration.provider = provider;
    return this;
  }

  /**
   * "Register a ClassProvider."
   * 
   * The first parameter is the class to register. The second parameter is an optional object that can be
   * used to configure the provider
   * @param constructor - The constructor function of the class to be instantiated.
   * @param {ClassProviderOptions} [options] - ClassProviderOptions
   * @returns A RegistrationBuilder<T>
   */
  public asClass(constructor: Constructor<T>, options?: ClassProviderOptions): RegistrationBuilder<T> {
    const provider = new ClassProvider(constructor, options);
    return this.asProvider(provider);
  }

  /**
   * This function takes a value and returns a RegistrationBuilder that uses a ValueProvider to provide
   * that value.
   * @param {T} value - T - The value to be provided.
   * @returns RegistrationBuilder<T>
   */
  public asValue(value: T): RegistrationBuilder<T> {
    const provider = new ValueProvider(value);
    return this.asProvider(provider);
  }

  /**
   * This function takes a factory function and returns a new provider that uses that factory function to
   * create the instance.
   * @param factory - Factory<T>
   * @returns A RegistrationBuilder<T>
   */
  public asFactory(factory: Factory<T>): RegistrationBuilder<T> {
    const provider = new FactoryProvider(factory);
    return this.asProvider(provider);
  }

  /**
   * This function sets the scope of the registration to the given scope.
   * @param {Scope} scope - Scope - The scope of the registration.
   * @returns This instance of RegistrationBuilder<T> .
   */
  public inScope(scope: Scope): RegistrationBuilder<T> {
    this.registration.scope = scope;
    return this;
  }
  /**
   * This function sets the scope of the registration to the Scope.SINGLETON
   * @returns This instance of RegistrationBuilder<T> .
   */
  public inSingletonScope(): RegistrationBuilder<T> {
    return this.inScope(Scope.SINGLETON);
  }

  /**
   * This function sets the scope of the registration to the Scope.TRANSIENT
   * @returns This instance of RegistrationBuilder<T> .
   */
  public inTransientScope(): RegistrationBuilder<T> {
    return this.inScope(Scope.TRANSIENT);
  }

  /**
   * This function returns a new RegistrationBuilder with the scope set to Scope.CONTEXT.
   * @returns A RegistrationBuilder<T>
   */
  public inContextScope(): RegistrationBuilder<T> {
    return this.inScope(Scope.CONTEXT)
  }

  /**
   * Return the registration.
   * @returns The registration object.
   */
  public get(): Registration<T> {
    return this.registration;
  }
}
