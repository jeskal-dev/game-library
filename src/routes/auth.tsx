import {
  AuthForm,
  LogoSection,
  SocialAuthButtons,
  TabSwitcher,
} from "@/lib/components/auth";
import { Card } from "@/lib/ui/card";
import { Separator } from "@/lib/ui/seporator";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="relative overflow-hidden rounded-2xl border-neutral-800 bg-neutral-800/30 backdrop-blur-md">
          <div className="relative z-10 p-8 space-y-8 w-[400px]">
            <LogoSection />
            <TabSwitcher />

            <AuthForm />

            <Separator className="bg-neutral-700/30" />
            <SocialAuthButtons />
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
