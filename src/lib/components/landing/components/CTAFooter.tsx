import { motion } from "framer-motion";
import { SocialAuthButtons } from "./SocialAuthButtons";
import { Button } from "@/lib/ui/button";
import { Card } from "@/lib/ui/card";
import { Separator } from "@/lib/ui/seporator";
import { ParticlesEffect } from "./ParticlesEffect";

export function CTAFooter() {
  return (
    <section className="relative bg-neutral-900/95 py-28 border-t border-neutral-800/60 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <Card className="bg-neutral-800/40 border border-neutral-700/50 p-12 backdrop-blur-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="text-center"
          >
            <motion.h2
              className="text-5xl font-light mb-10 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
            >
              ¿Listo para unirte a la comunidad?
            </motion.h2>

            <Button
              size="lg"
              className="px-24 py-10 text-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 rounded-3xl shadow-2xl hover:shadow-emerald-500/20"
            >
              Empieza Gratis
            </Button>

            <Separator className="my-16 bg-neutral-700/50" />

            <motion.div
              className="mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-neutral-400 mb-8 text-lg">
                Conéctate con nosotros
              </p>
              <SocialAuthButtons />
            </motion.div>
          </motion.div>
        </Card>
      </div>

      {/* Efecto de partículas optimizado */}
      <ParticlesEffect count={12} color="emerald" />
    </section>
  );
}
