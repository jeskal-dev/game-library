import { Button } from "@/lib/ui/button";
import { Card } from "@/lib/ui/card";
import { Separator } from "@/lib/ui/seporator";
import { motion } from "framer-motion";
import { SocialButtons } from "./SocialAuthButtons";
import { Link } from "@tanstack/react-router";

export function CTAFooter() {
  return (
    <section className="relative bg-neutral-900/95 py-16 md:py-20 border-t border-neutral-700/80 backdrop-blur-xl overflow-hidden">
      <div className="container mx-auto px-4">
        <Card className="bg-neutral-800/50 border border-neutral-600/60 p-8 md:p-10 backdrop-blur-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="text-center"
          >
            <motion.h2 className="text-3xl md:text-4xl leading-14 font-medium mb-8 bg-gradient-to-r from-emerald-300 to-cyan-400 bg-clip-text text-transparent">
              ¿Listo para unirte a la comunidad?
            </motion.h2>

            <Button
              size="lg"
              className="px-12 py-6 text-lg md:text-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 border-2 border-emerald-400/30 rounded-2xl shadow-lg hover:shadow-emerald-500/30 transition-all"
              asChild
            >
              <Link to="/auth">Empieza Gratis</Link>
            </Button>

            <Separator className="my-12 bg-neutral-700/40" />

            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-neutral-300 mb-6 text-base md:text-lg">
                Conéctate con nosotros
              </p>
              <SocialButtons />
            </motion.div>
          </motion.div>
        </Card>
      </div>
    </section>
  );
}
