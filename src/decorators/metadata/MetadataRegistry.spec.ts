import { Scope } from "../../types";
import { MetadataRegistry } from "./MetadataRegistry"

describe("MetadataRegistry", () => {
  it("should set and get a class name correctly", () => {
    class A { }

    MetadataRegistry.setName(A, "class A");

    const name = MetadataRegistry.getName(A);
    expect(name).toBe("class A");
  });

  it("should set and get scope correctly", () => {
    class B { }

    MetadataRegistry.setScope(B, Scope.CONTEXT);

    const scope = MetadataRegistry.getScope(B);
    expect(scope).toBe(Scope.CONTEXT);
  });

  it("should add and get properties correctly", () => {
    class C { }

    MetadataRegistry.addProperty(C, {
      name: "test 1",
      inject: "B"
    });

    MetadataRegistry.addProperty(C, {
      name: "test 2",
      inject: "B"
    });

    const properties = MetadataRegistry.getProperties(C);
    expect(properties).toContainEqual({
      name: "test 1",
      inject: "B"
    });

    expect(properties).toContainEqual({
      name: "test 2",
      inject: "B"
    });
  });

  it("should add and get dependencies correctly", () => {
    class D { }

    MetadataRegistry.addDependency(D, {
      index: 0,
      inject: "C"
    });

    MetadataRegistry.addDependency(D, {
      index: 1,
      inject: "C"
    });

    const dependencies = MetadataRegistry.getDependencies(D);
    expect(dependencies).toContainEqual({
      index: 0,
      inject: "C"
    });

    expect(dependencies).toContainEqual({
      index: 1,
      inject: "C"
    });
  });

  it("should return undefined when name is not setted", () => {
    class E { }

    const name = MetadataRegistry.getName(E);
    expect(name).toBeUndefined();
  });

  it("should return undefined when scope is not setted", () => {
    class F { }

    const scope = MetadataRegistry.getScope(F);
    expect(scope).toBeUndefined();
  });

  it("should return a empty array when no properties is registered", () => {
    class G { }

    const properties = MetadataRegistry.getProperties(G);
    expect(properties).toBeInstanceOf(Array);
    expect(properties).toHaveLength(0)
  });

  it("should return undefined when no dependencies is registered", () => {
    class H { }

    const dependencies = MetadataRegistry.getDependencies(H);
    expect(dependencies).toBeInstanceOf(Array);
    expect(dependencies).toHaveLength(0);
  });

  it("should return true when successfully delete metadata", () => {
    class I { }

    MetadataRegistry.setName(I, "name");

    const deleted = MetadataRegistry.delete(I);
    expect(deleted).toBe(true);
  });

  it("should return true when trying to delete non-existent metadata", () => {
    class J { }

    const deleted = MetadataRegistry.delete(J);
    expect(deleted).toBe(false);
  });
});
