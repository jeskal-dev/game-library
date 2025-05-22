import { motion } from "framer-motion";

export function LogoSection() {
  return (
    <div>
      <motion.div whileHover={{ scale: 1.05 }}>
        <span className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
          Gamelib
        </span>
      </motion.div>
      <p className={`mt-2 text-sm text-neutral-400`}>
        Tu biblioteca definitiva de videojuegos. Organiza, descubre y comparte.
      </p>
    </div>
  );
}
