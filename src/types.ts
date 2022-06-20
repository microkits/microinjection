export interface Constructor<T = unknown> {
  new(...args: unknown[]): T
}
export enum Scope {
  TRANSIENT, SINGLETON, CONTEXT
}

