import { motion } from "framer-motion";
import { Clock, Gamepad2, Users } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Clock,
      title: "Tracking Inteligente",
      description: "Registro automático de horas jugadas y progreso detallado",
      color: "text-cyan-400",
    },
    {
      icon: Gamepad2,
      title: "Catálogo Completo",
      description: "Explora +20,000 juegos con información técnica y análisis",
      color: "text-emerald-400",
    },
    {
      icon: Users,
      title: "Comunidad Global",
      description: "Comparte logros y descubre jugadores afines",
      color: "text-amber-400",
    },
  ];

  return (
    <section className="py-20 bg-neutral-900/50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-light text-center text-neutral-100 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Tu Biblioteca de Juegos
          <br />
          <span className="text-neutral-400">Reinventada</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="p-8 bg-neutral-800/30 backdrop-blur-md rounded-2xl border border-neutral-700/50 hover:border-emerald-500/30"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="mb-6">
                <feature.icon className={`h-12 w-12 ${feature.color}`} />
              </div>
              <h3 className="text-2xl font-semibold text-neutral-100 mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
