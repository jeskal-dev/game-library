import { Button } from "@/lib/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { activeTab } from "../signals";
import { memo } from "react";

export const TabSwitcher = memo(() => {
  return (
    <div className="flex justify-center relative">
      <div className="flex bg-neutral-700/30 p-1 rounded-md overflow-hidden">
        {(["login", "signup"] as const).map((tab) => (
          <motion.div
            key={tab}
            className="px-1"
            layout
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="ghost"
              onClick={() => (activeTab.value = tab)}
              className={cn(
                `relative px-8 py-2 rounded-lg transition-colors duration-200`,
                activeTab.value === tab
                  ? "text-neutral-100 hover:text-neutral-100 hover:bg-neutral-700/40"
                  : "text-neutral-400 hover:text-neutral-400 hover:bg-neutral-700/20"
              )}
            >
              {tab === "login" ? "Iniciar Sesión" : "Registrarse"}
              {activeTab.value === tab && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute inset-0 bg-neutral-600/30 rounded-lg"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                />
              )}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
});
