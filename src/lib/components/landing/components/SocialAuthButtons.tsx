import { Button } from "@/lib/ui/button";
import { motion } from "framer-motion";
import { Disc2, Github, Twitter, Youtube } from "lucide-react";

const socialPlatforms = [
  { name: "Twitter", icon: Twitter, url: "#" },
  { name: "Discord", icon: Disc2, url: "#" },
  { name: "YouTube", icon: Youtube, url: "#" },
  { name: "GitHub", icon: Github, url: "#" },
];

export function SocialButtons() {
  return (
    <div className="flex gap-3 justify-center">
      {socialPlatforms.map(({ name, icon: Icon, url }) => (
        <motion.div
          key={name}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            className="p-3 h-auto bg-transparent border-neutral-700/50 hover:bg-neutral-700/20 rounded-lg"
            asChild
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Icon className="h-5 w-5 text-neutral-300" />
            </a>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
