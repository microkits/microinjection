import { AbstractProvider } from "../providers/AbstractProvider";
import { Scope } from "../types";
import { RegistrationId } from "./Registration.types";
import { ResolutionContext } from "./ResolutionContext";

export class Registration<T = unknown> {
  public readonly id: RegistrationId;
  public provider: AbstractProvider<T>;
  public scope: Scope;
  public instance: T;

  constructor(id: RegistrationId, scope?: Scope) {
    this.id = id;
    this.scope = scope;
  }

  /**
   * It deletes the instance cached on registration
   */
  clearCache(): void {
    delete this.instance;
  }

  /**
   * If the scope is singleton, then return the instance if it exists, otherwise ask a 
   * new instance from provider and return it
   * If the scope is not singleton, then ask a provider to return a new instance
   * @param {ResolutionContext} [context] - The resolution context.
   * @returns The instance of the class that is being resolved.
   */
  resolve(context?: ResolutionContext): T {
    if (this.scope == Scope.SINGLETON) {
      if (this.instance == null) {
        this.instance = this.provider.resolve(context);
      }

      return this.instance;
    }

    return this.provider.resolve(context);
  }

  /**
   * It checks if the registration is ready to be resolved.
   * @returns A boolean value.
   */
  isReady(): boolean {
    return this.provider != null;
  }
}
