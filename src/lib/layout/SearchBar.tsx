import { motion } from "framer-motion";
import { SearchButton } from "./SearchButton";

export function SearchBar() {
  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <input
        type="text"
        placeholder="Buscar juegos..."
        className={`w-48 md:w-64 px-4 py-2 rounded-xl bg-neutral-700/50 border-neutral-600 border focus:border-emerald-500/50 focus:ring-0 text-neutral-100 placeholder-neutral-400 text-sm`}
      />
      <SearchButton />
    </motion.div>
  );
}
