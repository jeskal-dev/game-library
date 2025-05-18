import { AnimatePresence, motion } from "framer-motion";
import { successMessage } from "../signals";

export function StatusMessage({
  mutationError,
  isSuccess,
}: Readonly<{
  mutationError: Error | null;
  isSuccess: boolean;
}>) {
  return (
    <AnimatePresence mode="wait">
      {(mutationError || isSuccess) && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`p-3 text-sm ${
            mutationError
              ? "bg-red-400/10 text-red-300"
              : "bg-emerald-400/10 text-emerald-300"
          } rounded-md`}
        >
          {mutationError?.message ?? successMessage}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
