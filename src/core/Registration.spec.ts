import { Scope } from "../types";
import { Registration } from "./Registration";

describe("Registration", () => {
  it("should create a Registration instance correctly", () => {
    const registration = new Registration("id", Scope.SINGLETON);

    expect(registration).toBeDefined();
    expect(registration.id).toBe("id");
    expect(registration.scope).toBe(Scope.SINGLETON);
  });

  it("should be ready when provider is defined", () => {
    const registration = new Registration("id", Scope.SINGLETON);

    expect(registration.isReady()).toBe(false);

    registration.provider = {
      resolve() {
        return ""
      }
    }

    expect(registration.isReady()).toBe(true);
  });

  it("should cache a instance when scope is SINGLETON", () => {
    const registration = new Registration("name", Scope.SINGLETON);

    registration.provider = {
      resolve() {
        return "anyvalue";
      }
    }

    const resolved = registration.resolve();
    expect(resolved).toBe("anyvalue");
    expect(registration.instance).toBe("anyvalue");
  });

  it("should clear a cached instance", () => {
    const registration = new Registration("name", Scope.SINGLETON);

    registration.provider = {
      resolve() {
        return "anyvalue";
      }
    }

    registration.resolve();
    expect(registration.instance).toBe("anyvalue");
    registration.clearCache();
    expect(registration.instance).toBeUndefined();
  });
});
