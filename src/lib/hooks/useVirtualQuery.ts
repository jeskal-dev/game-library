import {
  useInfiniteQuery,
  type DefaultError,
  type DefinedInitialDataInfiniteOptions,
  type InfiniteData,
  type QueryKey,
} from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useMemo, useRef } from "react";

interface VirtualQueryParams<
  TQueryFnData,
  TError = DefaultError,
  TData extends InfiniteData<TQueryFnData> = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown
> extends DefinedInitialDataInfiniteOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    TPageParam
  > {
  pagesFlatMap: <TFlatReturn>(item: TQueryFnData) => TFlatReturn;
  estimateSize?: number;
  overscan?: number;
}

function useVirtualQuery<
  TQueryFnData,
  TError = DefaultError,
  TData extends InfiniteData<TQueryFnData> = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown
>({
  pagesFlatMap,
  estimateSize = 100,
  overscan = 5,
  ...options
}: VirtualQueryParams<TQueryFnData, TError, TData, TQueryKey, TPageParam>) {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, ...rest } =
    useInfiniteQuery(options);

  const parentRef = useRef<HTMLElement>(null);
  const allRows = useMemo(
    () => (data ? data.pages.flatMap(pagesFlatMap) : []),
    [data, pagesFlatMap]
  );

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan,
  });

  useEffect(() => {
    const lastItem = rowVirtualizer.getVirtualItems().at(-1);
    if (!lastItem) return;

    const canFetchNextPage =
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage;

    if (canFetchNextPage) fetchNextPage();
  }, [
    allRows.length,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    rowVirtualizer,
  ]);

  return {
    parentRef,
    rowVirtualizer,
    allRows,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    ...rest,
  };
}

export default useVirtualQuery;
