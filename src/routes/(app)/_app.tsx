import { MainLayout } from "@/lib/layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_app")({
  component: MainLayout,
});
