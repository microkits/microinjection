# Microinjection

![Image of Microinjection](./docs/assets/logo.png)

Connecting everything is a tedious part of app development. <b>Microinjection</b> aims to make development easier and faster by helping you write testable, loosely coupled, and maintainable applications.

Microinjection is written entirely in <b>TypeScript</b>, but supports <b>JavaScript</b> as well.

[![npm version](https://badge.fury.io/js/%40microkits%2Fmicroinjection.svg)](https://badge.fury.io/js/%40microkits%2Fmicroinjection)

## Features

- Property Injection
- Constructor Injection
- Multiple DI containers
- Registering and resolving dependencies hierarchically
- Singleton, Transient, and Context scopes
- Circular dependencies
- Out-of-the-box support for injecting values, factories and classes.

## Installation

Microinjection is available as a package on NPM.

To install and save in your package.json dependencies, run the following command:

Install with **npm**:
```sh
npm install @microkits/microinjection
```

Install with **yarn**:
```sh
yarn add @microkits/microinjection
```

## Basic usage

Containers are the main components of Microinjection. The first step to start using Microinjection is to [getting a container](core-concepts/containers.md#getting-a-container).

```typescript
import { Microinjection } from "@microkits/microinjection";

const container = Microinjection.getDefaultContainer();
```

With an instance of the `Container` in hand, you can add your [Registrations](core-concepts/registrations.md).

```typescript
class Cat {
  speak() {
    console.log("meooow!")
  }
}

class CatOwner {
  cat: Cat;
}

container.register("Cat").asClass(Cat);
container.register("CatOwner").asClass(CatOwner, {
  properties: [{
    name: "cat",
    inject: "Cat"
  }]
});
```

Now, you can request that the `Container` resolve a `Registration` for you. It will also resolve all necessary dependencies.

```typescript
// Container will inject an instance of Cat on resolved CatOwner.
const owner = container.resolve<CatOwner>("CatOwner");

owner.cat.speak();
// logs "meooow!" to the console
```