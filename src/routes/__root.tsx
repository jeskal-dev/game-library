import { Error404 } from "@/lib/components/Error404";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
interface AppContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<AppContext>()({
  component: Root,
  notFoundComponent: Error404
});

function Root() {
  return (
    <>
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" initialIsOpen={false} />
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
    </>
  );
}
