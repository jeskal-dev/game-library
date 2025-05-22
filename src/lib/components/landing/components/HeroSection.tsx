import { motion } from "framer-motion";
import { LogoSection } from "./LogoSection";

export function HeroSection() {
  return (
    <section className="relative min-h-[700px] flex items-center bg-neutral-900 border-b border-neutral-800">
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto text-center"
        >
          <LogoSection />

          {/* Nuevo: Tres puntos clave con micro-interacciones */}
          <motion.div className="flex justify-center gap-8 mt-12">
            {["+20k Juegos", "Tracking Detallado", "Comunidad Activa"].map(
              (text) => (
                <motion.div
                  key={text}
                  className="px-6 py-2 rounded-full bg-neutral-800/50 backdrop-blur-sm border border-neutral-700"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    {text}
                  </span>
                </motion.div>
              )
            )}
          </motion.div>

          <motion.div
            className="relative flex items-center mt-12"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <input
              type="text"
              placeholder="Busca juegos, usuarios o listas..."
              className="w-full px-6 py-4 rounded-2xl bg-neutral-800/70 backdrop-blur-lg border-2 border-neutral-600 focus:border-emerald-500 focus:outline-none text-neutral-100 text-lg placeholder:text-neutral-400"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 border-2 border-emerald-400/30 text-white font-medium transition-colors cursor-pointer"
            >
              Buscar
            </motion.button>
          </motion.div>

          <motion.div className="mt-8 flex justify-center gap-6">
            {[
              { value: "32,456", label: "Gamers registrados" },
              { value: "1.2M", label: "Horas trackeadas" },
              { value: "4.8", label: "Rating promedio" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="text-center"
              >
                <div className="text-2xl font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {item.value}
                </div>
                <div className="text-neutral-400 text-sm mt-1">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
