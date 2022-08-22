import { AnyClass } from "../types";

export type RegistrationId<T = unknown> = string | symbol | AnyClass<T>;