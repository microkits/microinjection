import { RegistrationId } from "src/core/Registration.types";

export class NotRegisteredError extends Error {
  constructor(id: RegistrationId) {
    super(`${id.toString()} is not registered.`);
  }
}