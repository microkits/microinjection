import { ResolutionContext } from "../../core/ResolutionContext";
import { AbstractProvider } from "../AbstractProvider";
import { Factory } from "./FactoryProvider.types";

export class FactoryProvider<T> extends AbstractProvider<T> {
  private readonly _factory: Factory<T>;

  constructor(factory: Factory<T>) {
    super();
    this._factory = factory;
  }

  /**
   * "The resolve function returns the result of calling the factory function with the context."
   * 
   * The factory function is the function that was passed to the constructor. The context is the object
   * that was passed to the resolve function
   * @param {ResolutionContext} context - The context of the current resolution.
   * @returns A function that takes a context and returns a value.
   */
  resolve(context: ResolutionContext): T {
    return this._factory(context)
  }
}