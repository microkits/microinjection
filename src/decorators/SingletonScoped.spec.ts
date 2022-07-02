import { Microinjection } from "../Microinjection";
import { Scope } from "../types";
import { Injectable } from "./Injectable";
import { SingletonScoped } from "./SingletonScoped";

describe("@SingletonScoped", () => {
  afterEach(() => {
    const container = Microinjection.getDefaultContainer();
    container.clear();
  });

  it("should allow set scope to singleton in any order", () => {
    const container = Microinjection.getDefaultContainer();

    @SingletonScoped()
    @Injectable()
    class A { }

    @Injectable()
    @SingletonScoped()
    class B { }

    const a = container.get<A>("A");
    const b = container.get<B>("B");
    expect(a.scope).toBe(Scope.SINGLETON);
    expect(b.scope).toBe(Scope.SINGLETON);
  });
})