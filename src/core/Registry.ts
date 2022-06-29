
import { Registration } from "./Registration";
import { RegistrationId } from "./Registration.types";

export class Registry {
  private readonly data: Map<RegistrationId, Registration>;

  constructor() {
    this.data = new Map();
  }

  /**
   * Return true if the given id exists.
   * @param {RegistrationId} id - RegistrationId - The id of the registration to check for.
   * @returns A boolean value.
   */
  has(id: RegistrationId): boolean {
    return this.data.has(id);
  }

  /**
   * It returns the value associated with the given key
   * @param {RegistrationId} id - RegistrationId - The id of the registration you want to get.
   * @returns Registration<T>
   */
  get<T>(id: RegistrationId): Registration<T> {
    return this.data.get(id) as Registration<T>;
  }

  /**
   * It takes a Registration<T> and saves it
   * @param registration - Registration<T>
   */
  save<T>(registration: Registration<T>): void {
    this.data.set(registration.id, registration);
  }

  /**
   * Delete the registration with the given id, and return true if it was found and deleted, or false if
   * it was not found.
   * @param {RegistrationId} id - The id of the registration to delete.
   * @returns A boolean value indicating whether the registration was deleted.
   */
  delete(id: RegistrationId): boolean {
    return this.data.delete(id);
  }

  /**
   * It clears the registry
   */
  clear(): void {
    this.data.clear()
  }
}