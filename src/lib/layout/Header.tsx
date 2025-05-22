import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { SearchBar } from "./SearchBar";

export function Header() {
  return (
    <motion.header
      className="sticky top-0 z-50 p-4 bg-white/80 dark:bg-neutral-800/70 backdrop-blur-lg border-b border-neutral-200/50 dark:border-neutral-700/50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Logo />
          <Navigation />
        </div>

        <div className="flex items-center gap-4">
          <SearchBar />
          {/* <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} /> */}
        </div>
      </div>
    </motion.header>
  );
}
