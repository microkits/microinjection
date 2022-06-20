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

  clearCache(): void {
    delete this.instance;
  }

  resolve(context?: ResolutionContext): T {
    if (this.scope == Scope.SINGLETON) {
      if (this.instance == null) {
        this.instance = this.provider.resolve(context);
      }

      return this.instance;
    }

    return this.provider.resolve(context);
  }

  isReady(): boolean {
    return this.provider != null;
  }
}
