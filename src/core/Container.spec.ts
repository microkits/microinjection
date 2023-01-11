
import { AlreadyRegisteredError, NotRegisteredError } from "../errors";
import { Scope } from "../types";
import { Container } from "./Container";

describe("Container", () => {
  it("should create a container", () => {
    const container = new Container()

    expect(container).toBeDefined();
    expect(container).toBeInstanceOf(Container);
  });

  it("should register and resolve a boolean", () => {
    const container = new Container();

    container.register("true").asValue(true);
    container.register("false").asValue(false);

    expect(container.resolve("true")).toBe(true);
    expect(container.resolve("false")).toBe(false);
  });

  it("should register and resolve an empty string", () => {
    const container = new Container();
    const text = "";

    container.register("string").asValue(text);

    const resolved = container.resolve("string");

    expect(resolved).toBeDefined();
    expect(resolved).toBe(text);
  });

  it("should register and resolve the 0 number", () => {
    const container = new Container();
    const zero = 0;

    container.register("zero").asValue(zero);

    const resolved = container.resolve("zero");

    expect(resolved).toBeDefined();
    expect(resolved).toBe(zero);
  });

  it("should register and resolve an array", () => {
    const container = new Container();

    const array = [];

    container.register("array").asValue(array);

    const resolved = container.resolve("array");

    expect(resolved).toBeDefined();
    expect(resolved).toBe(array);
  });

  it("should throw when trying to resolve a not ready registration", () => {
    const container = new Container();

    container.register("NotReady");

    expect(() => {
      container.resolve("NotReady");
    }).toThrow(NotRegisteredError);
  })

  it("should register and resolve an object", () => {
    const container = new Container();

    class Test {
      constructor(public name: string) { }
    }

    const object = new Test("This is a test")

    container.register("object").asValue(object);

    const resolved = container.resolve<Test>("object")

    expect(resolved).toBeDefined();
    expect(resolved).toBe(object);
    expect(resolved.name).toBe(object.name);
  });

  it("should register and resolve a class", () => {
    const container = new Container();

    class Test { }

    container.register("test").asClass(Test);

    const resolved = container.resolve("test");

    expect(resolved).toBeDefined();
    expect(resolved).toBeInstanceOf(Test);
  });

  it("should instantiate a class", () => {
    class A { }
    class B {
      constructor(public a: A) { }
    }

    const container = new Container();

    container.register(A).asClass(A)

    const b = container.instantiate(B, {
      dependencies: [A]
    });

    expect(b).toBeDefined();
    expect(b.a).toBeInstanceOf(A);
  })

  test("should register and resolve anonymous classes", () => {
    const container = new Container();

    const ctor1 = (() => class { })();
    const ctor2 = (() => class { })();

    container.register("ctor1").asValue(new ctor1());
    container.register("ctor2").asValue(new ctor2());

    expect(container.resolve("ctor1") instanceof ctor1).toBeTruthy();
    expect(container.resolve("ctor2") instanceof ctor2).toBeTruthy();
  });

  it("should not override superclasses", () => {
    const container = new Container();

    class SuperClass {
      getSomething() {
        return "superclass method";
      }
    }

    class SubClass extends SuperClass {
      getOtherThing() {
        return "subclass method";
      }
    }

    container.register("SubClass").asClass(SubClass);

    const subclass = container.resolve<SubClass>("SubClass");
    expect(subclass).toBeInstanceOf(SuperClass);
    expect(subclass).toBeInstanceOf(SubClass);
    expect(subclass.getSomething).toBeDefined();
    expect(subclass.getOtherThing).toBeDefined();
    expect(subclass.getSomething()).toEqual("superclass method");
    expect(subclass.getOtherThing()).toEqual("subclass method");

    container.register("SuperClass").asClass(SuperClass);

    // cast SuperClass as SubClass, but SuperClass
    // cannot be a instance of SubClass
    const superclass = container.resolve<SubClass>("SuperClass");
    expect(superclass).toBeInstanceOf(SuperClass);
    expect(superclass).not.toBeInstanceOf(SubClass);
    expect(superclass.getSomething).toBeDefined();
    expect(superclass.getOtherThing).toBeUndefined();
    expect(superclass.getSomething()).toEqual("superclass method");
  });

  it("should register and resolve a factory", () => {
    const container = new Container();
    class Test { }

    container.register("test").asClass(Test);

    container.register("factory").asFactory((context) =>
      context.resolve("test")
    );

    const resolved = container.resolve("test");

    expect(resolved).toBeDefined();
    expect(resolved).toBeInstanceOf(Test);
  });

  it("should register and resolve a custom provider", () => {
    const container = new Container();

    container.register("custom").asProvider({
      resolve() {
        return 123
      }
    });

    const resolved = container.resolve("custom");

    expect(resolved).toBeDefined();
    expect(resolved).toBe(123);
  })

  it("should resolve to factory result each time resolve is called", () => {
    const mock = jest.fn();
    const container = new Container();

    const value1 = 1;
    const value2 = 2;

    container.register("factory").asFactory(mock);

    mock.mockReturnValue(value1);
    const result1 = container.resolve("factory");

    mock.mockReturnValue(value2);
    const result2 = container.resolve("factory");

    expect(result1).toBe(value1);
    expect(result2).toBe(value2);
  });

  it("should execute a transient factory each time resolve is called", () => {
    const mock = jest.fn();
    const container = new Container();

    container.register("factory").asFactory(mock);
    container.resolve("factory");
    container.resolve("factory");

    expect(mock).toBeCalledTimes(2);
  });

  it("should fail to resolve unregistered dependency", () => {
    const container = new Container();

    expect(() => {
      container.resolve("NotRegistered");
    }).toThrow(NotRegisteredError);
  });

  it("should fail when trying to remove an unregistered dependency", () => {
    const container = new Container();

    expect(() => {
      container.remove("NotRegistered");
    }).toThrow(NotRegisteredError);
  });

  it("should not fail to resolve non-required unregistered dependency", () => {
    const container = new Container();
    const resolved = container.resolve("NotRegistered", false);
    expect(resolved).toBeUndefined();
  });

  it("should fail to register a dependency with a name already used", () => {
    const container = new Container();

    container.register("A").asValue("");

    expect(() => {
      container.register("A");
    }).toThrow(AlreadyRegisteredError);
  });

  it("should resolve non-equal transient instances", () => {
    const container = new Container();
    class Test {
      constructor(public name: string) { }
    }

    container.register("test").asClass(Test);

    const resolved1 = container.resolve("test");
    const resolved2 = container.resolve("test");

    expect(resolved1).toBeDefined();
    expect(resolved2).toBeDefined();
    expect(resolved1).toBeInstanceOf(Test);
    expect(resolved2).toBeInstanceOf(Test);
    expect(resolved1).not.toBe(resolved2);
  });

  it("should register in singleton scope", () => {
    const container = new Container();
    class Test {
      constructor(public name: string) { }
    }

    container
      .register("test")
      .asClass(Test)
      .inSingletonScope();

    const registration = container.get("test");

    expect(registration).toBeDefined();
    expect(registration.scope).toBe(Scope.SINGLETON);
  });

  it("should resolve equal singleton instances", () => {
    const container = new Container();
    class Test {
      constructor(public name: string) { }
    }

    container.register("test").asClass(Test).inSingletonScope();

    const resolved1 = container.resolve("test");
    const resolved2 = container.resolve("test");

    expect(resolved1).toBeDefined();
    expect(resolved2).toBeDefined();
    expect(resolved1).toBeInstanceOf(Test);
    expect(resolved2).toBeInstanceOf(Test);
    expect(resolved1).toBe(resolved2);
  });

  it("should use the same instance during the same resolution chain when using context scope", () => {
    const container = new Container();

    class X { }
    class B {
      readonly x: X;
    }

    class C {
      readonly x: X;
    }

    class A {
      readonly b: B;
      readonly c: C;
    }

    container.register("X").asClass(X).inContextScope();

    container.register("A").asClass(A, {
      properties: [{
        name: "b",
        inject: "B"
      },
      {
        name: "c",
        inject: "C"
      }]
    });

    container.register("B").asClass(B, {
      properties: [{
        name: "x",
        inject: "X"
      }]
    });

    container.register("C").asClass(C, {
      properties: [{
        name: "x",
        inject: "X"
      }]
    });

    const a = container.resolve<A>("A");

    expect(a.b.x).toBe(a.c.x);
  });

  it("should not use the same instance when using a transient scoped property", () => {
    const container = new Container();

    class A { }
    class B {
      readonly a: A;
    }

    container.register("A").asClass(A).inTransientScope();

    container.register("B").asClass(B, {
      properties: [{
        name: "a",
        inject: "A"
      }]
    });

    const b1 = container.resolve<B>("B");
    const b2 = container.resolve<B>("B");

    expect(b1).toBeDefined();
    expect(b2).toBeDefined();
    expect(b1.a).not.toBe(b2.a);
  });

  it("should resolve circular singleton scoped dependencies", () => {
    const container = new Container();

    class A { }
    class B extends A {
      public c: A;
    }

    class C extends A {
      public b: A;
    }

    container.register("B").asClass(B, {
      properties: [{
        name: "c",
        inject: "C"
      }]
    }).inSingletonScope();

    container.register("C").asClass(C, {
      properties: [{
        name: "b",
        inject: "B"
      }]
    }).inSingletonScope();

    const b = container.resolve<B>("B");
    const c1 = container.resolve<C>("C");
    const c2 = container.resolve<C>("C");

    expect(b).toBeInstanceOf(B);
    expect(c1).toBeInstanceOf(C);
    expect(c2).toBeInstanceOf(C);
    expect(b.c).toBe(c1);
    expect(b.c).toBe(c2);
    expect(c1.b).toBe(b);
    expect(c2.b).toBe(b);
  });

  it("should resolve circular transient scoped dependencies", () => {
    const container = new Container();

    class A { }

    class B extends A {
      public c: A;
    }

    class C extends A {
      public b: A;
    }

    container.register("B").asClass(B, {
      properties: [{
        name: "c",
        inject: "C"
      }]
    }).inTransientScope();

    container.register("C").asClass(C, {
      properties: [{
        name: "b",
        inject: "B"
      }]
    }).inTransientScope();

    const b = container.resolve<B>("B");
    const c1 = container.resolve<C>("C");
    const c2 = container.resolve<C>("C");

    expect(b).toBeInstanceOf(B);
    expect(c1).toBeInstanceOf(C);
    expect(c2).toBeInstanceOf(C);
    expect(b.c).not.toBe(c1);
    expect(b.c).not.toBe(c2);
    expect(c1.b).not.toBe(b);
    expect(c2.b).not.toBe(b);
  });

  it("should resolve circular resolution scoped dependencies", () => {
    const container = new Container();

    class A { }

    class B extends A {
      public c: A;
    }

    class C extends A {
      public b: A;
    }

    container.register("B").asClass(B, {
      properties: [{
        name: "c",
        inject: "C"
      }]
    }).inContextScope();

    container.register("C").asClass(C, {
      properties: [{
        name: "b",
        inject: "B"
      }]
    }).inContextScope();

    const b = container.resolve<B>("B");
    const c1 = container.resolve<C>("C");
    const c2 = container.resolve<C>("C");

    expect(b).toBeInstanceOf(B);
    expect(c1).toBeInstanceOf(C);
    expect(c2).toBeInstanceOf(C);
    expect(b.c).not.toBe(c1);
    expect(b.c).not.toBe(c2);
    expect(c1.b).not.toBe(b);
    expect(c2.b).not.toBe(b);
  });

  test("should allows iterating over keys of the original object", () => {
    const container = new Container();

    class A { }

    class B {
      public name = "B";
      public prop = {
        defined: false
      };

      constructor(public a: A) { }
    }

    class C {
      public a: A

      public name = "C";
      public prop = {
        defined: false
      };

      constructor(public b: B) { }
    }
    container.register("A").asClass(A);
    container.register("B").asClass(B, {
      dependencies: [{
        inject: "A"
      }]
    });

    container.register("C").asClass(C, {
      dependencies: ["B"],
      properties: [{
        name: "a",
        inject: "A"
      }]
    });

    const b = container.resolve<B>("B");
    const c = container.resolve<C>("C");

    expect(b).toBeInstanceOf(B);
    expect(Object.keys(b)).toStrictEqual(["a", "name", "prop"]);
    expect(Object.getOwnPropertyNames(b)).toStrictEqual(["a", "name", "prop"]);

    expect(c).toBeInstanceOf(C);
    expect(Object.keys(c)).toStrictEqual(["b", "name", "prop", "a"]);
    expect(Object.getOwnPropertyNames(c)).toStrictEqual(["b", "name", "prop", "a"]);
  });

  it("should remove registered dependencies", () => {
    const container = new Container();

    class Test { }

    const value = new Test();

    container.register("value").asValue(value);
    container.register("Test").asClass(Test);

    expect(container.resolve("value")).toBeDefined();
    expect(container.resolve("Test")).toBeDefined();

    container.remove("Test");

    expect(container.resolve("value")).toBeDefined();
    expect(() => {
      container.resolve("Test")
    }).toThrow()
  });

  it("should clear all registrations", () => {
    const container = new Container();

    container.register("test1").asValue(1);
    container.register("test2").asValue(2);
    container.register("test3").asValue(3);

    expect(container.has("test1")).toBe(true);
    expect(container.has("test2")).toBe(true);
    expect(container.has("test3")).toBe(true);
    container.clear();
    expect(container.has("test1")).toBe(false);
    expect(container.has("test2")).toBe(false);
    expect(container.has("test3")).toBe(false);
  })

  it("should create a child container", () => {
    const container = new Container();
    const child = container.createChildContainer();

    expect(child).toBeInstanceOf(Container);
  });

  it("should add modules", () => {
    const container = new Container();

    // single argument
    container.addModule({
      configure(container) {
        container.register("test 1").asValue(1);
      }
    })

    // spread arguments
    container.addModule(
      {
        configure(container) {
          container.register("test 2").asValue(2);
        }
      },
      {
        configure(container) {
          container.register("test 3").asValue(3);
        }
      }
    )

    expect(container.resolve("test 1")).toBe(1);
    expect(container.resolve("test 2")).toBe(2);
    expect(container.resolve("test 3")).toBe(3);
  });

  it("should resolve dependencies registered on parent container", () => {
    const container = new Container();

    container.register("test").asValue(5);

    const child = container.createChildContainer();
    expect(child.resolve("test")).toBe(5);
  })
});
