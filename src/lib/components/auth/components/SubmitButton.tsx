import { Button } from "@/lib/ui/button";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { buttonMessage } from "../signals";

export function SubmitButton({ isLoading }: Readonly<{ isLoading: boolean }>) {
  return (
    <Button
      className="w-full h-12 bg-neutral-100/5 hover:bg-neutral-100/10 border border-neutral-600/50 text-neutral-100 rounded-lg transition-all"
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-2 items-center"
        >
          <Loader2 className="h-5 w-5 animate-spin" />
          Procesando...
        </motion.span>
      ) : (
        buttonMessage
      )}
    </Button>
  );
}
