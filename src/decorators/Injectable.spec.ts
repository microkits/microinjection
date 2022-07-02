import { Injectable } from "./Injectable"
import { Inject } from "./Inject";
import { Microinjection } from "../Microinjection";

describe("@Injectable", () => {
  afterEach(() => {
    const container = Microinjection.getDefaultContainer();
    container.clear();
  });

  it("should register a class", () => {
    const container = Microinjection.getDefaultContainer();

    @Injectable()
    class A { }

    const a = container.resolve<A>("A");
    expect(a).toBeInstanceOf(A);
  });

  it("should register class dependencies", () => {
    const container = Microinjection.getDefaultContainer();

    @Injectable()
    class A { }

    @Injectable()
    class B {
      constructor(@Inject("A") public a: A) { }
    }

    const b = container.resolve<B>("B");
    expect(b.a).toBeInstanceOf(A);
  });

  it("should allow pass name parameter", () => {
    const container = Microinjection.getDefaultContainer();

    @Injectable("ClassA")
    class A { }

    const a = container.resolve<A>("ClassA");
    expect(a).toBeInstanceOf(A);
  });
});
