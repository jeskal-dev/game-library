import {
  useInfiniteQuery,
  type GetNextPageParamFunction,
  type InfiniteData,
  type QueryKey,
  type QueryMeta,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import {
  elementScroll,
  useVirtualizer,
  Virtualizer,
  type VirtualizerOptions,
} from "@tanstack/react-virtual";
import { useCallback, useEffect, useMemo, useRef, type Ref } from "react";

type InfiniteQueryPage<T> = {
  items: T[];
  hasNextPage?: boolean;
};

type UseVirtualInfiniteQueryOptions<T, TError = Error> = {
  queryKey: QueryKey;
  queryFn: (context: {
    signal: AbortSignal;
    pageParam: number;
    meta: QueryMeta | undefined;
  }) => Promise<InfiniteQueryPage<T>>;
  getNextPageParam: GetNextPageParamFunction<number, InfiniteQueryPage<T>>;
  initialPageParam: number;
  virtualizerOptions?: Partial<
    Omit<
      VirtualizerOptions<HTMLDivElement, Element>,
      "count" | "getScrollElement" | "observeElementOffset"
    >
  >;
  queryOptions?: Omit<
    UseInfiniteQueryOptions<
      InfiniteQueryPage<T>,
      TError,
      InfiniteData<InfiniteQueryPage<T>>,
      InfiniteQueryPage<T>,
      QueryKey,
      number
    >,
    "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam"
  >;
};

export const useVirtualQuery = <T, TError = Error>(
  options: UseVirtualInfiniteQueryOptions<T, TError>
) => {
  function EaseInOutQuint(t: number) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  }

  const parentRef = useRef<HTMLDivElement>(null);
  const scrollingRef = useRef<number>(0);

  const scrollToFn = useCallback(
    (
      offset: number,
      options: {
        adjustments?: number | undefined;
        behavior?: ScrollBehavior | undefined;
      },
      instance: Virtualizer<HTMLDivElement, Element>
    ) => {
      const duration = 100;
      const start = parentRef.current?.scrollTop ?? 0;
      const startTime = (scrollingRef.current = Date.now());

      const run = () => {
        if (scrollingRef.current !== startTime) return;
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = EaseInOutQuint(Math.min(elapsed / duration, 1));
        const interpolated = start + (offset - start) * progress;
        if (elapsed < duration) {
          elementScroll(interpolated, options as never, instance);
          requestAnimationFrame(run);
        } else {
          elementScroll(interpolated, options as never, instance);
        }
      };

      requestAnimationFrame(run);
    },
    []
  );

  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
    ...rest
  } = useInfiniteQuery({
    ...options.queryOptions,
    queryKey: options.queryKey,
    queryFn: (context) => options.queryFn(context),
    initialPageParam: options.initialPageParam,
    getNextPageParam: options.getNextPageParam,
  });

  const allItems = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data]
  );

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allItems.length + 1 : allItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    scrollToFn(offset, options, instance) {
      scrollToFn(offset, options, instance);
    },
    ...options.virtualizerOptions,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = [...virtualItems].at(-1);

    if (!lastItem) return;

    if (
      lastItem.index >= allItems.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allItems.length,
    isFetchingNextPage,
    virtualItems,
  ]);

  return {
    parentRef: parentRef as Ref<HTMLDivElement>,
    virtualItems,
    totalSize: rowVirtualizer.getTotalSize(),
    allItems: allItems,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    error,
    ...rest,
  };
};

// Tipos para el retorno del hook
