import { Registration } from "../../core"
import { AbstractProvider, ClassProvider, FactoryProvider, ValueProvider } from "../../providers";
import { AsSyntax } from "./AsSyntax";

describe("AsSyntax", () => {
  it("should set a ClassProvider for a registration", () => {
    const registration = new Registration("");

    new AsSyntax(registration)
      .asClass((class Test { }));

    expect(registration.provider).toBeInstanceOf(ClassProvider);
  });

  it("should set a ValueProvider for a registration", () => {
    const registration = new Registration("");

    new AsSyntax(registration)
      .asValue(123);

    expect(registration.provider).toBeInstanceOf(ValueProvider);
  });

  it("should set a FactoryProvider for a registration", () => {
    const registration = new Registration("");

    new AsSyntax(registration)
      .asFactory(() => 123)

    expect(registration.provider).toBeInstanceOf(FactoryProvider);
  });

  it("should set a AbstractProvider for a registration", () => {
    const registration = new Registration("");

    class Provider extends AbstractProvider {
      resolve() {
        return 123;
      }
    }

    new AsSyntax(registration)
      .asProvider(new Provider());

      expect(registration.provider).toBeInstanceOf(AbstractProvider);
      expect(registration.provider).toBeInstanceOf(Provider);
  });
});