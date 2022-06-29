import { AbstractProvider } from "../AbstractProvider";

export class ValueProvider<T> extends AbstractProvider<T> {
  private readonly _value: T;

  constructor(value: T) {
    super();
    this._value = value;
  }

  /**
   * It returns the value stored on provider
   * @returns The value stored.
   */
  resolve(): T {
    return this._value
  }
}