import { motion } from "framer-motion";
import { MOCK_COMMUNITY, MOCK_GAMES } from "../constants";
import { Clock, Star, Trophy, Users } from "lucide-react";
import { ScrollArea } from "@/lib/ui/scroll-area";

export function CommunityHighlights() {
  return (
    <section className="bg-neutral-900/30 py-24 border-y border-neutral-800/50">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16">
        {/* Juegos Destacados */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          <div className="flex items-center gap-3 mb-8 group">
            <motion.div
              className="p-3 rounded-lg bg-emerald-400/10 border border-emerald-400/20"
              whileHover={{ rotate: -5 }}
            >
              <Trophy className="h-6 w-6 text-emerald-400" />
            </motion.div>
            <h3 className="text-3xl font-semibold text-neutral-100">
              Tendencias Actuales
            </h3>
          </div>

          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              {MOCK_GAMES.map((game) => (
                <motion.div
                  key={game.id}
                  className="p-6 bg-neutral-800/40 backdrop-blur-sm rounded-xl border border-neutral-700/50 hover:border-emerald-400/30 transition-all"
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-lg bg-neutral-700/50 animate-pulse" />
                    <div className="ml-4 flex-1">
                      <h4 className="text-neutral-100 font-medium">
                        {game.title}
                      </h4>
                      <div className="flex items-center mt-2 text-amber-400">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-2 text-sm">{game.rating}/5</span>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <span className="px-2 py-1 text-xs bg-emerald-400/10 text-emerald-400 rounded-full">
                          {game.platform}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </motion.div>

        {/* Actividad Reciente */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          <div className="flex items-center gap-3 mb-8 group">
            <motion.div
              className="p-3 rounded-lg bg-cyan-400/10 border border-cyan-400/20"
              whileHover={{ rotate: 5 }}
            >
              <Users className="h-6 w-6 text-cyan-400" />
            </motion.div>
            <h3 className="text-3xl font-semibold text-neutral-100">
              Actividad en Vivo
            </h3>
          </div>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              {MOCK_COMMUNITY.map((item, index) => (
                <motion.div
                  key={item.user}
                  className="p-4 bg-neutral-800/40 backdrop-blur-sm rounded-xl border border-neutral-700/50 hover:border-cyan-400/30 transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, type: "spring" }}
                >
                  <div className="flex items-center">
                    <span className="bg-cyan-400/10 text-cyan-400 px-3 py-1 rounded-full text-sm">
                      {item.action.includes("lista") ? "📋" : "🎮"}
                    </span>
                    <span className="ml-3 text-cyan-400 font-medium">
                      {item.user}
                    </span>
                  </div>
                  <p className="mt-2 text-neutral-300 pl-2">{item.action}</p>
                  <div className="mt-3 text-xs text-neutral-500 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {Math.floor(Math.random() * 60)} minutos atrás
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </motion.div>
      </div>
    </section>
  );
}
