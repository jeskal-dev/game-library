import { motion } from "framer-motion";

export function FooterSection({
  section,
}: {
  section: { title: string; links: string[] };
}) {
  return (
    <div>
      <h3
        className={`font-medium mb-4 text-sm uppercase tracking-wider text-emerald-400`}
      >
        {section.title}
      </h3>
      <ul className="space-y-2">
        {section.links.map((link) => (
          <motion.li
            key={link}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <a
              href="#"
              className={`text-sm transition-colors text-neutral-300 hover:text-emerald-400`}
            >
              {link}
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
