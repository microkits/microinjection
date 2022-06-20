
import { Registration } from "./Registration";
import { RegistrationId } from "./Registration.types";

export class Registry {
  private readonly data: Map<RegistrationId, Registration>;

  constructor() {
    this.data = new Map();
  }

  has(id: RegistrationId): boolean {
    return this.data.has(id);
  }

  get<T>(id: RegistrationId): Registration<T> {
    return this.data.get(id) as Registration<T>;
  }

  save<T>(registration: Registration<T>): void {
    this.data.set(registration.id, registration);
  }

  delete(id: RegistrationId): boolean {
    return this.data.delete(id);
  }

  clear(): void {
    this.data.clear()
  }
}