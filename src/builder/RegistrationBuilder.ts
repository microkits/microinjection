import { Registration } from "../core";
import { RegistrationId } from "../core/Registration.types";
import { Scope } from "../types";
import { OnRegistrationReady } from "./RegistrationBuilder.types";
import { AsSyntax } from "./syntax/AsSyntax";

export class RegistrationBuilder<T> {
  private readonly registration: Registration<T>;

  constructor(id: RegistrationId<T>, scope?: Scope) {
    this.registration = new Registration(id, scope);
  }

  start(onReady: OnRegistrationReady<T>): AsSyntax<T> {
    const registration = new Proxy(this.registration, {
      set: (target, ...args) => {
        const success = Reflect.set(target, ...args);

        if (target.isReady())
          onReady(this.registration);

        return success;
      }
    });

    return new AsSyntax<T>(registration);
  }
}
