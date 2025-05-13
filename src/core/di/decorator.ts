import { DIContainer } from "./container";
import type { Constructor } from "./types";

export function Injectable() {
  return (target: Constructor) => {
    DIContainer.instance.register(target);
  };
}
