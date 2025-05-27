import { Card } from "@/lib/ui/card";
import { motion } from "framer-motion";
import { StarIcon } from "lucide-react";

export function RecommendationCard() {
  return (
    <motion.div whileHover={{ translateX: 4 }} className="group cursor-pointer">
      <Card className="p-2 hover:border-emerald-500 transition-colors">
        <div className="flex gap-3">
          <div className="w-16 h-16 rounded-md bg-muted overflow-hidden">
            <img
              src="https://via.placeholder.com/80"
              alt="Game"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h4 className="text-sm font-medium line-clamp-1 mb-1">
              Nombre del Juego
            </h4>
            <div className="flex items-center gap-2">
              <StarIcon className="h-3 w-3 text-amber-500" />
              <span className="text-xs text-muted-foreground">4.8/5</span>
            </div>
            <span className="text-xs text-muted-foreground">
              Action • Adventure
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
