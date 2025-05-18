import { motion } from "framer-motion";

export const ParticlesEffect = ({ count = 3, color = "" }) => (
  <div className="absolute inset-0 pointer-events-none">
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute w-1 h-1 bg-${color}-400/20 rounded-full`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -40, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 3 + Math.random() * 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);
