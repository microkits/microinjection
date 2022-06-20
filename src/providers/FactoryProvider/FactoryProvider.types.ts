import { ResolutionContext } from "../../core/ResolutionContext";

export interface Factory<T> {
  (context: ResolutionContext): T;
}