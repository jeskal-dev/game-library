import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import { cn } from "../utils";
import { ChevronLeft } from "lucide-react";

export function Error404() {
  return (
    <div className="bg-neutral-900 min-h-screen flex items-center justify-center p-4">
      <div className="container max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="relative"
        >
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <AnimatePresence>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute w-64 h-64 rounded-full bg-emerald-500/20 blur-3xl"
              />
            </AnimatePresence>
          </div>

          <motion.h1
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 mb-8"
          >
            404
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-semibold text-foreground">
            ¡Página no encontrada!
          </h2>
          <p className="text-muted-foreground text-lg">
            La página que estás buscando podría haber sido eliminada o no
            existe.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center"
          >
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "gap-2 transition-colors",
                "hover:border-emerald-500 hover:text-emerald-500",
                "focus:ring-2 focus:ring-emerald-500/50"
              )}
              onClick={() => window.history.back()}
            >
              <ChevronLeft className="h-5 w-5" />
              Volver al inicio
            </Button>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex justify-center gap-4"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-emerald-500"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
