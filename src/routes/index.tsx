import {
  CommunityHighlights,
  CTAFooter,
  FeaturesSection,
  HeroSection,
} from "@/lib/components/landing";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="bg-neutral-900 overflow-x-hidden">
      <HeroSection />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <CommunityHighlights />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <FeaturesSection />
      </motion.div>
      <CTAFooter />
      {/* <Footer /> */}
    </div>
  );
}
