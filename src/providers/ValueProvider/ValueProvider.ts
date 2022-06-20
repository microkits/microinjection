import { AbstractProvider } from "../AbstractProvider";

export class ValueProvider<T> extends AbstractProvider<T> {
  private readonly _value: T;

  constructor(value: T) {
    super();
    this._value = value;
  }

  resolve(): T {
    return this._value
  }
}