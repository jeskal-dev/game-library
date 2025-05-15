import { useMemo } from "react";
import { inject, type Constructor } from "../di";

export function useRepository<T>(repository: Constructor<T>) {
  return useMemo(() => inject(repository), [repository]);
}
