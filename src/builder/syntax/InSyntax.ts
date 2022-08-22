import { Registration } from "../../core";
import { Scope } from "../../types";

export class InSyntax<T> {
  private readonly registration: Registration<T>;

  constructor(registration: Registration<T>) {
    this.registration = registration;
  }

  /**
   * This function sets the scope of the registration to the given scope.
   * @param {Scope} scope - Scope - The scope of the registration.
   * @returns This instance of RegistrationBuilder<T> .
   */
  public inScope(scope: Scope): void {
    this.registration.scope = scope;
  }
  /**
   * This function sets the scope of the registration to the Scope.SINGLETON
   * @returns This instance of RegistrationBuilder<T> .
   */
  public inSingletonScope(): void {
    return this.inScope(Scope.SINGLETON);
  }

  /**
   * This function sets the scope of the registration to the Scope.TRANSIENT
   * @returns This instance of RegistrationBuilder<T> .
   */
  public inTransientScope(): void {
    return this.inScope(Scope.TRANSIENT);
  }

  /**
   * This function returns a new RegistrationBuilder with the scope set to Scope.CONTEXT.
   * @returns A RegistrationBuilder<T>
   */
  public inContextScope(): void {
    return this.inScope(Scope.CONTEXT)
  }
}