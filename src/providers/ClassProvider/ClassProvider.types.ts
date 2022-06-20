import { RegistrationId } from "../../core/Registration.types";

export interface ClassDependency {
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