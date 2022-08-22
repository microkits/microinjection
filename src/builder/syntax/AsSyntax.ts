import { Registration } from "../../core";
import { AbstractProvider, ClassProvider, FactoryProvider, ValueProvider } from "../../providers";
import { ClassProviderOptions } from "../../providers/ClassProvider/ClassProvider.types";
import { Factory } from "../../providers/FactoryProvider/FactoryProvider.types";
import { ConcreteClass } from "../../types";
import { InSyntax } from "./InSyntax";

export class AsSyntax<T> {
  private readonly registration: Registration<T>;

  constructor(registration: Registration<T>) {
    this.registration = registration;
  }

  /**
   * This function sets the provider property of the registration object to the provider argument.
   * @param provider - AbstractProvider<T>
   * @returns RegistrationBuilder<T>
   */
  public asProvider(provider: AbstractProvider<T>): InSyntax<T> {
    this.registration.provider = provider;
    return new InSyntax(this.registration);
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
  public asClass(constructor: ConcreteClass<T>, options?: ClassProviderOptions): InSyntax<T> {
    const provider = new ClassProvider<T>(constructor, options);
    return this.asProvider(provider);
  }

  /**
   * This function takes a value and returns a RegistrationBuilder that uses a ValueProvider to provide
   * that value.
   * @param {T} value - T - The value to be provided.
   * @returns RegistrationBuilder<T>
   */
  public asValue(value: T): InSyntax<T> {
    const provider = new ValueProvider(value);
    return this.asProvider(provider);
  }

  /**
   * This function takes a factory function and returns a new provider that uses that factory function to
   * create the instance.
   * @param factory - Factory<T>
   * @returns A RegistrationBuilder<T>
   */
  public asFactory(factory: Factory<T>): InSyntax<T> {
    const provider = new FactoryProvider(factory);
    return this.asProvider(provider);
  }
}