import type { Persister } from "@tanstack/react-query-persist-client";
import { inject } from "../di";
import { CacheAdapter } from "./adapter";

export function createDexiePersister(
  cacheKey = "REACT_QUERY_OFFLINE_CACHE"
): Persister {
  const cache = inject(CacheAdapter);
  return {
    async persistClient(persistClient) {
      await cache.set(cacheKey, persistClient);
    },
    async restoreClient() {
      const entry = await cache.get(cacheKey);
      return entry?.value ?? undefined;
    },
    async removeClient() {
      await cache.remove(cacheKey);
    },
  };
}
