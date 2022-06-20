import { ResolutionContext } from "../core/ResolutionContext";

export abstract class AbstractProvider<T> {
  abstract resolve(context: ResolutionContext): T;
}