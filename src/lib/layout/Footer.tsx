import { AnimatePresence, motion } from "framer-motion";
import { FooterContent } from "./FooterContent";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <AnimatePresence>
      <motion.footer
        className={`bg-white/80 dark:bg-neutral-800/70 backdrop-blur-lg border-t border-neutral-700/50 py-8`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <FooterContent />
        <SocialLinks />
      </motion.footer>
    </AnimatePresence>
  );
}
