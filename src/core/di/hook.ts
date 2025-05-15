import { useMemo } from "react";
import { inject } from "./inject";
import type { Constructor } from "./types";

export function useService<T>(token: Constructor<T>) {
  return useMemo(() => inject(token), [token]);
}
