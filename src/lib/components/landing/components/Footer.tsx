import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/lib/ui/navigation-menu";
import { Separator } from "@/lib/ui/seporator";
import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import { SocialAuthButtons } from "./SocialAuthButtons";

export function Footer() {
  return (
    <footer className="border-t border-neutral-800/60 py-20 bg-neutral-900/95 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <NavigationMenu className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">
          <NavigationMenuItem>
            <motion.div
              className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/50 hover:border-emerald-400/30 transition-all"
              whileHover={{ rotate: -8, scale: 1.05 }}
            >
              <Gamepad2 className="h-12 w-12 text-emerald-400" />
            </motion.div>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <div className="flex flex-wrap justify-center gap-10 text-lg">
              {[
                { text: "Sobre nosotros", color: "emerald" },
                { text: "Blog", color: "cyan" },
                { text: "API", color: "emerald" },
                { text: "Soporte", color: "cyan" },
              ].map((link) => (
                <NavigationMenuLink
                  key={link.text}
                  href="#"
                  className={`hover:text-${link.color}-400 transition-colors relative`}
                >
                  <motion.span
                    whileHover={{ y: -3 }}
                    className="block px-4 py-2"
                  >
                    {link.text}
                  </motion.span>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-neutral-800/40 p-4 rounded-xl border border-neutral-700/50"
            >
              <SocialAuthButtons />
            </motion.div>
          </NavigationMenuItem>
        </NavigationMenu>

        <Separator className="bg-neutral-700/50 mb-12" />

        <motion.p
          className="text-center text-neutral-500/80 hover:text-cyan-400 transition-colors text-sm"
          whileHover={{ scale: 1.05 }}
        >
          © 2024 Gamelib ·<br className="md:hidden" />
          <span className="bg-gradient-to-r from-emerald-400/80 to-cyan-400/80 bg-clip-text text-transparent">
            Tu biblioteca gaming definitiva
          </span>
        </motion.p>
      </div>
    </footer>
  );
}
