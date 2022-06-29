import { RegistrationId } from "src/core/Registration.types";

/* `NotRegisteredError` is an error that is thrown when a registration id is not registered */
export class NotRegisteredError extends Error {
  constructor(id: RegistrationId) {
    super(`${id.toString()} is not registered.`);
  }
}