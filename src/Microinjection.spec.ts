import { Container } from "./core";
import { Microinjection } from "./Microinjection";

describe("Container", () => {
  it("should get the default container", () => {
    const container = Microinjection.getDefaultContainer();
    expect(container).toBeInstanceOf(Container);
  });

  it("should create a child container", () => {
    const defaultContainer = Microinjection.getDefaultContainer();
    const container = Microinjection.createContainer();

    expect(container.parent).toBe(defaultContainer);
  });

  it("should create two different containers", () => {
    const defaultContainer = Microinjection.getDefaultContainer();
    const container1 = Microinjection.createContainer();
    const container2 = Microinjection.createContainer();

    expect(container1.parent).toBe(defaultContainer);
    expect(container2.parent).toBe(defaultContainer);
    expect(container1).not.toBe(container2);
  })
});