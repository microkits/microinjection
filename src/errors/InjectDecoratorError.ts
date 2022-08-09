export class InjectDecoratorError extends Error {
  constructor() {
    super(`@Inject can only be applied to the parameters of a class constructor or a class property.`);
  }
}