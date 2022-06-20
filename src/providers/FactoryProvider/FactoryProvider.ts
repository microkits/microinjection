import { ResolutionContext } from "../../core/ResolutionContext";
import { AbstractProvider } from "../AbstractProvider";
import { Factory } from "./FactoryProvider.types";

export class FactoryProvider<T> extends AbstractProvider<T> {
  private readonly _factory: Factory<T>;

  constructor(factory: Factory<T>) {
    super();
    this._factory = factory;
  }

  resolve(context: ResolutionContext): T {
    return this._factory(context)
  }
}