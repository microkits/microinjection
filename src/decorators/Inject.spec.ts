import { Inject } from "./Inject";
import { MetadataRegistry } from "./metadata/MetadataRegistry";

describe("@Inject", () => {
  it("should add a property to MetadataRegistry", () => {
    class A {
      @Inject("B")
      readonly b;
    }

    const properties = MetadataRegistry.getProperties(A);

    expect(properties).toContainEqual({
      name: "b",
      inject: "B"
    });
  });

  it("should add a dependency to MetadataRegistry", () => {
    class B {
      constructor(@Inject("C") public c) { }
    }

    const dependencies = MetadataRegistry.getDependencies(B);
    expect(dependencies).toContainEqual({
      index: 0,
      inject: "C"
    });
  });

  it("should fail when decorate a method parameter", () => {
    expect(() => {
      class C {
        public d(@Inject("D") d) { }
      }
    }).toThrow();
  });

  it("should fail when decorate a method", () => {
    expect(() => {
      class C {
        @Inject("D")
        public d() { }
      }
    }).toThrow();
  });

});