
import { Microinjection } from "../Microinjection";
import { Scope } from "../types";
import { Injectable } from "./Injectable";
import { TransientScoped } from "./TransientScoped";

describe("@TransientScoped", () => {
  afterEach(() => {
    const container = Microinjection.getDefaultContainer();
    container.clear();
  });

  it("should allow set scope to singleton in any order", () => {
    const container = Microinjection.getDefaultContainer();

    @TransientScoped()
    @Injectable()
    class A { }

    @Injectable()
    @TransientScoped()
    class B { }

    const a = container.get<A>("A");
    const b = container.get<B>("B");
    expect(a.scope).toBe(Scope.TRANSIENT);
    expect(b.scope).toBe(Scope.TRANSIENT);
  });
})