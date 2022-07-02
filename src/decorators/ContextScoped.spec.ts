import { Microinjection } from "../Microinjection";
import { Scope } from "../types";
import { ContextScoped } from "./ContextScoped";
import { Injectable } from "./Injectable";

describe("@ResolutionScoped", () => {
  afterEach(() => {
    const container = Microinjection.getDefaultContainer();
    container.clear();
  });

  it("should allow set scope to context in any order", () => {
    const container = Microinjection.getDefaultContainer();

    @ContextScoped()
    @Injectable()
    class A { }

    @Injectable()
    @ContextScoped()
    class B { }

    const a = container.get<A>("A");
    const b = container.get<B>("B");
    expect(a.scope).toBe(Scope.CONTEXT);
    expect(b.scope).toBe(Scope.CONTEXT);
  });
})