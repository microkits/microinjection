import { ValueOrRegistrationIdRequiredError } from "../../errors/ValueOrRegistrationIdRequiredError";
import { ClassProvider } from "./ClassProvider";

describe("ClassProvider", () => {
  it("should throw an error if neither a value nor a registration is provided", () => {
    class A { }

    const provider = new ClassProvider(A, {
      dependencies: [{}]
    });

    expect(() => {
      provider.resolve(null);
    }).toThrowError(ValueOrRegistrationIdRequiredError);
  });
});