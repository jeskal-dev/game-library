import type { RAWGPageRequest } from "@/lib/domain/request/RAWGRequest";
import type { RAWGResponse } from "@/lib/domain/response/RAWGResponse";
import { useVirtualQuery } from "@/lib/hooks/useVirtualQuery";
import { AccordionItem, AccordionTrigger } from "@/lib/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import type { ReactNode } from "@tanstack/react-router";
import type { AxiosRequestConfig } from "axios";
import { Loader2 } from "lucide-react";
import { VirtualContainer } from "./VirtualContainer";
import { VirtualItem } from "./VirtualItem";
import { VirtualRoot } from "./VirtualRoot";

interface Props<T> {
  sectionKey: string;
  title: string;
  fetchFn: (
    params: RAWGPageRequest,
    config?: AxiosRequestConfig
  ) => Promise<RAWGResponse<T>>;

  icon: (props: Record<string, unknown>) => ReactNode;
  renderItem: (item: T) => ReactNode;
  enabled?: boolean;
}

export const VirtualRWAGSection = <T,>({
  fetchFn,
  icon: Icon,
  sectionKey,
  title,
  renderItem,
  enabled = false,
}: Props<T>) => {
  const {
    parentRef,
    virtualItems,
    totalSize,
    allItems,
    isLoading,
    hasNextPage,
  } = useVirtualQuery({
    queryKey: [sectionKey],
    async queryFn({ pageParam, signal }) {
      const data = await fetchFn(
        { page: pageParam, page_size: 20 },
        { signal }
      );

      return {
        items: data.results,
        hasNextPage: !!data.next,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.hasNextPage ? lastPageParam + 1 : undefined,
    virtualizerOptions: { overscan: 5 },
    queryOptions: {
      enabled,
    },
  });

  const RenderContent = () => (
    <VirtualRoot
      ref={parentRef}
      className="h-[300px] overflow-y-auto relative border rounded-lg"
    >
      <VirtualContainer totalSize={totalSize}>
        {virtualItems.map((virtualItem) => {
          const item = allItems[virtualItem.index];

          if (!item) {
            return (
              hasNextPage && (
                <VirtualItem
                  key={`empty-${virtualItem.key}`}
                  size={virtualItem.size}
                  start={virtualItem.start}
                >
                  <div className="h-full flex items-center justify-center text-gray-400">
                    Cargando...
                  </div>
                </VirtualItem>
              )
            );
          }

          return (
            <VirtualItem
              key={virtualItem.key}
              size={virtualItem.size}
              start={virtualItem.start}
            >
              {renderItem(item)}
            </VirtualItem>
          );
        })}
      </VirtualContainer>
    </VirtualRoot>
  );

  return (
    <AccordionItem value={sectionKey}>
      <AccordionTrigger className="px-0 py-2 hover:no-underline">
        <div className="flex items-center gap-2">
          {isLoading ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <Icon className="size-5" />
          )}
          <span className="font-medium">{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <RenderContent />
      </AccordionContent>
    </AccordionItem>
  );
};
