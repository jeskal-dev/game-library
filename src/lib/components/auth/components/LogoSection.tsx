import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import { memo } from "react";

export const LogoSection = memo(() => {
  return (
    <motion.div
      className="flex flex-col items-center gap-4 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-3 rounded-md bg-neutral-700/50 backdrop-blur-sm">
        <Gamepad2 className="h-10 w-10 text-neutral-100" />
      </div>
      <h1 className="text-4xl font-light tracking-wide text-neutral-100">
        Gamelib
      </h1>
      <p className="text-neutral-400 text-sm tracking-widest">
        TU COLECCIÓN DE JUEGOS
      </p>
    </motion.div>
  );
});
