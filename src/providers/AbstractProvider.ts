import { ResolutionContext } from "../core/ResolutionContext";

export abstract class AbstractProvider<T = unknown> {
  abstract resolve(context: ResolutionContext): T;
}