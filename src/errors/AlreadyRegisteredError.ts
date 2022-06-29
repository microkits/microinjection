import { RegistrationId } from "src/core/Registration.types";

/* `AlreadyRegisteredError` is an error that is thrown when a registration id is already registered */
export class AlreadyRegisteredError extends Error {
  constructor(id: RegistrationId) {
    super(`${id.toString()} is already registered.`);
  }
}