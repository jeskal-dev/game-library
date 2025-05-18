import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import { memo } from "react";

export const LogoSection = memo(() => {
  return (
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="p-4 rounded-xl bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/30 hover:border-emerald-400/30 transition-colors"
        whileHover={{ rotate: -5, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Gamepad2 className="h-16 w-16 text-emerald-400/90 drop-shadow-[0_4px_8px_rgba(52,211,153,0.15)]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-5xl font-light tracking-tighter bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Gamelib
        </h1>
      </motion.div>

      <motion.p
        className="text-neutral-400 text-lg tracking-wider hover:text-cyan-400 transition-colors"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        Tu comunidad global de videojuegos
      </motion.p>
    </motion.div>
  );
});
