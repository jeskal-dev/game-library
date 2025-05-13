import { DIContainer } from "./container";
import type { Constructor } from "./types";

export function inject<T>(token: Constructor<T>) {
  return DIContainer.instance.resolve(token);
}
