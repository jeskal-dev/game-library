import { navLinks } from "./const";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
export function Navigation() {
  return (
    <nav className="hidden md:flex gap-1">
      {navLinks.map((item) => (
        <motion.div key={item.path} whileHover={{ scale: 1.03 }}>
          <Link
            to={item.path}
            className="px-3 py-2 text-neutral-700 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-medium"
            activeProps={{
              className: "text-emerald-600 dark:text-emerald-400 font-semibold",
            }}
          >
            {item.name}
          </Link>
        </motion.div>
      ))}
    </nav>
  );
}
