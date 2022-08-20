import { AbstractModule } from "./AbstractModule";
import { Container } from "./Container";

describe("AbstractModule", () => {
  it("should create a Module", () => {
    const handler = jest.fn();

    class DependencyModule extends AbstractModule {
      configure(container: Container) {
        handler(container);
      }
    }

    const container = new Container();
    container.addModule(new DependencyModule());
    expect(handler).toBeCalled();
    expect(handler).toBeCalledWith(container);
  });
});