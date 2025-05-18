import { QueryClient } from "@tanstack/react-query";
import { createDexiePersister } from "../cache/persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";

const CACHE_TIME = 7 * 24 * 60 * 60 * 1000;

export function createPersistedQueyClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: CACHE_TIME,
      },
    },
  });

  if (typeof window !== "undefined") {
    const persister = createDexiePersister();

    persistQueryClient({
      queryClient,
      persister,
      maxAge: CACHE_TIME,
      dehydrateOptions: {
        shouldDehydrateQuery: (query) =>
          !query.isStale() && !query.queryKey.includes("private"),
      },
    });
  }

  return queryClient;
}
