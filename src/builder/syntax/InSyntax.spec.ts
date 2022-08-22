import { Registration } from "../../core"
import { Scope } from "../../types";
import { InSyntax } from "./InSyntax";

describe("InSyntax", () => {
  it("should set a scope for a registration", () => {
    const registration = new Registration("");

    new InSyntax(registration).inScope(Scope.CONTEXT);

    expect(registration.scope).toBe(Scope.CONTEXT);
  });

  it("should set a singleton scope for a registration", () => {
    const registration = new Registration("");

    new InSyntax(registration).inSingletonScope();

    expect(registration.scope).toBe(Scope.SINGLETON);
  });

  it("should set a transient scope for a registration", () => {
    const registration = new Registration("");

    new InSyntax(registration).inTransientScope();

    expect(registration.scope).toBe(Scope.TRANSIENT);
  });

  it("should set a context scope for a registration", () => {
    const registration = new Registration("");

    new InSyntax(registration).inContextScope();

    expect(registration.scope).toBe(Scope.CONTEXT);
  });
});