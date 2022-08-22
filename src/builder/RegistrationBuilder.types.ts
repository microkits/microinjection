import { Registration } from "../core";

export interface OnRegistrationReady<T> {
  (registration: Registration<T>): void;
}