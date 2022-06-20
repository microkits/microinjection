import { Configuration } from "./Configuration";

describe("Container", () => {
  it("should create a Configuration with a handler", () => {
    const handler = jest.fn();
    const configuration = new Configuration(handler);
    configuration.handler(undefined);
    expect(handler).toBeCalled();
  });
})