import { motion } from "framer-motion";

const SocialButton = ({ social = "" }) => {
  return (
    <motion.a
      href="#"
      className={`p-2 rounded-lg border flex items-center gap-2 bg-neutral-700/50 border-neutral-600 hover:bg-emerald-500/10 hover:border-emerald-400/30`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className={`text-xs text-neutral-300`}>{social}</span>
    </motion.a>
  );
};

export default SocialButton;
