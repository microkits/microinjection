export type ConcreteClass<T = unknown> = (
  new (...args: unknown[]) => T
);

export type AnyClass<T = unknown> = (
  abstract new (...args: unknown[]) => T
);

export enum Scope {
  TRANSIENT, SINGLETON, CONTEXT
}

