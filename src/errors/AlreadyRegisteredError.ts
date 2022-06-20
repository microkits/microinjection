import { RegistrationId } from "src/core/Registration.types";

export class AlreadyRegisteredError extends Error {
  constructor(id: RegistrationId) {
    super(`${id.toString()} is already registered.`);
  }
}