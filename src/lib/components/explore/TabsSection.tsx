import { Button } from "@/lib/ui/button";
import { cn } from "@/lib/utils";
import { useSignal } from "@preact-signals/safe-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Newspaper,
  Rocket,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { RecommendationCard } from "./RecommendationCard";
import { Tabs, TabsList, TabsTrigger } from "@/lib/ui/tabs";

export function TabsSection() {
  const activeTab = useSignal("trending");
  const isCollapsed = useSignal(false);
  const tabs = [
    { value: "trending", icon: Flame, label: "Tendencias" },
    { value: "new", icon: Newspaper, label: "Nuevos" },
    { value: "upcoming", icon: Rocket, label: "Próximos" },
  ];
  return (
    <motion.aside
      initial={{ x: 20 }}
      animate={{ x: 0 }}
      className={cn(
        `relative hidden lg:block h-fit transition-all duration-300`,
        isCollapsed.value ? "w-12" : "w-fit"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -left-12 top-2 z-10"
        onClick={() => (isCollapsed.value = !isCollapsed.value)}
      >
        {isCollapsed.value ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      <AnimatePresence mode="wait">
        {!isCollapsed.value && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-background rounded-lg border p-4"
          >
            <Tabs
              value={activeTab.value}
              onValueChange={(value) => (activeTab.value = value)}
            >
              <TabsList>
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="space-x-2"
                  >
                    <tab.icon className="size-4" />
                    <span className="truncate">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="mt-4 space-y-2">
                {[...Array(5)].map((_, i) => (
                  <RecommendationCard key={i} />
                ))}
              </div>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
