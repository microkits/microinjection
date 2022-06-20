import { Container } from "./Container";
import { ResolutionContext } from "./ResolutionContext";

describe("ResolutionContext", () => {
  it("should create a resolution context", () => {
    const container = new Container();
    const context = container.createResolutionContext();

    expect(context).toBeInstanceOf(ResolutionContext);
  });

  it("should create a child resolution context", () => {
    const container = new Container();
    const context = container.createResolutionContext();

    const child = context.createChildContext();

    expect(child).toBeInstanceOf(ResolutionContext);
    expect(child.getParent()).toBe(context);
  });

  it("should save instance to context cache", () => {
    const container = new Container();

    class User { }

    container.register("user").asClass(User).inContextScope();
    const context = container.createResolutionContext();

    const resolved0 = container.resolve("user");
    const resolved1 = context.resolve("user");
    const resolved2 = context.resolve("user");

    expect(resolved1).not.toBe(resolved0);
    expect(resolved2).not.toBe(resolved0);
    expect(resolved1).toBe(resolved2);
  });

  it("should get instance from parent context cache", () => {
    const container = new Container();

    class User { }

    container.register("user").asClass(User).inContextScope();
    const parentContext = container.createResolutionContext();
    const childContext = parentContext.createChildContext();

    const resolved0 = container.resolve("user");
    const resolved1 = parentContext.resolve("user");
    const resolved2 = childContext.resolve("user");
 
    expect(resolved1).not.toBe(resolved0);
    expect(resolved2).not.toBe(resolved0);
    expect(resolved1).toBe(resolved2);
  });
})