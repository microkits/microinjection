import { RegistrationBuilder } from "./RegistrationBuilder";

describe("RegistrationBuilder", () => {
  it("should never call onReady", () => {
    const onReady = jest.fn();
    const builder = new RegistrationBuilder("test");

    builder.start(onReady);

    expect(onReady).not.toBeCalled();
  });

  it("should call onReady when a registration become ready", () => {
    const onReady = jest.fn();
    const builder = new RegistrationBuilder("test");

    builder.start(onReady).asValue(123);

    expect(onReady).toBeCalled();
  });
});