import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { DatabaseProvider } from "./core/db";
import { createPersistedQueyClient } from "./core/providers/QueryClient";
import { routeTree } from "./routeTree.gen";
const queryClient = createPersistedQueyClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  notFoundMode: "root",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <DatabaseProvider>
          <RouterProvider router={router} />
        </DatabaseProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
