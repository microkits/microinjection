import { RegistrationId } from "src/core/Registration.types";

export class ValueOrRegistrationIdRequiredError extends Error {
  constructor(name: string) {
    super(`${name}: You must provide a value or a registration id`);
  }
}