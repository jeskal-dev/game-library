import { Button } from "@/lib/ui/button";
import { motion } from "framer-motion";
import { providers } from "../constants";
import type { Providers } from "../types";

export function SocialAuthButtons() {
  const onAuth = (provider: Providers) => {
    console.log(`Iniciando con ${provider}`);
  };

  return (
    <div className="flex gap-3 justify-center">
      {providers.map(({ name, icon: Icon }) => (
        <motion.div
          key={name}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            className={`p-3 h-auto bg-transparent border-neutral-700/50 hover:bg-neutral-700/20 rounded-lg`}
            onClick={() => onAuth(name)}
          >
            <Icon className="h-5 w-5 text-neutral-300" />
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
