import { RegistrationId } from "../../core/Registration.types";

export type ClassDependency = RegistrationId | {
  inject: RegistrationId;
  required?: boolean;
  value?: unknown;
}

export interface ClassProperty {
  name: string | symbol;
  inject: RegistrationId;
  required?: boolean;
  value?: unknown;
}

export interface ClassProviderOptions {
  properties?: ClassProperty[];
  dependencies?: ClassDependency[];
}